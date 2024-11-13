"use client";

import { useContext } from "react";
import { useSelectedLayoutSegment } from "next/navigation";

import { useTranslations } from "next-intl";

import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper2 from "@/components/shared/max-width-wrapper-2";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardConfig } from "@/config/dashboard";
import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { useScroll } from "@/hooks/use-scroll";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { UserInfo } from "../user-info";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavbarLogo(props: { size?: "sm" | "md" | "lg" | "xl" }) {
  const t = useTranslations("Navigation");
  const { size = "xl" } = props;
  return (
    <Link href="/" className="flex items-center space-x-2">
      <img 
        src="https://notas.ai/white.png"
        alt="Logo"
        className="h-10 w-auto brightness-0 dark:brightness-200"
      />
    </Link>
  );
}

export function NavbarUserInfo() {
  return (
    <div className="flex items-center space-x-3">
      <UserInfo />
    </div>
  );
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const t = useTranslations("Navigation");
  const selectedLayout = useSelectedLayoutSegment();
  const dashBoard = selectedLayout === "app";
  const blog = selectedLayout === "(blog)";
  const documentation = selectedLayout === "docs";
  const links = documentation
    ? docsConfig.mainNav
    : dashBoard
      ? dashboardConfig.mainNav
      : marketingConfig.mainNav;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex w-full justify-center pt-4",
        scroll ? (scrolled ? "" : "bg-transparent") : ""
      )}
    >
      <div className="bg-[rgba(236, 236, 236, 0.5)] dark:bg-[rgba(27, 27, 27, 0.5)] backdrop-blur-sm">
        <MaxWidthWrapper2
          className="flex h-12 items-center justify-between px-4"
          large={documentation}
        >
          <div className="flex items-center gap-8">
            <NavbarLogo />
            <h1
              style={{ fontFamily: 'Apple Garamond' }}
              className="text-balance text-2xl text-black dark:text-white tracking-tight"
            >
              NotasAI
            </h1>

            {links && links.length > 0 ? (
              <nav className="hidden items-center space-x-6 md:flex">
                {links.map((item, index) => (
                  <Link
                    key={index}
                    href={item.disabled ? "#" : item.href}
                    prefetch={true}
                    className={cn(
                      "text-sm transition-colors",
                      item.href.startsWith(`/${selectedLayout}`) ||
                        (item.href === "/blog" && blog)
                        ? "text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {t(item.title)}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
          <NavbarUserInfo />
        </MaxWidthWrapper2>
      </div>
    </header>
  );
}
