import Image from "next/image";
import computer from "@/public/computer.png";

export function SectionTwo() {
  return (
    <section className="border border-border mx-4 md:container bg-white dark:bg-[#121212] md:pb-0 overflow-hidden mb-8">
      <div className="flex flex-col md:space-x-8 md:flex-row md:h-[400px]">
        <div className="md:max-w-[55%] md:h-full">
          <Image
            src={computer}
            height={400}
            width={700}
            className="-mb-[1px] object-contain w-full h-full"
            alt="Overview"
            quality={100}
          />
        </div>

        <div className="mt-4 md:max-w-[45%] md:ml-6 md:mb-6 flex flex-col justify-center p-6 md:p-0">
          <h3 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
            Product overview
          </h3>

          <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
            Bring your own bank. We connect to over 20 000+ banks in 33
            countries across US, Canada, UK and Europe. Keep tabs on your
            expenses and income.
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
              Share financial reports
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}