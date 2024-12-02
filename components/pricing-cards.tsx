"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SubscriptionPlanClient } from "@/types/subscription";
import { cn, formatPrice } from "@/lib/utils";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlans: SubscriptionPlanClient[];
  onSubscribe: (userId: string | undefined, planId: string) => Promise<{ url: string } | void>;
}

export function PricingCards({
  userId,
  subscriptionPlans,
  onSubscribe
}: PricingCardsProps) {
  const t = useTranslations("PricingPage");
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <div className="flex flex-col items-center text-center space-y-12">
      <div className="flex items-center gap-4 justify-center mb-8">
        <span className={cn("text-sm", !isYearly && "text-primary font-medium")}>
          Mensual
        </span>
        <Button onClick={toggleBilling}>
          {isYearly ? "Cambiar a Mensual" : "Cambiar a Anual"}
        </Button>
        <span className={cn("text-sm", isYearly && "text-primary font-medium")}>
          Anual
        </span>
      </div>

      <div className="grid gap-8 w-full max-w-6xl mx-auto md:grid-cols-2">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="relative flex flex-col overflow-hidden border shadow-lg transition-all duration-300">
            <div className="min-h-[180px] items-start space-y-6 bg-muted/30 p-8">
              <p className="font-urban text-lg font-bold uppercase tracking-wider text-primary/80">
                {plan.name}
              </p>
              <div className="flex items-baseline space-x-2 text-4xl font-semibold">
                {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly, "€")}
                <div className="text-base font-medium text-muted-foreground">
                  / {isYearly ? "año" : "mes"}
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
                    <span className="text-primary">✔</span>
                    <p>{feature}</p>
                  </li>
                ))}
              </ul>

              <SignedIn>
                <Button 
                  className="w-full"
                  onClick={() => onSubscribe(userId, plan.id)}
                >
                  Suscribirse
                </Button>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button className="w-full">
                    {t("action.signin")}
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}