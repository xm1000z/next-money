import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import PricingCard from "@/components/sections/pricing-card";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale });
  return {
    title: `Packs - NotasAI`,
    description: t("LocaleLayout.description"),
  };
}

export default async function PricingPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  
  return <PricingCard locale={locale} />;
}