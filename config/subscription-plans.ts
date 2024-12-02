export const subscriptionPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfecto para empezar",
    price: 10, // Precio fijo
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!, // ID de precio de Stripe
    credits: 100,
    features: [
      "100 créditos mensuales",
      "Renovación automática",
      "Soporte básico",
      "Acceso a todas las funciones"
    ],
    metadata: {
      recommended: false,
      popular: true
    }
  },
  {
    id: "pro",
    name: "Profesional",
    description: "Para uso profesional",
    price: 25, // Precio fijo
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!, // ID de precio de Stripe
    credits: 500,
    features: [
      "300 créditos mensuales",
      "Renovación automática",
      "Soporte prioritario",
      "Acceso a todas las funciones",
      "Sin marca de agua"
    ],
    metadata: {
      recommended: true,
      popular: false
    }
  },
  {
    id: "business",
    name: "Business",
    description: "Solución empresarial completa",
    price: 90, // Precio fijo
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID!, // ID de precio de Stripe
    credits: 1000,
    features: [
      "1000 créditos mensuales",
      "Renovación automática",
      "Soporte prioritario 24/7",
      "Acceso a todas las funciones",
      "Sin marca de agua",
      "API access",
      "Multiple team members",
      "Analytics dashboard",
      "Custom integration support"
    ],
    metadata: {
      recommended: false,
      popular: false,
      enterprise: true
    }
  }
];

export const subscriptionConfig = {
  webhook: {
    secret: process.env.STRIPE_WEBHOOK_SECRET_SUBSCRIPTION!,
  },
  stripe: {
    key: process.env.STRIPE_SECRET_KEY!,
  }
}; 