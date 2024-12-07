'use server';

import { subscriptionPlans } from "@/config/constants";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/db/prisma";

const subscribeSchema = z.object({
  userId: z.string().min(1),
  planId: z.string().min(1)
});

export async function handleSubscribe(userId: string | undefined, planId: string, isYearly: boolean): Promise<{ url: string } | void> {
  if (!userId) {
    console.error('Usuario no autenticado');
    return;
  }
  
  try {
    const result = subscribeSchema.safeParse({ userId, planId });
    if (!result.success) {
      throw new Error('Invalid input data');
    }

    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan not found');
    }

    const priceId = isYearly ? plan.stripePriceIds.yearly : plan.stripePriceIds.monthly;

    const checkoutUrl = await createSubscriptionCheckout({
      priceId,
      userId,
      metadata: {
        userId,
        planId,
        priceId,
      },
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=false`,
    });

    if (!checkoutUrl) {
      throw new Error('Failed to create checkout session');
    }

    return { url: checkoutUrl };
  } catch (error) {
    console.error('Error al procesar la suscripción:', error);
  }
}