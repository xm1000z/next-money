import { PricingCards } from "@/components/pricing-cards";
import { auth } from "@clerk/nextjs/server";
import { PricingFaq } from "@/components/pricing-faq";
import { subscriptionPlans } from "@/config/constants";
import { getChargeProduct } from "@/db/queries/charge-product";
import { handleSubscribe } from "@/lib/server-actions";
import { SubscriptionPlanClient } from "@/types/subscription";

interface PricingCardProps {
  locale: string;
}

export default async function PricingCard({ locale }: PricingCardProps) {
  const { data: chargeProduct = [] } = await getChargeProduct(locale);
  const { userId } = auth();

  const clientPlans: SubscriptionPlanClient[] = subscriptionPlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
    stripePriceIds: plan.stripePriceIds,
    credits: plan.credits,
    features: plan.features,
    metadata: plan.metadata,
  }));

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        subscriptionPlans={clientPlans}
        userId={userId ?? undefined}
        onSubscribe={async (userId: string | undefined, planId: string, isYearly: boolean) => {
          'use server';
          return handleSubscribe(userId ?? undefined, planId, isYearly);
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}