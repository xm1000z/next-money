//@ts-nocheck
import { User } from "@clerk/nextjs/dist/types/server";

import { pricingData } from "@/config/subscriptions";
import { prisma } from "@/db/prisma";
import { stripe } from "@/lib/stripe";
import { getCachedSubscription } from "@/lib/redis";

export async function getUserSubscriptionPlan(userId: string, authUser?: User) {
  // Intentar obtener del caché primero
  const cachedSubscription = await getCachedSubscription(userId);
  
  if (cachedSubscription) {
    const plan = pricingData.find(p => p.id === cachedSubscription.planId);
    return {
      ...plan,
      ...cachedSubscription,
      isPaid: true,
      interval: cachedSubscription.stripePriceId?.includes('monthly') ? 'month' : 'year'
    };
  }

  let user = await prisma.userPaymentInfo.findFirst({
    where: {
      userId,
    },
  });

  if (!user && !authUser) {
    throw new Error("User not found");
  } else if (authUser) {
    user = {
      ...user,
      stripePriceId: null,
      stripeSubscriptionId: null,
      stripeCurrentPeriodEnd: null,
    };
  }

  // Check if user is on a paid plan.
  const isPaid =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()
      ? true
      : false;

  // Find the pricing data corresponding to the user's plan
  const userPlan =
    pricingData.find((plan) => plan.stripeIds.monthly === user.stripePriceId) ||
    pricingData.find((plan) => plan.stripeIds.yearly === user.stripePriceId);

  const plan = isPaid && userPlan ? userPlan : pricingData[0];

  const interval = isPaid
    ? userPlan?.stripeIds.monthly === user.stripePriceId
      ? "month"
      : userPlan?.stripeIds.yearly === user.stripePriceId
        ? "year"
        : null
    : null;

  let isCanceled = false;
  if (isPaid && user.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId,
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    ...user,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    isPaid,
    interval,
    isCanceled,
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
