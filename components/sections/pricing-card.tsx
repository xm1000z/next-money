import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/subscription-plans";

interface PricingCardProps {
  chargeProduct: any[];
}

export function PricingCard({ chargeProduct }: PricingCardProps) {
  const plans = subscriptionPlans.map(plan => ({
    ...plan,
    stripePriceIds: {
      monthly: plan.stripePriceIds.monthly,
      yearly: plan.stripePriceIds.yearly
    }
  }));

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct} 
        subscriptionPlans={plans}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
