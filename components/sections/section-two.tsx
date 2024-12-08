import Image from "next/image";
import computer from "@/public/branding.jpg";

export function SectionTwo() {
  return (
    <section className="border border-border mx-4 md:container md:px-0 bg-white dark:bg-[#121212] md:pb-0 overflow-hidden mb-8">
      <div className="flex flex-col md:space-x-8 md:flex-row md:h-[400px]">
        <div className="relative w-full md:w-[45%]">
          <Image
            src={computer}
            alt="Computer"
            className="object-cover h-full"
            priority
          />
        </div>

        <div className="mt-4 md:max-w-[45%] md:ml-6 md:mb-6 flex flex-col justify-center p-6 md:p-0">
          <h3 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
            Inteligencia Artificial
          </h3>

          <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
            Una nueva revolución que depara cambios sociales y económicos. 
            La lengua española no debe quedarse atrás y para eso Notas AI trabaja 
            en el desarrollo constante de nuestro idioma en el sector. 
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
            <span className="text-gray-600 dark:text-[#878787] text-xs">
              IA en español
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}