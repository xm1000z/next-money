import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";
import { handleSubscribe } from "@/lib/server-actions";

type Props = {
  locale: string;
  userId?: string | null;
};

export default async function PricingCard({ locale, userId }: Props) {
  const { data: chargeProduct } = await getChargeProduct(locale);

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct as any[]} 
        subscriptionPlans={subscriptionPlans}
        userId={userId || undefined}
        onSubscribe={async (planId: string) => {
          await handleSubscribe(userId, planId);
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
