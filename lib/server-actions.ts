'use server';

import { subscriptionPlans } from "@/config/subscription-plans";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";
import { redirect } from "next/navigation";
import { z } from "zod";

const subscribeSchema = z.object({
  userId: z.string().min(1),
  planId: z.string().min(1),
  interval: z.enum(['monthly', 'yearly'])
});

export async function handleSubscribe(
  userId: string | undefined, 
  planId: string,
  interval: 'monthly' | 'yearly'
): Promise<{ url: string } | void> {
  if (!userId) {
    throw new Error('Usuario no autenticado');
  }
  
  try {
    const result = subscribeSchema.safeParse({ userId, planId, interval });
    if (!result.success) {
      throw new Error('Datos de entrada inválidos');
    }

    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Plan no encontrado');
    }

    const priceId = interval === 'yearly' ? plan.price.yearly : plan.price.monthly;

    const checkoutUrl = await createSubscriptionCheckout({
      priceId,
      userId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=false`,
    });

    if (!checkoutUrl) {
      throw new Error('Error al crear la sesión de checkout');
    }

    return { url: checkoutUrl };
  } catch (error) {
    console.error('Error de suscripción:', error);
    throw error;
  }
} 