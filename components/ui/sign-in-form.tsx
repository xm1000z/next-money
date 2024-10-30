'use client';
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SignInForm() {
  const preferredSignInOption = (
    <SignIn
  appearance={{
    elements: {
      card: 'bg-transparent shadow-none',
      form: 'tu-clase-personalizada',
      header: 'hidden',
      formFieldLabelRow : 'hidden',
      buttonArrowIcon: 'hidden',
      formFieldInput: 'flex h-9 w-full border !border-[#2b2b2b] bg-transparent px-3 py-1 text-sm text-black dark:text-white transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          formButtonPrimary: 'h-10 w-full bg-black text-md text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-[#FFFFF] font-bold focus-visible:outline-none disabled:pointer-events-none',
      footerAction: 'hidden', // Oculta elementos del footer
      footer: 'hidden' // Oculta el footer completo
    },
    variables: {
        borderRadius: '0px',
    },
  }}
/>
  );

  const News = (
    <Link href="https://notas.ai/news">
      <span>- Planes de ampliación de créditos para suscriptores.</span>
    </Link>
  );

  return (
    <div className="dark:bg-[#121212]">
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
          <Link href="https://app.notas.ai">
            <h1
              style={{ fontFamily: 'Apple Garamond' }}
              className="text-balance text-2xl tracking-tight"
            >
              NotasAI
            </h1>
          </Link>
        </div>
      </header>
      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
          {/*<div className="pointer-events-auto mt-6 flex flex-col mb-6">
              <Accordion type="single" collapsible className="pt-2 mt-6">
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="justify-center space-x-2 flex text-sm no-underline">
                    <span className="no-underline">Novedades</span>
                  </AccordionTrigger>
                  <AccordionContent className="mt-4">
                    <div className="flex flex-col space-y-4">
                      <p >{News}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>*/}
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Entrar a NotasAI.</h1>
            </div>
            <p className="font-medium pb-1 text-2xl text-[#878787]">
              Inteligencia Artificial, <br />
              en tu idioma, el español. <br />
              Mejorando por tí, <br />
              600 millones y subiendo.
            </p>
            <div className="pointer-events-auto mt-6 flex flex-col mb-6">
              {preferredSignInOption}
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