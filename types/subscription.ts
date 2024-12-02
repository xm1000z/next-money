export interface SubscriptionPlanClient {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  price: {
    monthly: string;
    yearly: string;
  };
  credits: number;
  features: string[];
  metadata: {
    recommended?: boolean;
    popular?: boolean;
    enterprise?: boolean;
  };
}