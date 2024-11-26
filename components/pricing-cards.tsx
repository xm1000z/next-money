"use client";

import { subscriptionPlansClient } from "@/config/subscription-plans-client";

interface PricingCardsProps {
  chargeProduct: any[];
  subscriptionPlans: any[];
}

export function PricingCards({ chargeProduct, subscriptionPlans }: PricingCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Primero los planes de suscripción */}
      {subscriptionPlans.map(plan => (
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