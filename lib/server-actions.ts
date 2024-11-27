'use server';

import { subscriptionPlans } from "@/config/subscription-plans";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";
import { redirect } from "next/navigation";
import { z } from "zod";

const subscribeSchema = z.object({
  userId: z.string().min(1),
  planId: z.string().min(1)
});

export async function handleSubscribe(userId: string | null, planId: string) {
  try {
    const result = subscribeSchema.safeParse({ userId, planId });
    if (!result.success) {
      throw new Error('Invalid input data');
    }

    if (!userId) {
      throw new Error('Authentication required');
    }

    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const checkoutUrl = await createSubscriptionCheckout({
      priceId: plan.stripePriceIds.monthly,
      userId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=false`,
    });

    if (!checkoutUrl) {
      throw new Error('Failed to create checkout session');
    }

    return { url: checkoutUrl };
  } catch (error) {
    console.error('Subscription error:', error);
    throw new Error('Failed to process subscription');
  }
} 