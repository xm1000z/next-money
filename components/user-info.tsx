"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";

import {
  DashboardIcon,
  UserArrowLeftIcon,
} from "@/assets";
import { CornerDownRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { url } from "@/lib";
import { clamp } from "@/lib/math";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function UserInfo() {
  const t = useTranslations("Navigation");

  const pathname = usePathname();
  const { user } = useUser();


  return (
    <AnimatePresence>
      <SignedIn key="user-info">
        <div className="ml-4 flex items-center space-x-3">
          <motion.div
            className="pointer-events-auto relative flex h-10 items-center"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
          >
          </motion.div>
          {!pathname?.includes("app") && (
            <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
              <Link
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative w-full max-w-52 items-center justify-center gap-2 overflow-hidden whitespace-pre  bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-all duration-300 ease-out hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex",
              )}
              href="/app"
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
              <div className="flex items-center">
                <CornerDownRight className="mr-2 size-4" />
                <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 dark:text-slate-900">
                  {t("action.generate")}
                </span>
              </div>
            </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {t("tooltip.dashboard")}
                  </motion.div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </SignedIn>
      <SignedOut key="sign-in">
        <div className="ml-4 flex items-center space-x-3">
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
          >
            <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/sign-in" className="size-full">
                    <button
                      type="button"
                      className="group h-10 bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                    >
                      <UserArrowLeftIcon className="h-5 w-5" />
                    </button>
                </Link>
                </TooltipTrigger>

                <TooltipContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {t("tooltip.login")}
                  </motion.div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </div>
      </SignedOut>
    </AnimatePresence>
  );
}
