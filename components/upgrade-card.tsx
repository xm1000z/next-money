"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress"; // Asegúrate de que esta importación sea correcta
import { WalletIcon } from "lucide-react"; // Icono opcional

export function UpgradeCard() {
  const { getToken } = useAuth();

  const { data } = useQuery({
    queryKey: ["userCredits"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch("/api/account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Error fetching user credits");
      }
      return response.json();
    },
  });

  const totalCredits = 1000; // Total de créditos
  const remainingCredits = data?.credit || 0; // Créditos restantes

  return (
    <div className="p-4 border border-[rgba(27, 27, 27, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-[#ececec] dark:bg-[#1b1b1b]">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <WalletIcon className="h-3 w-3 mr-1" />
        Créditos
      </h3>
      <Progress value={(remainingCredits / totalCredits) * 100} className="h-2" />
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        {remainingCredits} de {totalCredits} créditos restantes
      </p>
    </div>
  );
}
