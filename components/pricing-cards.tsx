"use client";

import { cloneElement, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useReward } from "react-rewards";
import { Switch } from "@/components/ui/switch";

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
import { createSubscriptionCheckout } from "@/lib/stripe-actions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SubscriptionPlanClient } from "@/types/subscription";

interface PricingCardsProps {
  userId?: string;
  locale?: string;
  chargeProduct?: ChargeProductSelectDto[];
  subscriptionPlans: SubscriptionPlanClient[];
  onSubscribe: (userId: string | undefined, priceId: string) => Promise<{ url: string } | void>;
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
  subscriptionPlans,
  onSubscribe
}: {
  userId?: string;
  subscriptionPlans: SubscriptionPlanClient[];
  onSubscribe: (userId: string | undefined, priceId: string) => Promise<{ url: string } | void>;
}) {
  const t = useTranslations("PricingPage");
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const router = useRouter();

  const handleSubscriptionClick = async (plan: SubscriptionPlanClient) => {
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }
    try {
      const priceId = isYearly ? plan.stripePriceIds.yearly : plan.stripePriceIds.monthly;
      const result = await onSubscribe(userId, priceId);
      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Error al procesar la suscripción');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 justify-center mb-8">
        <span className={isYearly ? "text-sm" : "text-sm text-primary font-medium"}>
          Mensual
        </span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className={isYearly ? "text-sm text-primary font-medium" : "text-sm"}>
          Anual
          <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Ahorra 20%
          </span>
        </span>
      </div>

      <div className="grid gap-8">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="border p-4">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>
              {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly, "€")}
              / {isYearly ? "año" : "mes"}
            </p>
            <Button onClick={() => handleSubscriptionClick(plan)}>
              Suscribirse
            </Button>
          </div>
        ))}
      </div>
    </div>
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