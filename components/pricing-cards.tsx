"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SubscriptionPlanClient } from "@/types/subscription";

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

  const handleSubscriptionClick = async (plan: SubscriptionPlanClient) => {
    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }
    try {
      const priceId = plan.stripePriceIds.monthly; // O usa yearly según el toggle
      const result = await onSubscribe(userId, priceId);
      if (result?.url) {
        window.location.href = result.url; // Redirigir al usuario a la URL de Stripe
      }
    } catch (error) {
      console.error('Error al procesar la suscripción');
    }
  };

  return (
    <div className="grid gap-8">
      {subscriptionPlans.map((plan) => (
        <div key={plan.id} className="border p-4">
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <p>
            {formatPrice(plan.price.monthly, "€")} / mes {/* Cambia a yearly si es necesario */}
          </p>
          <Button onClick={() => handleSubscriptionClick(plan)}>
            Suscribirse
          </Button>
        </div>
      ))}
    </div>
  );
}