"use client";

import { useContext } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { UserInfo } from "../user-info";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { useScroll } from "@/hooks/use-scroll";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavbarLogo(props: { size?: "sm" | "md" | "lg" | "xl" }) {
  const t = useTranslations("Navigation");
  const { size = "xl" } = props;
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image 
        src="https://notas.ai/white.png" 
        alt="Logo" 
        width={40} 
        height={40} 
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
        "sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/80",
        scroll && scrolled && "border-b"
      )}
    >
      <MaxWidthWrapper className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <NavbarLogo />

          {links?.length ? (
            <nav className="hidden items-center space-x-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                    item.href.startsWith(`/${selectedLayout}`) ||
                      (item.href === "/blog" && blog)
                      ? "text-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 dark:text-zinc-400",
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
      </MaxWidthWrapper>
    </header>
  );
}
