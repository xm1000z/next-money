"use server";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { absoluteUrl } from "@/lib/utils";

export type responseAction = {
  status: "success" | "error";
  stripeUrl?: string;
};

// const billingUrl = absoluteUrl("/dashboard/billing")
const billingUrl = absoluteUrl("/pricing");

export async function generateUserStripe(
  priceId: string,
  productId: string,
  amount: number
): Promise<responseAction> {
  let redirectUrl: string = "";

  try {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress) {
      throw new Error("Unauthorized");
    }

    const subscriptionPlan = await getUserSubscriptionPlan(user.id);

    if (subscriptionPlan.isPaid && subscriptionPlan.stripeCustomerId) {
      // User on Paid Plan - Create a portal session to manage subscription.
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscriptionPlan.stripeCustomerId,
        return_url: billingUrl,
      });

      redirectUrl = stripeSession.url as string;
    } else {
      // User on Free Plan - Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${billingUrl}?success=true`,
        cancel_url: `${billingUrl}?success=false`,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.primaryEmailAddress.emailAddress,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: user.id,
          productId: productId,
        },
      });

      redirectUrl = stripeSession.url as string;
    }

    return { status: "success", stripeUrl: redirectUrl };
  } catch (error) {
    console.error("Error generating Stripe session:", error);
    return { status: "error" };
  }
}
