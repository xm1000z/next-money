import Image from "next/image";
import exporting from "@/public/exporting.png";
import vault from "@/public/vault.png";

export function SectionFive() {
  return (
    <section className="flex justify-between space-y-12 lg:space-y-0 lg:space-x-8 flex-col lg:flex-row overflow-hidden mb-12 mx-4 md:container md:px-0">
      <div className="border border-border lg:basis-2/3 bg-white dark:bg-[#121212] p-6 md:p-8 flex justify-between lg:space-x-8 lg:flex-row flex-col-reverse items-center lg:items-start">
        <Image
          src={vault}
          quality={100}
          alt="Vault"
          className="mt-6 lg:mt-0 basis-1/2 object-contain md:max-w-[367px] border-l-[1px] border-border"
        />

        <div className="flex flex-col basis-1/2">
          <h4 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">Fine-Tuning</h4>

          <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
            Almacena tus archivos de forma segura.
          </p>

          <p className="text-gray-600 dark:text-[#878787] text-xs">
            No más búsquedas en diferentes unidades. Mantén todos tus archivos, contratos y acuerdos seguros en un solo lugar.
          </p>
        </div>
      </div>

      <div className="border border-border basis-1/3 bg-white dark:bg-[#121212] p-6 md:p-8 md:text-center flex flex-col">
        <h4 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
          Exportación simple
        </h4>
        <p className="text-gray-600 dark:text-[#878787] text-xs">
          Simplifica la preparación de exportaciones para tu contador. Selecciona cualquier período o transacción y exporta. Empaquetamos todo en un archivo CSV con referencias claras a los adjuntos.
        </p>

        <Image
          src={exporting}
          quality={100}
          alt="Export"
          className="md:mt-auto mt-8"
        />
      </div>
    </section>
  );
} 