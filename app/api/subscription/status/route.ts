import { auth } from "@clerk/nextjs";
import { hasActiveSubscription } from "@/lib/subscription";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return new Response(
      JSON.stringify({ 
        hasActiveSubscription: false,
        error: "No autorizado" 
      }), 
      { status: 401 }
    );
  }

  const isSubscribed = await hasActiveSubscription(userId);

  return new Response(
    JSON.stringify({ hasActiveSubscription: isSubscribed }), 
    { status: 200 }
  );
} 