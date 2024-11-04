import * as React from "react";

import { useTranslations } from "next-intl";

import { ModeToggle } from "@/components/layout/mode-toggle";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import NewsletterForm from "../forms/newsletter-form";
import { Icons } from "../shared/icons";
import Image from 'next/image';
import { OperationalStatus } from "../status/operational-status";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("PageLayout");
  return (
    <footer
      className={cn(
        "container border-t",
        "w-full p-6 pb-4 md:py-12",
        className,
      )}
    >
      <div className="flex max-w-7xl flex-col justify-between gap-8 md:flex-row">
        {/* Columna izquierda: Logo y links */}
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image className="h-6 w-6" src="/apple-touch-icon.png" alt="NotasAI" width={24} height={24} />
            <span style={{ fontFamily: 'Apple Garamond', fontSize: 'larger' }}>NotasAI</span>
          </div>
          
          {/* Links en columnas */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {/* Columna 1: Productos */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl">Productos</h3>
              <div className="flex flex-col gap-2 text-md text-muted-foreground">
                <Link href="https://chat.notas.ai/" prefetch={false} target="_blank">Chat</Link>
                <Link href="https://search.notas.ai/" prefetch={false} target="_blank">Search</Link>
                <Link href="https://pdf.notas.ai/" prefetch={false} target="_blank">PDF</Link>
                <Link href="https://seo.notas.ai/" prefetch={false} target="_blank">SEO</Link>
              </div>
            </div>

            {/* Columna 2: Legal */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-xl">Legal</h3>
              <div className="flex flex-col gap-2 text-md text-muted-foreground">
                <Link href="/terms-of-use" prefetch={false}>{t("footer.term")}</Link>
                <Link href="/privacy-policy" prefetch={false}>{t("footer.privacy")}</Link>
                <Link href="mailto:soporte@notas.ai" prefetch={false}>{t("footer.contact")}</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Columna derecha: Newsletter */}
        <div className="w-full max-w-sm">
          <NewsletterForm />
        </div>
      </div>

      {/* Estado Operacional y Copyright */}
      <div className="mt-8 border-t pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
          <OperationalStatus />
          <p className="text-muted-foreground">
            &copy; 2024 NotasAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
