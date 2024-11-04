import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';
import { nanoid } from 'nanoid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    const { email } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const token = nanoid();

    // Crear o actualizar suscriptor
    const subscriber = await prisma.subscribers.upsert({
      where: { email },
      update: { 
        token,
        status: "PENDING"
      },
      create: {
        email,
        token,
        status: "PENDING"
      },
    });

    // Enviar email de confirmación
    await resend.emails.send({
      from: 'NotasAI <no-reply@notas.ai>',
      to: email,
      subject: '¡Bienvenido a NotasAI!',
      html: `
        <h1>¡Gracias por suscribirte a NotasAI!</h1>
        <p>Por favor, confirma tu suscripción haciendo clic en el siguiente enlace:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/confirm/${token}">Confirmar suscripción</a>
      `
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
