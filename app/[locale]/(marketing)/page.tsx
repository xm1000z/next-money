import { unstable_setRequestLocale } from "next-intl/server";

import { Screens } from "@/components/sections/screens";
import { SectionOne } from "@/components/sections/section-one";
import { SectionTwo } from "@/components/sections/section-two";
import { SectionThree } from "@/components/sections/section-three";
import { SectionFour } from "@/components/sections/section-four";
import { SectionFive } from "@/components/sections/section-five";
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
    <div className="dark">
      <div className="bg-background">
        <HeroLanding />
        <Screens />
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <PricingCard locale={locale} />
      </div>
    </div>
  );
}
