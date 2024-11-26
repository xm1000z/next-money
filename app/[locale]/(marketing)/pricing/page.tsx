import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";

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

  // Manejar la suscripción en el servidor
  const handleSubscribe = async (planId: string) => {
    'use server';
    
    if (!userId) return;

    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) return;

    return await createSubscriptionCheckout({
      priceId: plan.stripePriceIds.monthly,
      userId,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/app/settings/subscription?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=false`,
    });
  };

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct} 
        subscriptionPlans={subscriptionPlans}
        userId={userId || undefined}
        onSubscribe={handleSubscribe}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
