import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    console.log("Received data:", data);

    const { email, locale = "es" } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const token = crypto.randomUUID();
    console.log("Generated token:", token);

    try {
      // Solo intentamos crear el suscriptor primero
      const subscriber = await prisma.subscribers.upsert({
        where: { email },
        update: { 
          token,
          status: "PENDING",
          locale,
        },
        create: {
          email,
          token,
          status: "PENDING",
          locale,
        },
      });

      console.log("Subscriber result:", subscriber);

      return NextResponse.json(
        { success: true },
        { status: 200 }
      );

    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }

  } catch (error: any) {
    console.error("Top level error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}
