import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { prisma } from "@/db/prisma";

export default function SettingsPage() {
  const { userId } = useAuth();

  const { data: userSubscription } = useQuery(
    ["userSubscription", userId],
    async () => {
      if (!userId) return null;
      return await prisma.subscription.findFirst({
        where: { userId },
      });
    },
    {
      enabled: !!userId,
    }
  );

  const { data: userCredits } = useQuery(
    ["userCredits", userId],
    async () => {
      if (!userId) return null;
      return await prisma.userCredit.findFirst({
        where: { userId },
      });
    },
    {
      enabled: !!userId,
    }
  );

  const currentPlan = userSubscription?.planId || "Sin Plan";
  const credits = userCredits?.credit || 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Plan de Suscripción</h3>
        <p className="text-sm text-muted-foreground">
          Gestiona la configuración general de tu cuenta
        </p>
      </div>

      <div className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] p-6 rounded-md">
        <h4 className="text-md font-medium">Tu Plan Actual</h4>
        <p className="text-sm text-muted-foreground">{currentPlan}</p>
        <p className="text-sm text-muted-foreground">Créditos disponibles: {credits}</p>
        <div className="mt-4 space-x-4">
          <button className="px-4 py-2 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C] rounded-md">
            Actualizar Plan
          </button>
          <button className="px-4 py-2 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] hover:bg-accent hover:border-[#DCDAD2] hover:dark:border-[#2C2C2C] rounded-md">
            Comprar Créditos
          </button>
        </div>
      </div>
    </div>
  );
}