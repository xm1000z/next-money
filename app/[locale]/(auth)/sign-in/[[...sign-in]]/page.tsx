import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

// Definir la interfaz Props
interface Props {
  params: {
    locale: string;
  };
}

export default function Page({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const appearance = {
    elements: {
      rootBox: "w-full",
      card: "w-full shadow-none p-0",
      header: "hidden",
      footer: "hidden",
      mainHeader: "hidden",
      alternativeSection: "hidden",
      formButtonPrimary: 
        "w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary",
      formFieldInput:
        "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
      socialButtonsIconButton:
        "w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700",
      socialButtonsProviderIcon: "h-5 w-5",
      formFieldLabel: "block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1",
      dividerLine: "bg-gray-300 dark:bg-gray-600",
      dividerText: "text-gray-500 dark:text-gray-400 text-sm",
    },
    layout: {
      socialButtonsPlacement: "top",
      helpPageURL: "https://app.notas.ai/help",
      privacyPageURL: "https://app.notas.ai/privacy",
      termsPageURL: "https://app.notas.ai/terms",
    },
  };

  return (
    <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="https://notas.ai">
            <h1
              style={{ fontFamily: 'Apple Garamond' }}
              className="text-balance font-urban text-4xl tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]"
            >
              NotasAI
            </h1>
          </Link>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Entrar a NotasAI.</h1>
            </div>
            
            <p className="font-medium pb-1 text-2xl text-[#878787]">
              Inteligencia Artificial, <br />
              en español, and make <br />
              informed decisions <br />
              effortlessly.
            </p>

            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              <SignIn
                appearance={appearance}
                afterSignInUrl="/dashboard"
                signUpUrl="/sign-up"
                path="/sign-in"
              />
            </div>

            <p className="text-xs text-[#878787]">
              Al hacer clic en continuar, reconoces que has leído y aceptas los{" "}
              <a href="https://app.notas.ai/terms" className="underline">
                Términos de Servicio
              </a>{" "}
              y la{" "}
              <a href="https://app.notas.ai/privacy" className="underline">
                Política de Privacidad
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}