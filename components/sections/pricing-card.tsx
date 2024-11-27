import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";

interface PricingCardProps {
  locale: string;
  chargeProduct: any[];
  subscriptionPlans: any[];
  userId: string | null;
}

export default function PricingCard({ locale, chargeProduct, subscriptionPlans, userId }: PricingCardProps) {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct} 
        subscriptionPlans={subscriptionPlans}
        userId={userId}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}