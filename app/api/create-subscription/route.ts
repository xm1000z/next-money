import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { handleSubscribe } from "@/lib/server-actions";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { planId, interval } = await req.json();

    const result = await handleSubscribe(userId, planId, interval);

    if (!result?.url) {
      throw new Error('No se pudo crear la sesión de checkout');
    }

    return NextResponse.json({ url: result.url });
  } catch (error) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: "Error al crear la suscripción" },
      { status: 500 }
    );
  }
} 