import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { subscriptionPlans } from "@/config/constants";
import { handleSubscribe } from "@/lib/server-actions";
import { SubscriptionPlanClient } from "@/types/subscription";
import { Testimonials } from "@/components/testimonials";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

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

  const clientPlans: SubscriptionPlanClient[] = subscriptionPlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: plan.price,
    credits: plan.credits,
    features: plan.features,
    metadata: plan.metadata,
    stripePriceIds: plan.stripePriceIds,
  }));

  return (
    <>
      <div className="container">
        <div className="min-h-[950px]">
          <h1 className="mt-24 font-medium text-center text-[100px] md:text-[170px] mb-2 leading-none">
            Free
          </h1>

          <h3 className="font-medium text-center text-[100px] md:text-[170px] mb-2 text-stroke leading-none">
            while in beta
          </h3>

          <div className="flex items-center flex-col text-center relative">
            <div className="mt-12 mb-12" />
            <p className="text-xl mt-4">Claim $49/mo deal</p>

            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="https://cal.com/pontus-midday/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border border-primary h-12 px-6"
                  >
                    Talk to us
                  </Button>
                </Link>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://app.midday.ai"
                >
                  <Button className="h-12 px-5">Get Started</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards 
        subscriptionPlans={clientPlans}
        userId={userId || undefined}
        onSubscribe={async (userId: string | undefined, planId: string, isYearly: boolean) => {
          'use server';
          return handleSubscribe(userId ?? undefined, planId, isYearly);
        }}
      />
    </div>
    <div className="container  max-w-[800px]">
          <div className="-mt-[200px] ">
            <div className="text-center">
              <h4 className="text-4xl">Frequently asked questions</h4>
            </div>

            <Accordion type="single" collapsible className="w-full mt-10 mb-48">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="truncate">Can I self-host Midday.ai?</span>
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. We are currently writing the documentation for
                  this. You can find the repository{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://git.new/midday"
                    className="underline"
                  >
                    here
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I run Midday.ai locally?
                </AccordionTrigger>
                <AccordionContent>
                  Yes. We are currently writing documentation for this. You can
                  find the repository{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://git.new/midday"
                    className="underline"
                  >
                    here
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is Midday.ai open source?</AccordionTrigger>
                <AccordionContent>
                  Yes. You can find the repository{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://git.new/midday"
                    className="underline"
                  >
                    here
                  </a>
                  .
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    What are your data privacy & security policies?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  We take data privacy very seriously and implement
                  state-of-the-art security measures to protect your data. We
                  are also actively working towards SOC 2 Type II compliance. We
                  encrypt data at rest, and sensitive data on row level. We also
                  support 2FA authentication.
                  <Link href="/policy">midday.ai/policy</Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    Can I cancel my subscription at any time?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time. If you
                  cancel your subscription, you will still be able to use Midday
                  until the end of your billing period.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  <span className="truncate max-w-[300px] md:max-w-full">
                    I have more questions about Midday.ai. How can I get in
                    touch?
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Sure, we're happy to answer any questions you might have. Just
                  send us an email at{" "}
                  <a href="mailto:support@midday.ai">support@midday.ai</a> and
                  we'll get back to you as soon as possible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

    </>
  );
}