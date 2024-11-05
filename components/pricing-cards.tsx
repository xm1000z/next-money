"use client";

import { cloneElement, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useReward } from "react-rewards";

import { BillingFormButton } from "@/components/forms/billing-form-button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import SignBox from "@/components/sign-box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ChargeProductSelectDto } from "@/db/type";
import { useMediaQuery } from "@/hooks/use-media-query";
import { url } from "@/lib";
import { usePathname } from "@/lib/navigation";
import { cn, formatPrice } from "@/lib/utils";

interface PricingCardsProps {
  userId?: string;
  locale?: string;
  chargeProduct?: ChargeProductSelectDto[];
}

const PricingCard = ({
  userId,
  offer,
}: {
  userId?: string;
  offer: ChargeProductSelectDto;
}) => {
  const pathname = usePathname();
  const t = useTranslations("PricingPage");

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border shadow-lg transition-all duration-300",
        "backdrop-blur-md bg-background/50 dark:bg-background/30",
        offer.amount === 1990 
          ? "border-primary/50 dark:border-primary/30 scale-105" 
          : "hover:scale-102.5 hover:shadow-xl",
      )}
      key={offer.title}
    >
      <div className="min-h-[180px] items-start space-y-6 bg-muted/30 dark:bg-muted/10 p-8">
        <p className="font-urban text-lg font-bold uppercase tracking-wider text-primary/80 dark:text-primary/70">
          {offer.title}
        </p>

        <div className="flex flex-col items-start">
          <div className="flex items-baseline space-x-2 text-4xl font-semibold">
            {offer.originalAmount && offer.originalAmount > 0 ? (
              <>
                <span className="text-xl text-muted-foreground/70 line-through">
                  {formatPrice(offer.originalAmount, "€")}
                </span>
                <span>{formatPrice(offer.amount, "€")}</span>
              </>
            ) : (
              `${formatPrice(offer.amount, "€")}`
            )}
            <div className="text-base font-medium text-muted-foreground">
              / {offer.credit} {t("worth")}
            </div>
          </div>
        </div>
        <div className="text-left text-sm text-muted-foreground/90">
          <div>{t("description")}</div>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between gap-8 p-8">
        <ul className="space-y-3 text-left text-sm font-medium leading-normal">
          {offer.message &&
            offer.message.split(",")?.map((feature) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-primary" />
                <p>{feature}</p>
              </li>
            ))}
        </ul>
        <SignedIn>
          <BillingFormButton 
            offer={offer} 
            btnText={t("action.buy")} 
            className="w-full transition-all duration-300 hover:brightness-110"
          />
        </SignedIn>

        <SignedOut>
          <div className="flex justify-center">
            <SignInButton mode="redirect" forceRedirectUrl={url(pathname).href}>
              <Button
                variant={offer.amount === 1990 ? "default" : "outline"}
                className="w-full transition-all duration-300 hover:brightness-110"
              >
                {t("action.signin")}
              </Button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export function FreeCard() {
  const t = useTranslations("PricingPage");

  return (
    <div
      className={cn(
        "relative col-span-3 flex flex-col overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-xl",
        "backdrop-blur-md bg-background/50 dark:bg-background/30 hover:scale-102.5",
      )}
    >
      <div className="min-h-[180px] items-start space-y-6 bg-muted/30 dark:bg-muted/10 p-8">
        <p className="font-urban text-lg font-bold uppercase tracking-wider text-primary/80 dark:text-primary/70">
          Free
        </p>

        <div className="flex flex-col items-start">
          <div className="flex items-baseline space-x-2 text-4xl font-semibold">
            {`${formatPrice(0, "€")}`}
            <div className="text-base font-medium text-muted-foreground">
              / 5 {t("worth")}
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col justify-between gap-8 p-8">
        <ul className="space-y-3 text-left text-sm font-medium leading-normal">
          {["Limited models", "Max 5/month Flux.1 Schnell Images"]?.map(
            (feature) => (
              <li className="flex items-start gap-x-3" key={feature}>
                <Icons.check className="size-5 shrink-0 text-primary" />
                <p>{feature}</p>
              </li>
            ),
          )}

          {["Private Generations", "Commercial License"].map((feature) => (
            <li
              className="flex items-start text-muted-foreground"
              key={feature}
            >
              <Icons.close className="mr-3 size-5 shrink-0" />
              <p>{feature}</p>
            </li>
          ))}
        </ul>
        <SignBox>
          <Button className="w-full transition-all duration-300 hover:brightness-110">Try Out</Button>
        </SignBox>
      </div>
    </div>
  );
}

export function PricingCards({
  userId,
  chargeProduct,
  locale,
}: PricingCardsProps) {
  const t = useTranslations("PricingPage");
  const isYearlyDefault = false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const searchParams = useSearchParams();

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const { reward } = useReward("order-success", "confetti", {
    position: "fixed",
    elementCount: 360,
    spread: 80,
    elementSize: 8,
    lifetime: 400,
  });

  useEffect(() => {
    if (!searchParams.size) {
      return;
    }
    if (searchParams.get("success") === "true") {
      setTimeout(() => {
        reward();
      }, 1000);
    } else if (searchParams.get("success") === "false") {
      console.log("Payment failed");
    }
  }, [searchParams]);

  return (
    <MaxWidthWrapper className="py-20">
      <section className="flex flex-col items-center text-center space-y-12">
        <HeaderSection
          label={t("label")}
          title={t("title")}
          className="text-4xl font-bold tracking-tight"
        />
        <div className="w-full">
          <p className="mb-8 inline-flex items-center justify-center border border-[rgba(27, 27, 27, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-[#ececec] px-4 py-2 text-sm text-primary dark:bg-[#1b1b1b]">
            <span className="font-medium">
              {t("tip.title")}
              &nbsp;
              <a
                href="https://notas.ai/pricing"
                className="font-semibold underline decoration-primary/70 hover:decoration-primary"
              >
                {t("tip.contact")}
              </a>
            </span>
          </p>
        </div>

        <div className="grid gap-8 bg-inherit w-full max-w-6xl mx-auto md:grid-cols-3">
          {chargeProduct?.map((offer) => (
            <PricingCard offer={offer} key={offer.id} />
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-center text-base text-muted-foreground">
          {t("contact.title")}
          <br />
          <a
            className="font-medium text-primary"
            href="mailto:soporte@notas.ai"
          >
            soporte@notas.ai
          </a>{" "}
          {t("contact.description")}
        </p>
      </section>
      <div
        className="pointer-events-none fixed bottom-10 left-[50%] translate-x-[-50%]"
        id="order-success"
      />
    </MaxWidthWrapper>
  );
}

export function PricingCardDialog({
  onClose,
  isOpen,
  chargeProduct,
}: {
  isOpen: boolean;
  chargeProduct?: ChargeProductSelectDto[];
  onClose: (isOpen: boolean) => void;
}) {
  const t = useTranslations("PricingPage");
  const { isSm, isMobile } = useMediaQuery();
  const product = useMemo(() => {
    if (isSm || isMobile) {
      return ([chargeProduct?.[1]] ?? []) as ChargeProductSelectDto[];
    }
    return chargeProduct ?? ([] as ChargeProductSelectDto[]);
  }, [isSm, isMobile]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onClose(open);
      }}
    >
      <DialogContent className="w-[96vw] md:w-[960px] md:max-w-[960px] bg-background/80 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">{t("title")}</DialogTitle>
          <div className="grid grid-cols-1 gap-8 bg-inherit py-5 lg:grid-cols-3">
            {product?.map((offer) => (
              <PricingCard offer={offer} key={offer.id} />
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}