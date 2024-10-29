import { unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { SignInButton, SignIn } from "@clerk/nextjs";
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

  const preferredSignInOption = (
    <SignInButton mode="modal">
      <button className="w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
        <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        <span>Continuar con Apple</span>
      </button>
    </SignInButton>
  );

  const moreSignInOptions = (
    <SignIn.Root>
      <SignIn.EmailField
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      />
      <SignIn.Submit
        className="w-full mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Continuar con correo
      </SignIn.Submit>
    </SignIn.Root>
  );

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
              {preferredSignInOption}

              <Accordion type="single" collapsible className="border-t-[1px] pt-2 mt-6">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="justify-center space-x-2 flex text-sm">
                    <span>More options</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <div className="flex flex-col space-y-4">
                      {moreSignInOptions}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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