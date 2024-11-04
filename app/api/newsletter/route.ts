import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from 'resend';

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

    // Verificar si el email ya existe
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Enviar email de confirmación
    await resend.emails.send({
      from: 'NotasAI <no-reply@notas.ai>',
      to: email,
      subject: '¡Bienvenido a NotasAI!',
      html: `
        <h1>¡Gracias por suscribirte a NotasAI!</h1>
        <p>Estamos emocionados de tenerte con nosotros. Te mantendremos informado sobre las últimas novedades y actualizaciones.</p>
        <p>¡Saludos!</p>
        <p>El equipo de NotasAI</p>
      `
    });

    // Crear nuevo suscriptor
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        status: "ACTIVE",
      },
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
