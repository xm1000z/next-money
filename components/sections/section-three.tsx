"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import dark from "@/public/chat-modal.png";
import light from "@/public/chat-modal2.png";

export function SectionThree() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative mb-12">
        <div className="border border-border mx-4 md:container md:px-0 bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden">
          <div className="flex flex-col md:space-x-12 md:flex-row">
            <div className="mt-4 md:max-w-[40%] md:mr-8 md:mb-6 px-6 md:pl-8">
              <h3 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
              Notas Chat
              </h3>

              <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
                Impulsa sin esfuerzo la productividad con nuestra
                solución avanzada de chat multimodal: obtén todos los 
                grandes modelos de lenguaje en un único lugar. Disfruta 
                de prompts y asistentes preentrenados además de un modelo propio.
              </p>

              <div className="flex space-x-2 items-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={13}
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-[#878787] text-xs">Mejoras en español</span>
              </div>
              <div className="flex space-x-2 items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={13}
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-[#878787] text-xs">Múltiples modelos</span>
              </div>
              <div className="flex space-x-2 items-center mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={13}
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-[#878787] text-xs">Gratuito con API</span>
              </div>
            </div>

            <Image
              src={dark}
              alt="Chat"
              height={300}
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mb-12">
      <div className="border border-border mx-4 md:container md:px-0 bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden">
        <div className="flex flex-col md:space-x-12 md:flex-row">
          <div className="mt-4 md:max-w-[40%] md:mr-8 md:mb-6 px-6 md:pl-8">
            <h3 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
            Notas Chat
            </h3>

            <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
              Impulsa sin esfuerzo la productividad con nuestra
              solución avanzada de chat multimodal: obtén todos los 
              grandes modelos de lenguaje en un único lugar. Disfruta 
              de prompts y asistentes preentrenados además de un modelo propio.
            </p>

            <div className="flex space-x-2 items-center mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={13}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                />
              </svg>
              <span className="text-gray-600 dark:text-[#878787] text-xs">Mejoras en español</span>
            </div>
            <div className="flex space-x-2 items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={13}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                />
              </svg>
              <span className="text-gray-600 dark:text-[#878787] text-xs">Múltiples modelos</span>
            </div>
            <div className="flex space-x-2 items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={13}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                />
              </svg>
              <span className="text-gray-600 dark:text-[#878787] text-xs">Gratuito con API</span>
            </div>
          </div>

          <Image
            src={resolvedTheme === 'dark' ? dark : light}
            alt="Chat"
            height={300}
            priority
          />
        </div>
      </div>
    </section>
  );
}