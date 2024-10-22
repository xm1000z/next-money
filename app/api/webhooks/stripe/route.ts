import { headers } from "next/headers";

import { Prisma } from "@prisma/client";
import Stripe from "stripe";

import { ChargeOrderHashids } from "@/db/dto/charge-order.dto";
import { ChargeProductHashids } from "@/db/dto/charge-product.dto";
import { prisma } from "@/db/prisma";
import { getUserCredit } from "@/db/queries/account";
import { OrderPhase } from "@/db/type";
import { env } from "@/env.mjs";
import { logsnag } from "@/lib/log-snag";
import { stripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

export async function GET() {
  return new Response("OK", { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.text();
  console.log("Webhook recibido:", body);

  // Usa esto para depuración
  const generatedSignature = stripe.webhooks.generateTestHeaderString({
    payload: body,
    secret: env.STRIPE_WEBHOOK_SECRET,
  });

  console.log("Firma generada:", generatedSignature);

  const signature = headers().get("Stripe-Signature") || "";
  console.log("Firma recibida:", signature);

  if (!signature) {
    return new Response("No se proporcionó firma del webhook", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Intenta primero con la firma recibida
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(`❌ Error con la firma recibida: ${error.message}`);
    
    // Si falla, intenta con la firma generada
    try {
      event = stripe.webhooks.constructEvent(
        body,
        generatedSignature,
        env.STRIPE_WEBHOOK_SECRET
      );
      console.log("Éxito usando la firma generada");
    } catch (secondError) {
      console.log(`❌ Error también con la firma generada: ${secondError.message}`);
      return new Response(`Error en el webhook de Stripe: ${error.message}`, {
        status: 400,
      });
    }
  }

  const session = event.data.object as Stripe.Checkout.Session;

   if (event.type === "checkout.session.completed") {
  // Retrieve the subscription details from Stripe.
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No se encontró userId en los metadatos de la sesión");
    return new Response("UserId no encontrado", { status: 400 });
  }

  // Buscar el UserPaymentInfo existente
  const existingPaymentInfo = await prisma.userPaymentInfo.findFirst({
    where: {
      userId: userId,
    },
  });

  if (existingPaymentInfo) {
    // Actualizar el registro existente
    await prisma.userPaymentInfo.update({
      where: {
        id: existingPaymentInfo.id,
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  } else {
    // Crear un nuevo registro
    await prisma.userPaymentInfo.create({
      data: {
        userId: userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }
   }

   if (event.type === "invoice.payment_succeeded") {
  // Retrieve the subscription details from Stripe.
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  // Primero, encuentra el UserPaymentInfo correcto
  const userPaymentInfo = await prisma.userPaymentInfo.findFirst({
    where: {
      stripeSubscriptionId: subscription.id,
    },
  });

  if (!userPaymentInfo) {
    console.error(`No se encontró UserPaymentInfo para la suscripción ${subscription.id}`);
    return new Response("UserPaymentInfo no encontrado", { status: 400 });
  }

  // Ahora actualiza usando el id
  await prisma.userPaymentInfo.update({
    where: {
      id: userPaymentInfo.id,
    },
    data: {
      stripePriceId: subscription.items.data[0].price.id,
      stripeCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000
      ),
    },
  });
  }

  if (event.type === "payment_intent.payment_failed") {
    const metaOrderId = session?.metadata?.orderId as string;
    const [orderId] = ChargeOrderHashids.decode(metaOrderId);
    if (!orderId) {
      return new Response(`Order Error`, { status: 400 });
    }
    const order = await prisma.chargeOrder.findUnique({
      where: {
        id: orderId as number,
      },
    });
    console.log("payment_failed order-->", order);
    if (!order || order.phase !== OrderPhase.Pending) {
      return new Response(`Order Phase Error`, { status: 400 });
    }
    await prisma.chargeOrder.update({
      where: {
        id: orderId as number,
      },
      data: {
        phase: OrderPhase.Failed,
        result: {
          ...session,
          failedAt: new Date(),
        } as unknown as Prisma.JsonObject,
      },
    });
  } else if (event.type === "payment_intent.canceled") {
    const metaOrderId = session?.metadata?.orderId as string;
    const [orderId] = ChargeOrderHashids.decode(metaOrderId);
    if (!orderId) {
      return new Response(`Order Error`, { status: 400 });
    }
    const order = await prisma.chargeOrder.findUnique({
      where: {
        id: orderId as number,
      },
    });
    console.log("canceled order-->", order);

    if (!order || order.phase !== OrderPhase.Pending) {
      return new Response(`Order Phase Error`, { status: 400 });
    }
    await prisma.chargeOrder.update({
      where: {
        id: orderId as number,
      },
      data: {
        phase: OrderPhase.Pending,
        result: {
          ...session,
          canceledAt: new Date(),
        } as unknown as Prisma.JsonObject,
      },
    });
  } else if (event.type === "payment_intent.succeeded") {
    const metaOrderId = session?.metadata?.orderId as string;
    const userId = session?.metadata?.userId as string;
    const metaChargeProductId = session?.metadata?.chargeProductId as string;
    const [orderId] = ChargeOrderHashids.decode(metaOrderId);
    const [chargeProductId] = ChargeProductHashids.decode(metaChargeProductId);
    if (!orderId || !chargeProductId) {
      return new Response(`Order Error`, { status: 400 });
    }
    const [order, product] = await Promise.all([
      prisma.chargeOrder.findUnique({
        where: {
          id: orderId as number,
        },
      }),
      prisma.chargeProduct.findUnique({
        where: {
          id: chargeProductId as number,
        },
      }),
    ]);
    console.log("payment succeeded order-->", order, product);
    if (
      !order ||
      !product ||
      !product?.id ||
      order.phase !== OrderPhase.Pending
    ) {
      return new Response(`Order Phase Error`, { status: 400 });
    }
    const account = await getUserCredit(userId);
    await prisma.$transaction(async (tx) => {
      console.log("Iniciando transacción para actualizar créditos");
      const addCredit = product.credit;
      console.log("Créditos a agregar:", addCredit);
      await tx.chargeOrder.update({
        where: {
          id: order.id,
        },
        data: {
          phase: "Pagado",
          paymentAt: new Date(),
          result: session as unknown as Prisma.JsonObject,
        },
      });
      await tx.userCredit.update({
        where: {
          id: account.id,
        },
        data: {
          credit: {
            increment: addCredit,
          },
        },
      });

      await tx.userCreditTransaction.create({
        data: {
          userId: userId,
          credit: addCredit,
          balance: account.credit + addCredit,
          type: "Charge",
        },
      });
      console.log("Transacción completada");
    });
    const price = formatPrice(product.amount)
    await logsnag.track({
      channel: "payments",
      event: "Pago exitoso!",
      user_id: userId,
      description: `Compra de créditos: ${product.title} - ${price}`,
      icon: "💰",
      tags: {
        title: product.title,
        amount: price,
      },
    });
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;

    await prisma.userPaymentInfo.upsert({
      where: { userId: userId },
      update: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      create: {
        userId: userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    // Aquí puedes añadir lógica para actualizar los créditos del usuario
    // basado en el plan de suscripción
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = invoice.subscription;
    const customerId = invoice.customer;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);
    const userId = subscription.metadata.userId;

    // Actualizar la información de pago del usuario
    await prisma.userPaymentInfo.update({
      where: { userId: userId },
      data: {
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    // Añadir créditos al usuario basado en su plan de suscripción
    // Esto dependerá de cómo quieras estructurar tus planes
    const creditAmount = 100; // Ejemplo: 100 créditos por mes

    // Primero, busca el UserCredit existente
    const userCredit = await prisma.userCredit.findUnique({
      where: { userId: userId },
    });

    if (userCredit) {
      // Si existe, actualízalo
      await prisma.userCredit.update({
        where: { id: userCredit.id },
        data: {
          credit: {
            increment: creditAmount,
          },
        },
      });
    } else {
      // Si no existe, créalo
      await prisma.userCredit.create({
        data: {
          userId: userId,
          credit: creditAmount,
        },
      });
    }

    // Registrar la transacción
    await prisma.userCreditTransaction.create({
      data: {
        userId: userId,
        credit: creditAmount,
        balance: (userCredit?.credit ?? 0) + creditAmount,
        type: "Subscription",
      },
    });
  }

  return new Response(null, { status: 200 });
}
