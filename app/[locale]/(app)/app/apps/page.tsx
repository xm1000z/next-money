"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, MessageSquare, TrendingUp, Languages, BookOpen, Search, Eraser, FileText, type LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import chat from "@/public/chat.png";
import canvas from "@/public/writer.png";
import search from "@/public/search.png";
import traductor from "@/public/traductor.png";
import studio from "@/public/studio.png";
import pdf from "@/public/studio.png";
import { motion, AnimatePresence } from "framer-motion";

interface App {
  name: string;
  logo: LucideIcon;
  image: StaticImageData;
  description: string;
  status: string;
  detailsUrl: string;
  additionalInfo: { title: string; content: string }[];
}

const apps: App[] = [
  {
    name: "Canvas",
    logo: BookOpen,
    image: canvas,
    description: "Integrating with Slack enables you to use Midday Assistant right from your Slack workspace, you will also get notifications when you have new transactions and more.",
    status: "Coming soon",
    detailsUrl: "/notas",
    additionalInfo: [
      { title: "Características", content: "Notificaciones en tiempo real, gestión de tareas." },
      { title: "Integraciones", content: "Slack, Google Drive." },
    ],
  },
  {
    name: "Chat",
    logo: MessageSquare,
    image: chat,
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Available",
    detailsUrl: "https://chat.notas.ai",
    additionalInfo: [
      { title: "Características", content: "Temas personalizados, historial de chats." },
      { title: "Integraciones", content: "Raycast, Slack." },
    ],
  },
  {
    name: "Search",
    logo: Search,
    image: search,
    description: "Integrating with QuickBooks enables you to synchronize transactions and attachments, neatly organizing them in your bookkeeping software.",
    status: "Available",
    detailsUrl: "https://search.notas.ai",
    additionalInfo: [
      { title: "Características", content: "Sincronización de transacciones, gestión de adjuntos." },
      { title: "Integraciones", content: "QuickBooks, Google Drive." },
    ],
  },
  {
    name: "Traductor",
    logo: Languages,
    image: traductor,
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Available",
    detailsUrl: "https://traductor.notas.ai",
    additionalInfo: [
      { title: "Características", content: "Sincronización de transacciones, gestión de adjuntos." },
      { title: "Integraciones", content: "Xero, Google Drive." },
    ],
  },
  {
    name: "Studio",
    logo: Eraser,
    image: studio,
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Coming soon",
    detailsUrl: "/studio",
    additionalInfo: [
      { title: "Características", content: "Sincronización de transacciones, gestión de adjuntos." },
      { title: "Integraciones", content: "Xero, Google Drive." },
    ],
  },
  {
    name: "PDF",
    logo: FileText,
    image: pdf,
    description: "Integrating with Cal.com automatically synchronizes your tracked hours with your calendar, allowing you to easily monitor your progress on your projects.",
    status: "Coming soon",
    detailsUrl: "/pdf",
    additionalInfo: [
      { title: "Características", content: "Sincronización de horas, gestión de calendario." },
      { title: "Integraciones", content: "Cal.com, Google Drive." },
    ],
  },
];

interface SidebarProps {
  app: App;
  onClose: () => void;
}

const Sidebar = ({ app, onClose }: SidebarProps) => {
  const [openSections, setOpenSections] = useState({});
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#FAFAF9] dark:bg-[#121212] shadow-lg overflow-hidden border-l border-[#DCDAD2] dark:border-[#2C2C2C] flex flex-col z-[60]"
      >
        <div ref={sidebarRef} className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Image 
              src={app.image} 
              alt={`${app.name} preview`} 
              className="h-70 w-full object-contain mb-4 p-2"
              priority
            />
            <div className="flex items-center justify-between border-b border-[#DCDAD2] dark:border-[#2C2C2C] pb-2">
              <div className="flex items-center space-x-2">
                <div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center">
                    {React.createElement(app.logo, { 
                      className: "h-8 w-8",
                      "aria-hidden": "true"
                    })}
                    </div>
                    <h3 className="text-lg leading-none text-black dark:text-white">{app.name}</h3>
                  </div>
                  <span className="text-xs text-[#878787]">App • Publicado por NotasAI</span>
                </div>
              </div>
              <div>
                <a
                  href={app.status === "Coming soon" ? "#" : app.detailsUrl}
                  onClick={(e) => {
                    if (app.status === "Coming soon") {
                      e.preventDefault();
                    }
                  }}
                  className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed' : 'dark:text-white text-black hover:bg-accent'} flex items-center justify-center px-3 py-1 text-sm rounded-none transition`}
                >
                  Abrir
                </a>
              </div>
            </div>
            <p className="text-gray-700 dark:text-[#878787] text-sm mt-4">{app.description}</p>
            <div className="mt-4">
              {app.additionalInfo.map((section) => (
                <div key={section.title} className="mb-2">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="text-left w-full font-semibold text-gray-900 dark:text-white flex items-center justify-between"
                  >
                    {section.title}
                    {openSections[section.title] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {openSections[section.title] && (
                    <p className="text-sm text-gray-700 dark:text-[#878787]">{section.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-[#DCDAD2] dark:border-[#2C2C2C]">
          <p className="text-[10px] text-[#878787] mb-6 flex-grow">Todas las aplicaciones de terceros tienen que mantener altos estándares, no respaldamos otras aplicaciones que no alcancen los requisitos. Las aplicaciones publicadas por NotasAI están oficialmente certificadas. Informa de cualquier inquietud sobre el contenido o el comportamiento de la aplicación.</p>
          <button 
            onClick={onClose}
            className="text-[10px] text-red-500 mb-6 flex-grow"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black z-[55]"
        onClick={onClose}
      />
    </AnimatePresence>
  );
};

const AppsPage = () => {
  const [selectedApp, setSelectedApp] = useState(null);

  const handleDetailsClick = (app) => {
    setSelectedApp(app);
  };

  const handleCloseSidebar = () => {
    setSelectedApp(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <div
          key={app.name}
          className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent p-6 flex flex-col h-full transition duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start mb-4">
            {React.createElement(app.logo, { 
              className: "h-11 mb-4",
              "aria-hidden": "true"
            })}
            <h2 className="text-base font-semibold text-left text-gray-900 dark:text-white">
              {app.name}
              {app.status === "Coming soon" && (
                <span className="text-[#878787] bg-[#F2F1EF] text-[10px] dark:bg-[#1D1D1D] px-2 py-1 rounded-full font-mono ml-2">Muy Pronto</span>
              )}
            </h2>
          </div>
          <p className="text-[12px] text-[#878787] mb-6 flex-grow">{app.description}</p>
          <div className="flex w-full space-x-2">
            <button
              onClick={() => handleDetailsClick(app)}
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-[#DCDAD2] dark:text-[#2C2C2C] cursor-not-allowed' : 'dark:text-white text-black hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
              disabled={app.status === "Coming soon"}
            >
              Detalles
            </button>
            <a
              href={app.status === "Coming soon" ? "#" : app.detailsUrl}
              onClick={(e) => {
                if (app.status === "Coming soon") {
                  e.preventDefault(); // Evita la navegación si está "Coming soon"
                }
              }}
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-[#DCDAD2] dark:text-[#2C2C2C] cursor-not-allowed' : 'dark:text-white text-black hover:bg-accent'} flex items-center justify-center px-3 py-1 text-sm rounded-none transition`}
            >
              Acceder
            </a>
          </div>
        </div>
      ))}
      <AnimatePresence>
        {selectedApp && <Sidebar app={selectedApp} onClose={handleCloseSidebar} />}
      </AnimatePresence>
    </div>
  );
};

export default AppsPage;