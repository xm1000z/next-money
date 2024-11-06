import Image from "next/image";
import timetracker from "@/public/time-tracker.webp";

export function SectionThree() {
  return (
    <section className="relative mb-12">
      <div className="border border-border mx-4 md:container md:px-0 bg-white dark:bg-[#121212] p-8 md:p-10 md:pb-0 overflow-hidden">
        <div className="flex flex-col md:space-x-12 md:flex-row">
          <div className="mt-4 md:max-w-[40%] md:mr-8 md:mb-6 px-6 md:px-0">
            <h3 className="font-medium text-lg md:text-xl mb-2 text-gray-900 dark:text-white">
              Time track your projects
            </h3>

            <p className="text-gray-600 dark:text-[#878787] mb-3 text-xs">
              Effortlessly boost productivity and collaboration with our
              advanced time tracking solution: gain insightful project overviews and
              foster seamless collaboration amongst your team.
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
              <span className="text-gray-600 dark:text-[#878787] text-xs">Live time tracking</span>
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
              <span className="text-gray-600 dark:text-[#878787] text-xs">Share with your clients</span>
            </div>
          </div>

          <Image
            src={timetracker}
            height={400}
            className="-mb-[32px] md:-mb-[1px] object-contain mt-8 md:mt-0"
            quality={100}
            alt="Tracker"
          />
        </div>
      </div>
    </section>
  );
}