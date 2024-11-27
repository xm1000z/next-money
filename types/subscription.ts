export interface SubscriptionPlanClient {
    id: string;
    name: string;
    description: string;
    price: {
      monthly: number;
      yearly: number;
    };
    credits: number;
    features: string[];
    metadata: {
      recommended?: boolean;
      popular?: boolean;
      enterprise?: boolean;
    };
  }