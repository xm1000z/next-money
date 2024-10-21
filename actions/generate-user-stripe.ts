"use server";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  productId: string
): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    // Obtener el producto de la base de datos
    const product = await prisma.chargeProduct.findUnique({
      where: { id: parseInt(productId) }
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // Usuario con plan pagado - Crear una sesión del portal para gestionar la suscripción.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      // Usuario con plan gratuito - Crear una sesión de checkout para actualizar.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: billingUrl,
        cancel_url: billingUrl,
        payment_method_types: ["card"],
        mode: product.isSubscription ? "subscription" : "payment",
        billing_address_collection: "auto",
        customer_email: user.primaryEmailAddress.emailAddress,
        line_items: [
          {
            price_data: {
              currency: product.currency,
              product_data: {
                name: product.title,
              },
              unit_amount: product.amount,
              recurring: product.isSubscription ? { interval: "month" } : undefined,
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
          productId: product.id.toString(),
        },
      });

      redirectUrl = stripeSession.url as string;
    }
  } catch (error) {
    throw new Error("Failed to generate user stripe session");
  }

  // no revalidatePath because redirect
  redirect(redirectUrl);
}
