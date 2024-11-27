import { auth } from "@clerk/nextjs/server";
import { hasActiveSubscription } from "@/lib/subscription";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ 
        hasActiveSubscription: false,
        error: "No autorizado" 
      }, { status: 401 });
    }

    const isSubscribed = await hasActiveSubscription(userId);

    return NextResponse.json({ 
      hasActiveSubscription: isSubscribed 
    }, { status: 200 });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return NextResponse.json({ 
      hasActiveSubscription: false,
      error: "Error interno del servidor" 
    }, { status: 500 });
  }
} 