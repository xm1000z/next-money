"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Sun, Moon, Monitor, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

import UserPoints from "@/components/dashboard/points";

export default function CustomUserButton() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { setTheme, theme, systemTheme } = useTheme();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoaded || !user) return null;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleUserProfile = () => {
    router.push("https://app.notas.ai/app/order");
    setMenuOpen(false);
  };

  const handleOrganizationProfile = async () => {
    router.push("https://app.notas.ai/app/order");
    setMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className=""
      >
        <div className="p-1 mt-1 rounded-md">
        <img 
            src={user?.imageUrl} 
            alt="logo" 
            className="w-8 h-8 border border-[rgba(228, 228, 228, 0.18)] dark:border-[rgba(185, 185, 185, 0.57)] invert dark:invert-0" 
          />
        </div>
      </button>

      {menuOpen && (
        <div className="absolute top-11 right-0 mt-2 w-60 shadow-lg z-10 border border-[rgba(228, 228, 228, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-white dark:bg-[#0a0a0a] text-black dark:text-white">
          <div className="px-4 pt-2 pb-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold">{user?.fullName || "Usuario"}</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  {user?.primaryEmailAddress?.emailAddress || "Correo no disponible"}
                </div>
              </div>
              <div className="px-2 py-0.5 text-xs border border-[rgba(228, 228, 228, 0.18)] dark:border-[rgba(185, 185, 185, 0.17)] bg-transparent rounded-full">
              <UserPoints/>
              </div>
            </div>
          </div>
          <ul className="px-1.5 py-1.5">
          <li className="border-t border-gray-200 dark:border-[#2e2e2e] my-1" />
            <li
              onClick={() => (window.location.href = "https://app.notas.ai/app")}
              className="px-3 py-2 flex items-center space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#161616] cursor-pointer"
            >
              <span className="text-[13px]">Inicio</span>
            </li>
            <li
              onClick={handleUserProfile}
              className="px-3 py-2 flex items-center space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#161616] cursor-pointer"
            >
              <span className="text-[13px]">Facturación</span>
            </li>
            <li 
              onClick={() => {
                window.location.href = "mailto:support@notas.ai";
              }}
              className="px-3 py-2 flex items-center space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#161616] cursor-pointer"
              >
              <span className="text-[13px]">Centro de ayuda</span>
            </li>
            <li className="border-t border-gray-200 dark:border-[#2e2e2e] my-1" />
            <li className="relative">
              <button
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="w-full px-3.5 py-2 flex items-center justify-between"
              >
                <span className="text-[13px]">Temas</span>
                <div className="flex items-center space-x-2 px-2.5 py-1.5 border border-gray-200 dark:border-[#2e2e2e] bg-white dark:bg-[#141414] cursor-pointer">
                  <div className="flex items-center space-x-2">
                    {theme === 'light' && <Sun className="w-3.5 h-3.5" />}
                    {theme === 'dark' && <Moon className="w-3.5 h-3.5" />}
                    {theme === 'system' && <Monitor className="w-3.5 h-3.5" />}
                    <span className="text-[13px]">{theme === 'system' ? 'Sistema' : theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                  </div>
                  <ChevronDownIcon className="w-4 h-4" />
                </div>
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#2e2e2e] shadow-lg">
                  <ul>
                    <li
                      onClick={() => {
                        setTheme('light');
                        setThemeMenuOpen(false);
                      }}
                      className="px-3.5 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#161616] cursor-pointer"
                    >
                      <span className="text-[13px]">Claro</span>
                      {theme === 'light' && <span>✓</span>}
                    </li>
                    <li
                      onClick={() => {
                        setTheme('dark');
                        setThemeMenuOpen(false);
                      }}
                      className="px-3 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#1d1d1d] cursor-pointer"
                    >
                      <span className="text-[13px]">Oscuro</span>
                      {theme === 'dark' && <span>✓</span>}
                    </li>
                    <li
                      onClick={() => {
                        setTheme('system');
                        setThemeMenuOpen(false);
                      }}
                      className="px-3 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-[#1d1d1d] cursor-pointer"
                    >
                      <span className="text-[13px]">Sistema</span>
                      {theme === 'system' && <span>✓</span>}
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li className="border-t border-gray-200 dark:border-[#2e2e2e] my-1" />
            <li
              onClick={() => signOut()}
              className="px-3 py-2 flex items-center space-x-2.5 hover:bg-gray-100 dark:hover:bg-[#161616] cursor-pointer"
            >
              <span className="text-[13px]">Cerrar sesión</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}