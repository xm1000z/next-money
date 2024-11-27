import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";
import { handleSubscribe } from "@/lib/server-actions";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { SubscriptionPlanClient } from "@/types/subscription";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  return {
    title: `Precios`,
    description: t("LocaleLayout.description"),
  };
}

export default async function PricingPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const { userId } = auth();

  let currentPlan;
  let isCurrentPlanActive = false;

  if (userId) {
    const subscriptionPlan = await getUserSubscriptionPlan(userId);
    currentPlan = subscriptionPlan.id;
    isCurrentPlanActive = subscriptionPlan.status === 'active';
  }

  const { data: chargeProduct = [] } = await getChargeProduct(locale);

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
        onSubscribe={async (planId: string, interval: 'monthly' | 'yearly') => {
          return handleSubscribe(userId ?? undefined, planId, interval);
        }}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
