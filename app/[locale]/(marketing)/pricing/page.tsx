import { GetServerSideProps } from 'next';
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { ClerkServerAPI } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/subscription-plans";

type Props = {
  locale: string;
  userId: string | null;
  chargeProduct: any[];
  clientPlans: any[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context.params;
  unstable_setRequestLocale(locale as string);
  const userId = ClerkServerAPI.users.getUser(context.req);
  const chargeProductData = await getChargeProduct(locale as string);
  const clientPlans = subscriptionPlans.map(plan => ({
    ...plan,
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
    credits: plan.credits,
    features: plan.features,
    metadata: plan.metadata
  }));

  return {
    props: {
      locale,
      userId: userId || null,
      chargeProduct: chargeProductData.data || [],
      clientPlans
    }
  };
};

export default function PricingPage({ locale, userId, chargeProduct, clientPlans }: Props) {
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        chargeProduct={chargeProduct} 
        subscriptionPlans={clientPlans}
        userId={userId}
      />
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}