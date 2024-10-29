"use client";

import { useContext } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { UserInfo } from "../user-info";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export function NavBar({ scroll = false }: { scroll?: boolean }) {
  const t = useTranslations("Navigation");
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900/80">
      <MaxWidthWrapper className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="https://notas.ai/white.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto brightness-0 dark:brightness-200"
            />
          </Link>
          
          <nav className="hidden items-center space-x-6 md:flex">
            <Link 
              href="/product" 
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Producto
            </Link>
            <Link 
              href="/pricing" 
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Precios
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Nosotros
            </Link>
            <Link 
              href="/beta" 
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Beta
            </Link>
            <Link 
              href="/blog" 
              className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            href="/sign-in" 
            className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Entrar
          </Link>
          <Link
            href="/sign-up"
            className="rounded-none bg-white px-4 py-2 text-sm text-zinc-900 transition-colors hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            Empezar
          </Link>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
