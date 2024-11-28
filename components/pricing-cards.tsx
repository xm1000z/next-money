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
  onSubscribe: (userId: string | undefined, planId: string) => Promise<{ url: string } | void>;
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
              `55€`
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
  subscriptionPlans,
  onSubscribe
}: PricingCardsProps) {
  const t = useTranslations("PricingPage");
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetch('/api/subscription/status')
        .then(res => res.json())
        .then(data => setHasSubscription(data.hasActiveSubscription));
    }
  }, [userId]);

  const handleSubscriptionClick = async (planId: string) => {
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }
    try {
      const result = await onSubscribe(userId, planId);
      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Error al procesar la suscripción');
    }
  };

  return (
    <MaxWidthWrapper className="py-20">
      <section className="flex flex-col items-center text-center space-y-12">
        <HeaderSection
          label={t("label")}
          title={t("title")}
          className="text-4xl font-bold tracking-tight"
        />

        {/* Planes de Suscripción */}
        <div className="w-full">
          <div className="flex items-center gap-4 justify-center mb-8">
            <span className={cn(
              "text-sm",
              !isYearly && "text-primary font-medium"
            )}>
              Mensual
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={cn(
              "text-sm",
              isYearly && "text-primary font-medium"
            )}>
              Anual
              <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                Ahorra 20%
              </span>
            </span>
          </div>

          <div className="grid gap-8 bg-inherit w-full max-w-6xl mx-auto md:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col overflow-hidden border shadow-lg transition-all duration-300",
                  "backdrop-blur-md bg-background/50 dark:bg-background/30",
                  plan.metadata?.recommended 
                    ? "border-primary/50 dark:border-primary/30 scale-105" 
                    : "hover:scale-102.5 hover:shadow-xl",
                )}
              >
                <div className="min-h-[180px] items-start space-y-6 bg-muted/30 dark:bg-muted/10 p-8">
                  <p className="font-urban text-lg font-bold uppercase tracking-wider text-primary/80 dark:text-primary/70">
                    {plan.name}
                  </p>

                  <div className="flex flex-col items-start">
                    <div className="flex items-baseline space-x-2 text-4xl font-semibold">
                      {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly, "€")}
                      <div className="text-base font-medium text-muted-foreground">
                        / {isYearly ? "año" : "mes"}
                      </div>
                    </div>
                  </div>
                  <div className="text-left text-sm text-muted-foreground/90">
                    {plan.description}
                  </div>
                </div>

                <div className="flex h-full flex-col justify-between gap-8 p-8">
                  <ul className="space-y-3 text-left text-sm font-medium leading-normal">
                    {plan.features.map((feature) => (
                      <li className="flex items-start gap-x-3" key={feature}>
                        <Icons.check className="size-5 shrink-0 text-primary" />
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>

                  <SignedIn>
                    <Button 
                      className="w-full"
                      variant={plan.metadata?.recommended ? "default" : "outline"}
                      onClick={() => handleSubscriptionClick(plan.id)}
                    >
                      Suscribirse
                    </Button>
                  </SignedIn>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <Button
                        variant={plan.metadata?.recommended ? "default" : "outline"}
                        className="w-full"
                      >
                        {t("action.signin")}
                      </Button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planes de pago único - Solo visibles para usuarios suscritos */}
        {hasSubscription ? (
          <>
            <div className="mt-8 text-center text-lg font-medium">
              Compra créditos adicionales
            </div>
            <div className="grid gap-8 bg-inherit w-full max-w-6xl mx-auto md:grid-cols-3">
              {chargeProduct?.map((offer) => (
                <PricingCard offer={offer} key={offer.id} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 p-6 bg-muted/30 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              ¿Necesitas más créditos?
            </h3>
            <p className="text-muted-foreground">
              Suscríbete a uno de nuestros planes para acceder a la compra de créditos adicionales.
            </p>
          </div>
        )}

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