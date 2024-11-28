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
import { useToast } from "@/components/ui/use-toast";

interface PricingCardsProps {
  userId?: string;
  currentPlan?: string;
  isCurrentPlanActive?: boolean;
  locale?: string;
  chargeProduct?: ChargeProductSelectDto[];
  subscriptionPlans: SubscriptionPlanClient[];
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
  currentPlan,
  isCurrentPlanActive,
  subscriptionPlans,
  chargeProduct
}: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("PricingPage");

  const handleSubscriptionClick = async (planId: string) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para suscribirte",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          interval: isYearly ? 'yearly' : 'monthly'
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar la suscripción');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error al procesar la suscripción:', error);
      toast({
        title: "Error",
        description: "No se pudo procesar la suscripción",
        variant: "destructive"
      });
    }
  };

  const getButtonConfig = (plan: SubscriptionPlanClient) => {
    if (currentPlan === plan.id && isCurrentPlanActive) {
      return {
        text: "Plan Actual",
        disabled: true,
        variant: "outline" as const,
      };
    }

    if (currentPlan) {
      return {
        text: "Cambiar Plan",
        disabled: false,
        variant: "default" as const,
      };
    }

    return {
      text: "Suscribirse",
      disabled: false,
      variant: plan.metadata?.recommended ? "default" as const : "outline" as const,
    };
  };

  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto mb-8 flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Planes Simples, Sin Sorpresas
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          <span className={cn("text-sm", !isYearly && "text-primary font-medium")}>Mensual</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
          />
          <span className={cn("text-sm", isYearly && "text-primary font-medium")}>
            Anual <span className="text-xs text-muted-foreground">(2 meses gratis)</span>
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {subscriptionPlans.map((plan) => {
          const buttonConfig = getButtonConfig(plan);
          const price = isYearly ? plan.price.yearly : plan.price.monthly;

          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-lg border bg-background p-8",
                plan.metadata?.recommended && "border-primary shadow-lg"
              )}
            >
              {plan.metadata?.recommended && (
                <div className="absolute top-0 right-0 mr-4 mt-4 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                  Recomendado
                </div>
              )}
              
              <div className="flex-1 space-y-4">
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{formatPrice(price, "EUR")}</span>
                  <span className="text-sm text-muted-foreground ml-1">
                    /{isYearly ? 'año' : 'mes'}
                  </span>
                </div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Icons.check className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <SignedIn>
                <Button
                  className="mt-8 w-full"
                  variant={buttonConfig.variant}
                  disabled={buttonConfig.disabled}
                  onClick={() => handleSubscriptionClick(plan.id)}
                >
                  {buttonConfig.text}
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="mt-8 w-full" variant={buttonConfig.variant}>
                    Iniciar Sesión
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          );
        })}
      </div>
    </section>
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