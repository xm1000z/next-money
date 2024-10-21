import { headers } from "next/headers";

import { Prisma } from "@prisma/client";
import Stripe from "stripe";

import { prisma } from "@/db/prisma";
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

  const signature = headers().get("Stripe-Signature") || "";
  if (!signature) {
    return new Response("No se proporcionó firma del webhook", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log(`❌ Error con la firma recibida: ${error.message}`);
    return new Response(`Error en el webhook de Stripe: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscriptionId = session.subscription as string;
    const userId = session.metadata?.userId;

    if (!userId) {
      return new Response("User ID not found", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    await prisma.userSubscription.upsert({
      where: { userId: userId },
      update: {
        stripeSubscriptionId: subscriptionId,
        stripePriceId: priceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      create: {
        userId: userId,
        stripeSubscriptionId: subscriptionId,
        stripePriceId: priceId,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    await logsnag.track({
      channel: "subscriptions",
      event: "Suscripción iniciada",
      user_id: userId,
      description: `Nueva suscripción: ${priceId}`,
      icon: "🎉",
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscriptionId = session.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = subscription.metadata.userId;

    await prisma.userSubscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    await logsnag.track({
      channel: "subscriptions",
      event: "Pago de suscripción",
      user_id: userId,
      description: `Pago recibido para la suscripción: ${subscriptionId}`,
      icon: "💰",
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const userId = subscription.metadata.userId;

    await prisma.userSubscription.delete({
      where: { stripeSubscriptionId: subscription.id },
    });

    await logsnag.track({
      channel: "subscriptions",
      event: "Suscripción cancelada",
      user_id: userId,
      description: `Suscripción cancelada: ${subscription.id}`,
      icon: "🚫",
    });
  }

  return new Response(null, { status: 200 });
}
