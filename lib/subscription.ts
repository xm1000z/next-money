//@ts-nocheck
import { User } from "@clerk/nextjs/dist/types/server";
import { subscriptionPlans } from "@/config/subscription-plans";
import { prisma } from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { getCachedSubscription } from "@/lib/redis";

export async function getUserSubscriptionPlan(userId: string, authUser?: User) {
  // Intentar obtener del caché primero
  const cachedSubscription = await getCachedSubscription(userId);
  
  if (cachedSubscription) {
    const plan = subscriptionPlans.find(p => p.id === cachedSubscription.planId);
    return {
      ...plan,
      ...cachedSubscription,
      isPaid: true,
      interval: cachedSubscription.stripePriceId?.includes('monthly') ? 'month' : 'year'
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: 'active',
      currentPeriodEnd: {
        gt: new Date()
      }
    }
  });

  if (!subscription) {
    // Plan gratuito por defecto (starter)
    return {
      ...subscriptionPlans[0],
      isPaid: false,
      interval: null,
      status: 'inactive'
    };
  }

  const plan = subscriptionPlans.find(p => p.id === subscription.planId);
  
  if (!plan) {
    throw new Error("Plan no encontrado");
  }

  const interval = subscription.stripePriceId?.includes('monthly') ? 'month' : 'year';

  return {
    ...plan,
    ...subscription,
    isPaid: true,
    interval
  };
}

interface ManageCreditsParams {
  userId: string;
  amount: number;
  operation: 'add' | 'subtract';
  description?: string;
}

export async function manageSubscriptionCredits({ 
  userId, 
  amount, 
  operation,
  description = '' 
}: ManageCreditsParams) {
  return await prisma.$transaction(async (tx) => {
    const subscription = await tx.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      throw new Error("No active subscription found");
    }

    const updatedCredits = operation === 'add' 
      ? subscription.credits + amount
      : subscription.credits - amount;

    if (updatedCredits < 0) {
      throw new Error("Insufficient credits");
    }

    await tx.subscription.update({
      where: { userId },
      data: { credits: updatedCredits },
    });

    // Registrar la transacción
    return tx.userCreditTransaction.create({
      data: {
        userId,
        credit: operation === 'add' ? amount : -amount,
        balance: updatedCredits,
        type: operation === 'add' ? 'SubscriptionCredit' : 'SubscriptionDebit',
        description
      },
    });
  });
}

export async function hasActiveSubscription(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: { 
      userId,
      status: 'active',
      currentPeriodEnd: {
        gt: new Date()
      }
    }
  });

  return !!subscription;
}
