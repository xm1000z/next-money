"use client";

import React from "react";
import { usePathname } from "next/navigation";

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
  GitHubBrandIcon,
  GoogleBrandIcon,
  MailIcon,
  UserArrowLeftIcon,
} from "@/assets";
import ShimmerButton from "@/components/forms/shimmer-button";
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
                <Link href="/app" className="size-full">
                  <TooltipTrigger asChild>
                    <button className="group h-10 bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20">
                      <UserArrowLeftIcon className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                </Link>
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
                <SignInButton
                  onClick={() => window.location.href = '/sign-in'}
                >
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="group h-10 bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 text-sm shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
                    >
                      <UserArrowLeftIcon className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                </SignInButton>

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
