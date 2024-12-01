import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroImage } from "./hero-image";
import { Metrics } from "./metrics";
import { WordAnimation } from "./word-animation";

export function Hero() {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[600px] relative lg:h-[calc(100vh-300px)] overflow-hidden">
      <div className="container flex flex-col">
        <Link href="https://x.com/notas_ia">
          <Button
            variant="outline"
            className="rounded-full border-border flex space-x-1 items-center text-xs"
          >
            <span className="font-mono text-xs">Introducimos BETA</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={8}
              height={8}
              fill="none"
            >
              <path
                fill="currentColor"
                d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
              />
            </svg>
          </Button>
        </Link>

        <h2 className="mt-6 md:mt-10 max-w-[580px] text-[#878787] leading-tight text-[20px] md:text-[30px] font-medium">
        Revolucionemos la Inteligencia Artificial, esta vez en español, para <WordAnimation />
        </h2>

        <div className="mt-8 md:mt-10">
          <div className="flex items-center space-x-4">
            <Link
              href="#muy-pronto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-transparent h-10 px-5 dark:bg-[#1D1D1D] bg-[#F2F1EF] text-sm"
              >
                Hablar ya
              </Button>
            </Link>

            <a href="https://notas.ai/pricing">
              <Button className="h-10 px-4 text-sm">Empezar ahora</Button>
            </a>
          </div>
        </div>

        <p className="text-xs text-[#707070] mt-4 font-mono">
          Recibe una oferta de 49€/m, solo durante BETA.
        </p>
      </div>

      <HeroImage />
      <Metrics />
    </section>
  );
}