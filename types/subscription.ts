export interface SubscriptionPlanClient {
  id: string;
  name: string;
  description: string;
  price: number; // Cambiar a un solo número
  credits: number;
  features: string[];
  metadata: {
    recommended?: boolean;
    popular?: boolean;
    enterprise?: boolean;
  };
}