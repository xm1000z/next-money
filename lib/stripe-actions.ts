"use server";

import { auth } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function createCheckoutSession(planId: string) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("User not found");
  }

  const billingUrl = absoluteUrl("/pricing");

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${billingUrl}?success=true`,
    cancel_url: `${billingUrl}?success=false`,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: userId,
    line_items: [
      {
        price: planId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  return checkoutSession.url;
}

export async function createCustomerPortalSession(customerId: string) {
  const billingUrl = absoluteUrl("/app/settings/subscription");
  
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: billingUrl,
  });

  return portalSession.url;
} 