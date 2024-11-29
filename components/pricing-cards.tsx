"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SubscriptionPlanClient } from "@/types/subscription";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlans: SubscriptionPlanClient[];
  onSubscribe: (userId: string | undefined, priceId: string) => Promise<{ url: string } | void>;
}

export function PricingCards({
  userId,
  subscriptionPlans,
  onSubscribe
}: PricingCardsProps) {
  const t = useTranslations("PricingPage");
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const handleSubscriptionClick = async (plan: SubscriptionPlanClient) => {
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }
    try {
      const priceId = isYearly ? plan.stripePriceIds.yearly : plan.stripePriceIds.monthly;
      const result = await onSubscribe(userId, priceId);
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Error al procesar la suscripción');
    }
  };

  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-4 justify-center mb-8">
        <span className={isYearly ? "text-sm" : "text-sm text-primary font-medium"}>
          Mensual
        </span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <span className={isYearly ? "text-sm text-primary font-medium" : "text-sm"}>
          Anual
          <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Ahorra 20%
          </span>
        </span>
      </div>

      {subscriptionPlans.map((plan) => (
        <div key={plan.id} className="border p-4">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <p>
            {formatPrice(isYearly ? plan.price.yearly : plan.price.monthly, "€")} / {isYearly ? "año" : "mes"}
          </p>
          <Button onClick={() => handleSubscriptionClick(plan)}>
            Suscribirse
          </Button>
        </div>
      ))}
    </div>
  );
}