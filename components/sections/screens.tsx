import Image from "next/image";
import { CardStack } from "@/components/card-stack";

export function Screens() {
  return (
    <div className="mt-[120px] md:mt-[240px] relative pt-12 pb-16">
      <div className="relative z-10 flex flex-col items-center">
        <div className="text-center pb-14">
          <h3 className="text-4xl md:text-6xl font-medium">Simple y Eficaz</h3>
          <p className="mt-4 text-[#878787]">
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
                  src="https://notas.ai/64e38a3a25593ef3c6e7968a/writer-3.png"
                  width={1031}
                  height={670}
                  priority
                  className="border border-border"
                />
              ),
            },
            {
              id: 2,
              name: "Tracker",
              content: (
                <Image
                  quality={100}
                  alt="Chat de NotasAI"
                  src="https://notas.ai/64e38a3a25593ef3c6e7968a/chat-4.png"
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 3,
              name: "Inbox",
              content: (
                <Image
                  quality={100}
                  alt="Search de NotasAI"
                  src="https://notas.ai/64e38a3a25593ef3c6e7968a/search-3.png"
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 4,
              name: "Vault",
              content: (
                <Image
                  quality={100}
                  alt="Search de NotasAI"
                  src="https://notas.ai/64e38a3a25593ef3c6e7968a/search-5.png"
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
            {
              id: 5,
              name: "Dashboard - Transactions",
              content: (
                <Image
                  quality={100}
                  alt="Studio - NotasAI"
                  src="https://notas.ai/64e38a3a25593ef3c6e7968a/studio-4.png"
                  width={1031}
                  height={670}
                  className="border border-border"
                />
              ),
            },
          ]}
        />
      </div>

      <div className="dotted-bg absolute w-[10000px] h-full top-0 -left-[5000px]" />
    </div>
  );
}