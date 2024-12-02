export interface SubscriptionPlanClient {
  id: string;
  name: string;
  description: string;
  price: number; // Precio numérico
  stripePriceId: string; // ID de precio de Stripe
  credits: number;
  features: string[];
  metadata: {
    recommended?: boolean;
    popular?: boolean;
    enterprise?: boolean;
  };
}