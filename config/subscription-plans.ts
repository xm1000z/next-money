import { env } from "@/env.mjs";
import { subscriptionPlansClient } from "./subscription-plans-client";

// Extender los planes con la información sensible solo en el servidor
export const subscriptionPlans = subscriptionPlansClient.map(plan => ({
  ...plan,
  stripePriceIds: {
    monthly: env[`NEXT_PUBLIC_STRIPE_${plan.id.toUpperCase()}_MONTHLY_PRICE_ID`],
    yearly: env[`NEXT_PUBLIC_STRIPE_${plan.id.toUpperCase()}_YEARLY_PRICE_ID`]
  }
}));

export const subscriptionConfig = {
  webhook: {
    secret: process.env.STRIPE_WEBHOOK_SECRET_SUBSCRIPTION!,
  },
  stripe: {
    key: process.env.STRIPE_SECRET_KEY!,
  }
}; 