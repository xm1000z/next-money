"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { useReward } from "react-rewards";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { Icons } from "./shared/icons";
import { subscriptionPlansClient } from "@/config/subscription-plans-client";
import { createSubscriptionCheckout } from "@/lib/stripe-actions";

interface PricingCardsProps {
  chargeProduct: any[];
  subscriptionPlans: any[];
}

export function PricingCards({ chargeProduct, subscriptionPlans }: PricingCardsProps) {
  const router = useRouter();

  const handleSubscription = async (priceId: string) => {
    try {
      const checkoutUrl = await createSubscriptionCheckout({
        priceId,
        userId: userId,
        successUrl: `${window.location.origin}/app/settings/subscription?success=true`,
        cancelUrl: `${window.location.origin}/pricing?success=false`,
      });

      if (checkoutUrl) {
        router.push(checkoutUrl);
      }
    } catch (error) {
      console.error('Error al crear la suscripción:', error);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Primero los planes de suscripción */}
      {subscriptionPlansClient.map(plan => (
        <div key={plan.id} className="relative flex flex-col overflow-hidden border shadow-lg">
          <div className="min-h-[180px] items-start space-y-6 bg-muted/30 dark:bg-muted/10 p-8">
            <p className="font-urban text-lg font-bold uppercase tracking-wider text-primary/80 dark:text-primary/70">
              {plan.name}
            </p>
            <div className="flex flex-col items-start">
              <div className="flex items-baseline space-x-2 text-4xl font-semibold">
                {formatPrice(plan.price.monthly, "€")}
                <div className="text-base font-medium text-muted-foreground">/ mes</div>
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
            <Button 
              className="w-full"
              variant={plan.metadata?.recommended ? "default" : "outline"}
              onClick={() => handleSubscription(plan.stripePriceIds.monthly)}
            >
              Suscribirse
            </Button>
          </div>
        </div>
      ))}

      {/* Luego los planes de pago único */}
      {chargeProduct?.map((offer) => (
        <PricingCard offer={offer} key={offer.id} />
      ))}
    </div>
  );
}

export function PricingCardDialog({
  onClose,
  isOpen,
  chargeProduct,
}: {
  isOpen: boolean;
  chargeProduct?: any[];
  onClose: (isOpen: boolean) => void;
}) {
  const t = useTranslations("PricingPage");
  const { isSm, isMobile } = useMediaQuery();
  const product = useMemo(() => {
    if (isSm || isMobile) {
      return ([chargeProduct?.[1]] ?? []);
    }
    return chargeProduct ?? [];
  }, [isSm, isMobile, chargeProduct]);

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