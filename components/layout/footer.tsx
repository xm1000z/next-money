import { SubscribeInput } from "@/components/subscribe-input";
import { OperationalStatus } from "../status/operational-status";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t-[1px] border-border px-4 md:px-6 pt-10 md:pt-16 bg-white dark:bg-[#0C0C0C] overflow-hidden md:max-h-[820px]">
      <div className="container">
        <div className="flex justify-between items-center border-border border-b-[1px] pb-10 md:pb-16 mb-12">
          <Link href="/" className="scale-50 -ml-[52px] md:ml-0 md:scale-100">
            <Image className="h-8 w-8" src="/apple-touch-icon.png" alt="NotasAI" width={24} height={24} />
            <span style={{ fontFamily: 'Apple Garamond'}} className="sr-only">NotasAI</span>
          </Link>

          <span className="font-normal md:text-2xl text-right text-gray-900 dark:text-white">
            Think Better.
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:w-6/12 justify-between leading-8">
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Producto</span>
              <ul>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/app">Dashboard</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="https://chat.notas.ai/">Chat</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="https://search.notas.ai">Search</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="https://seo.notas.ai/">SEO</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/app/generate">Studio</Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-gray-900 dark:text-white">NotasAI</span>
              <ul>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="https://notas.ai/about">Nosotros</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="https://notas.ai/pricing">Precios</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="mailto:soporte@notas.ai">Soporte</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/privacy">Privacy policy</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/terms">Terms and Conditions</Link>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-gray-900 dark:text-white">Company</span>
              <ul>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/story">Story</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/updates">Updates</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/open-startup">Startup</Link>
                </li>
                <li className="transition-colors text-gray-600 hover:text-gray-900 dark:text-[#878787] dark:hover:text-white">
                  <Link href="/work">Work</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-6/12 flex mt-8 md:mt-0 md:justify-end">
            <div className="flex md:items-end flex-col">
              <div className="flex items-start md:items-center flex-col md:flex-row space-y-6 md:space-y-0 mb-8">
              </div>

              <div className="mb-8">
                <SubscribeInput group="news" />
              </div>
              <div className="md:mr-0 mt-auto mr-auto">
                <OperationalStatus />
              </div>
            </div>
          </div>
        </div>
      </div>

      <h5 className="text-gray-100 dark:text-[#161616] text-[500px] leading-none text-center pointer-events-none">
        notas ai
      </h5>
    </footer>
  );
}