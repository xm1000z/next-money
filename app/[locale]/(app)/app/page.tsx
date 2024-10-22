import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import BillingsInfo from "@/components/billing-info";

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: PageProps) {
  const t = await getTranslations({ locale, namespace: "Billings" });

  return {
    title: "NotasAI",
    description: "Inteligencia Artificial en español.",
  };
}
export default async function DashboardPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale);

  return <BillingsInfo />;
}
