"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { UserArrowLeftIcon } from "@/assets";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function UserInfo() {
  const t = useTranslations("Navigation");
  const router = useRouter();

  return (
    <div className="flex items-center">
      <SignedIn>
        <div className="ml-4 flex items-center space-x-3">
          <UserButton afterSignOutUrl="/" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => router.push("/app")}
                  className="group h-10 bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                >
                  <UserArrowLeftIcon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {t("tooltip.dashboard")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="ml-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => router.push("/sign-in")}
                  className="group h-10 bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                >
                  <UserArrowLeftIcon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {t("tooltip.login")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </SignedOut>
    </div>
  );
}
