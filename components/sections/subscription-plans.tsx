import { subscriptionPlans } from "@/config/subscription-plans";

export async function getSubscriptionPlans() {
  // Procesar los planes en el servidor
  return subscriptionPlans.map(plan => ({
    ...plan,
    stripePriceIds: {
      monthly: plan.stripePriceIds.monthly,
      yearly: plan.stripePriceIds.yearly
    }
  }));
} 