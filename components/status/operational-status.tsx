"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Service {
  name: string;
  status: "operational" | "degraded" | "down";
}

export function OperationalStatus() {
  const [services] = useState<Service[]>([
    { name: "Chat", status: "operational" },
    { name: "Search", status: "operational" },
    { name: "PDF", status: "operational" },
    { name: "SEO", status: "operational" },
  ]);

  return (
    <div className="flex items-center gap-2 text-sm text-black dark:text-white border rounded-full">
      <div className="flex items-center gap-1.5">
        <span className={cn(
          "size-2 rounded-full",
          "bg-emerald-500"
        )} />
        <span>Operativo</span>
      </div>
    </div>
  );
} 