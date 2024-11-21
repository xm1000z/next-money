import { prisma } from "@/db/prisma";

export async function getTotalCredits(userId: string) {
  const userCredits = await prisma.userCredit.findFirst({
    where: { userId },
  });
  return userCredits ? userCredits.credit : 0; // Retornar el total de créditos
} 