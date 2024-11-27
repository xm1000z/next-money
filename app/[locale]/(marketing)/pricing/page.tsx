import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";

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

  // Procesar los planes para el cliente (sin IDs de Stripe)
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