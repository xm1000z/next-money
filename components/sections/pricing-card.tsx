import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getChargeProduct } from "@/db/queries/charge-product";
import { handleSubscribe } from "@/lib/server-actions";

interface PricingCardProps {
  locale: string;
}

export default async function PricingCard({ locale, userId }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);

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
        onSubscribe={async (planId: string) => {
          await handleSubscribe(userId, planId);
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}