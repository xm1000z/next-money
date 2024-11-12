"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterCTA() {
  const pathname = usePathname();

  if (pathname.includes("pitch")) {
    return null;
  }

  return (
    <div className="border border-border md:container text-center px-10 py-14 mx-4 md:mx-auto md:px-24 md:py-20 mb-32 mt-24 flex items-center flex-col bg-white dark:bg-[#121212]">
      <span className="text-4xl md:text-6xl font-medium text-gray-900 dark:text-white">
        Empresas x NotasAI.
      </span>
      <p className="text-gray-600 dark:text-[#878787] mt-6 text-sm md:text-base max-w-2xl">
        Una herramienta todo-en-uno para freelancers, trabajadores, consultores, startups y
        empresas para optimizar su productividad, mejorar y avanzar resultados.
      </p>
      <div className="mt-8 md:mb-6">
        <div className="flex items-center space-x-4">
          <Link href="mailto:sales@notas.ai">
            <Button
              variant="outline"
              className="items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-accent hover:text-accent-foreground py-2 border h-12 px-6 border-white text-white hidden md:block"
            >
              Contactar
            </Button>
          </Link>

          <a href="https://notas.ai/pricing">
            <Button className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 py-2 h-12 px-5 bg-white text-black hover:bg-white/80">
              Empezar
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}