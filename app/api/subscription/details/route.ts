import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const subscription = await prisma.subscription.findFirst({
      where: { 
        user_id: userId  // Cambiar userId por user_id para que coincida con la columna
      },
    });

    return NextResponse.json(subscription || { planId: "free" }); // Proporcionar un valor por defecto
  } catch (error) {
    console.error('Error al obtener la suscripción:', error);
    return NextResponse.json({ planId: "free" }, { status: 200 }); // Fallback seguro
  }
}