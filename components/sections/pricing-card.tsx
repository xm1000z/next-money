import { PricingCards } from "@/components/pricing-cards";
import { auth } from "@clerk/nextjs/server";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getChargeProduct } from "@/db/queries/charge-product";
import { getUserSubscriptionPlan } from "@/lib/subscription";

interface PricingCardProps {
  locale: string;
}

export default async function PricingCard({ locale }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);
  const { userId } = auth();

  let currentPlan;
  let isCurrentPlanActive = false;

  if (userId) {
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    currentPlan = subscriptionPlan.id;
    isCurrentPlanActive = subscriptionPlan.status === 'active';
  }

  const clientPlans = subscriptionPlans.map(plan => ({
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
        currentPlan={currentPlan}
        isCurrentPlanActive={isCurrentPlanActive}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}