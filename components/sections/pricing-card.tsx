import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getChargeProduct } from "@/db/queries/charge-product";
import { handleSubscribe } from "@/lib/server-actions";

type PricingCardProps = {
  params: { locale: string };
};

export default async function PricingCard({ locale }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);

  const clientPlans = subscriptionPlans.map(plan => ({
    ...plan,
    // No incluir stripePriceIds
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
    credits: plan.credits,
    features: plan.features,
    metadata: plan.metadata
  }));

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct} 
        subscriptionPlans={clientPlans}
        userId={userId || undefined}
        onSubscribe={async (planId: string) => {
          'use server';
          await handleSubscribe(userId, planId);
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}