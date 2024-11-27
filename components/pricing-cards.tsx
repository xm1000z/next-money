"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Icons } from "@/components/shared/icons";
import { cn, formatPrice } from "@/lib/utils";
import { SubscriptionPlanClient } from "@/types/subscription";

interface PricingCardsProps {
  userId?: string;
  currentPlan?: string;
  isCurrentPlanActive?: boolean;
  subscriptionPlans: SubscriptionPlanClient[];
}

export function PricingCards({
  userId,
  currentPlan,
  isCurrentPlanActive,
  subscriptionPlans
}: PricingCardsProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { toast } = useToast();

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
      } else {
        throw new Error('No se pudo crear la sesión de checkout');
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