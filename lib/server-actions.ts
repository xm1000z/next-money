'use server';

import { subscriptionPlans } from "@/config/subscription-plans";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";
import { redirect } from "next/navigation";

export async function handleSubscribe(userId: string | null, planId: string) {
  if (!userId) return;

  const plan = subscriptionPlans.find(p => p.id === planId);
  if (!plan) return;

  const checkoutUrl = await createSubscriptionCheckout({
    priceId: plan.stripePriceIds.monthly, // Usar el ID de precio mensual
    userId,
    successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/subscription?success=true`,
    cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=false`,
  });

  if (checkoutUrl) {
    redirect(checkoutUrl);
  }
} 