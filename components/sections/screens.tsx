import Image from "next/image";
import screen1 from "@/public/screen-3.webp";
import { CardStack } from "@/components/card-stack";

export function Screens() {
  return (
    <div className="mt-16 md:mt-32 relative pt-8 pb-12 px-4 md:px-0">
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center pb-8">
          <h3 className="text-3xl md:text-5xl font-medium">Simple y Eficaz</h3>
          <p className="mt-2 text-sm text-[#878787]">
            Brindamos una plataforma completa con todas las necesidades cubiertas.
          </p>
        </div>

        <CardStack
          items={[
            {
              id: 1,
              name: "Overview",
              content: (
                <Image
                  quality={100}
                  alt="Escritor de NotasAI"
                  src={screen1}
                  width={1031}
                  height={670}
                  priority
                  className="border border-border"
                />
              ),
            },
            {
              id: 2,
              name: "Chat",
              content: (
                <Image
                  quality={100}
                  alt="Chat de NotasAI"
                  src={screen1}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 3,
              name: "Search",
              content: (
                <Image
                  quality={100}
                  alt="Search de NotasAI"
                  src={screen1}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 4,
              name: "Search",
              content: (
                <Image
                  quality={100}
                  alt="Search de NotasAI"
                  src={screen1}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 5,
              name: "Studio",
              content: (
                <Image
                  quality={100}
                  alt="Studio - NotasAI"
                  src={screen1}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
          ]}
        />
      </div>

      <div className="dotted-bg absolute w-[calc(100%-2rem)] md:w-[10000px] h-full top-0 left-4 md:-left-[5000px]" />
    </div>
  );
}