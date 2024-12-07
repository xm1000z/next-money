import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { getUserSubscriptionPlan } from "@/lib/subscription";

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  const subscription = await getUserSubscriptionPlan(userId);
  return NextResponse.json(subscription);
}