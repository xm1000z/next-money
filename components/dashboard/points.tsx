"use client";

import React, { useState, useEffect } from "react";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { WalletIcon } from "lucide-react";

import NumberTicker from "../magicui/number-ticker";

export default function UserPoints() {
  const { getToken } = useAuth();
  const [credit, setCredit] = useState(0);

  const { data } = useQuery({
    queryKey: ["queryUserPoints"],
    queryFn: async () => {
      const token = await getToken();
      const response = await fetch("/api/account", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setCredit(data.credit);
    },
  });

  return (
    <div className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
      <WalletIcon className="h-3 w-3" />
      <NumberTicker value={credit} />
    </div>
  );
}
