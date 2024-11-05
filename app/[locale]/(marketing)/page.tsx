import { unstable_setRequestLocale } from "next-intl/server";

import { Screens } from "@/components/sections/screens";
import { SectionOne } from "@/components/sections/section-one";
import Features from "@/components/sections/features";
import HeroLanding from "@/components/sections/hero-landing";
import PricingCard from "@/components/sections/pricing-card";
import { infos } from "@/config/landing";

type Props = {
  params: { locale: string };
};

export default function IndexPage({ params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <>
      <HeroLanding />
      {/* <Powered />
      {/* <BentoGrid /> */}
      {/* <InfoLanding data={infos[0]} reverse={true} /> */}
      {/* <InfoLanding data={infos[1]} /> */}
      <Screens />
      {/*<Features />*/}
      <SectionOne />
      <SectionTwo />
      <PricingCard locale={locale} />
    </>
  );
}
