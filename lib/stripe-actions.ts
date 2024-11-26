export async function createSubscriptionCheckout({
  priceId,
  userId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      priceId,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return checkoutSession.url;
} 