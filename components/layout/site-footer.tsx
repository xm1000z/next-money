import * as React from "react";

import { useTranslations } from "next-intl";

import { ModeToggle } from "@/components/layout/mode-toggle";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import NewsletterForm from "../forms/newsletter-form";
import { Icons } from "../shared/icons";

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
      <div className="flex max-w-7xl flex-col items-center justify-end gap-4 text-sm md:flex-row">
        <Link
          href="/terms-of-use"
          className="underline-offset-4 hover:underline"
          prefetch={false}
          title={t("footer.term")}
        >
          {t("footer.term")}
        </Link>
        <Link
          href="/privacy-policy"
          className="underline-offset-4 hover:underline"
          prefetch={false}
          title={t("footer.privacy")}
        >
          {t("footer.privacy")}
        </Link>
        <Link
          href="mailto:support@fluxaipro.art"
          className="underline-offset-4 hover:underline"
          prefetch={false}
          title={t("footer.contact")}
        >
          {t("footer.contact")}
        </Link>
        <ModeToggle />
      </div>
      <div className="mt-4 flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-6 w-6" />
          <span className="font-medium">NotasAI.</span>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link
            href="https://chat.notas.ai/"
            title=" Chat"
            className="underline-offset-4 hover:underline"
            prefetch={false}
            target="_blank"
          >
            Chat
          </Link>
          <Link
            href="https://search.notas.ai/"
            title="Notas Search"
            className="underline-offset-4 hover:underline"
            prefetch={false}
            target="_blank"
          >
            Search
          </Link>
          <Link
            href="https://pdf.notas.ai/"
            className="underline-offset-4 hover:underline"
            title="Woy AI Tools Directory"
            prefetch={false}
            target="_blank"
          >
            PDF
          </Link>
          <Link
            href="https://seo.notas.ai/"
            prefetch={false}
            target="_blank"
            className="underline-offset-4 hover:underline"
          >
            SEO
          </Link>
          <Link
            href="https://www.notas.ai/"
            prefetch={false}
            target="_blank"
            className="underline-offset-4 hover:underline"
          >
            notas.ai
          </Link>
        </div>
      </div>
      <div className="mt-4 flex max-w-7xl flex-col items-center justify-center gap-4 text-sm md:flex-row">
        <p className="text-muted-foreground">
          &copy; 2024 NotasAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
