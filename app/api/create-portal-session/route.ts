import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: userId, // Asegúrate de que userId sea el ID del cliente de Stripe
      return_url: absoluteUrl("/app/settings/subscription"), // URL a la que redirigir después de que el usuario haya terminado
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error al crear la sesión del portal:", error);
    return NextResponse.json(
      { error: "Error al crear la sesión del portal" },
      { status: 500 }
    );
  }
} 