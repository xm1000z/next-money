import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CornerDownRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { DashboardIcon, UserArrowLeftIcon } from "@/assets";
import { Icons } from "@/components/shared/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Link } from "@/lib/navigation";
import { cn, nFormatter } from "@/lib/utils";
import { appleGaramond } from '@/assets/fonts';

import ShimmerButton from "../forms/shimmer-button";
import AnimatedGradientText from "../magicui/animated-gradient-text";

export default async function HeroLanding() {
  const t = await getTranslations({ namespace: "IndexPage" });

  return (
    <section className={`${appleGaramond.variable} space-y-6 py-12 sm:py-20 lg:py-20`}>
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://x.com/notas_ia"
          target="_blank"
        >
          <Button
            variant="outline"
            className="rounded-full border-border flex space-x-2 items-center"
          >
            <span className="font-mono text-xs">Introducimos BETA</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              fill="none"
            >
              <path
                fill="currentColor"
                d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
              />
            </svg>
          </Button>
        </Link>

        <h1 style={{ fontFamily: 'Apple Garamond' }} className="text-balance font-urban text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          <span>{t("subtitle")}</span>
          <br />
          <span style={{ fontFamily: 'Apple Garamond' }}>
            {t("title")}
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          {t("description")}
        </p>

        <div
          className="flex flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <SignedIn>
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
          </SignedIn>

          <SignedOut>
              <Link href="/sign-in'}"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-w-34 gap-2 ",
                )}
              >
                <UserArrowLeftIcon className="mr-2 size-4" />
                <span>{t("action.login")}</span>
              </Link>
          </SignedOut>

          <Link
            href="https://notas.ai/pricing"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "min-w-34  px-5",
            )}
          >
            <p>{t("action.pricing")}</p>
            <Icons.arrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
