import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { getSubscriptionPlans } from "./subscription-plans";

interface PricingCardProps {
  locale: string;
}

export const PricingCard = async function PricingCard({ locale }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);
  const plans = await getSubscriptionPlans();

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
