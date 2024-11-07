import Image from "next/image";
import screen1 from "@/public/chat.png";
import screen2 from "@/public/writer.png";
import screen3 from "@/public/search.png";
import screen4 from "@/public/traductor.png";
import screen5 from "@/public/studio.png";

import { CardStack } from "@/components/card-stack";

export function Screens() {
  return (
    <div className="mt-16 md:mt-32 relative pt-8 pb-12 px-4 md:px-0">
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center pb-8">
          <h3 className="text-3xl md:text-5xl font-medium">Todo en uno</h3>
          <p className="mt-2 text-sm text-[#878787]">
            Una plataforma completa con todas las necesidades cubiertas.
          </p>
        </div>

        <CardStack
          items={[
            {
              id: 1,
              name: "Chat",
              content: (
                <Image
                  quality={100}
                  alt="Chat"
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
              name: "Escritor",
              content: (
                <Image
                  quality={100}
                  alt="Escritor"
                  src={screen2}
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
                  alt="Search"
                  src={screen3}
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 4,
              name: "Traductor",
              content: (
                <Image
                  quality={100}
                  alt="Traductor"
                  src={screen4}
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
                  alt="Studio"
                  src={screen5}
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