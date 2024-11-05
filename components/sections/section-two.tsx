import Image from "next/image";

export function SectionTwo() {
  return (
    <section className="border border-border mx-4 md:container bg-[#121212] md:pb-0 overflow-hidden mb-8">
      <div className="flex flex-col md:space-x-8 md:flex-row">
        <Image
          src="https://notas.ai/64e38a3a25593ef3c6e7968a/search-5.png"
          height={446}
          width={836}
          className="-mb-[1px] object-contain w-full"
          alt="Overview"
          quality={100}
        />

        <div className="mt-4 md:max-w-[40%] md:ml-6 md:mb-6 flex flex-col justify-center p-6 md:p-0">
          <h3 className="font-medium text-lg md:text-xl mb-2">
            Financial overview
          </h3>

          <p className="text-[#878787] mb-3 text-xs">
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
            <span className="text-[#878787] text-xs">
              Share financial reports
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}