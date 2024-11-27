import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { subscriptionPlans } from "@/config/subscription-plans";
import { getChargeProduct } from "@/db/queries/charge-product";

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
  const { data: chargeProduct = [] } = await getChargeProduct(locale);

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
        subscriptionPlans={clientPlans}
        userId={userId || undefined}
        currentPlan={currentPlan}
        isCurrentPlanActive={isCurrentPlanActive}
        chargeProduct={chargeProduct}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
