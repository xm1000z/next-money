import { PricingCards } from "@/components/pricing-cards";
import { auth } from "@clerk/nextjs/server";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getChargeProduct } from "@/db/queries/charge-product";

interface PricingCardProps {
  locale: string;
}

export default async function PricingCard({ locale }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);
  const { userId } = auth();


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
          const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, planId }),
          });

          if (response.ok) {
            console.log('Subscription successful');
          } else {
            console.error('Subscription failed');
          }
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}