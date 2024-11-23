"use client";

import React, { useState, useEffect, useRef } from "react";
import canvas from "@/public/apple-touch-icon.png";
import chat from "@/public/apple-touch-icon.png";
import search from "@/public/apple-touch-icon.png";
import traductor from "@/public/apple-touch-icon.png";
import studio from "@/public/apple-touch-icon.png";
import pdf from "@/public/apple-touch-icon.png";

const apps = [
  {
    name: "Canvas",
    logo: canvas,
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
    logo: chat,
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Available",
    detailsUrl: "/chat",
    additionalInfo: [
      { title: "Características", content: "Temas personalizados, historial de chats." },
      { title: "Integraciones", content: "Raycast, Slack." },
    ],
  },
  // ... otras aplicaciones
];

const Sidebar = ({ app, onClose }) => {
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
    <div className="fixed right-0 top-0 w-1/4 h-full bg-white shadow-lg p-4 overflow-y-auto transition-transform transform translate-x-0">
      <div ref={sidebarRef}>
        <h2 className="text-lg font-semibold">{app.name}</h2>
        <p>{app.description}</p>
        <div className="mt-4">
          {app.additionalInfo.map((section) => (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggleSection(section.title)}
                className="text-left w-full font-semibold"
              >
                {section.title}
              </button>
              {openSections[section.title] && (
                <p className="ml-4 text-sm">{section.content}</p>
              )}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 text-red-500">Cerrar</button>
      </div>
    </div>
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
          className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent p-6 flex flex-col h-full"
        >
          <div className="flex flex-col items-start mb-4">
            <img src={app.logo.src} alt={`${app.name} logo`} className="h-11 mb-4" />
            <h2 className="text-base font-semibold text-left">
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
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed' : 'dark:text-white text-black hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
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
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed' : 'dark:text-white text-black hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
            >
              Acceder
            </a>
          </div>
        </div>
      ))}
      {selectedApp && <Sidebar app={selectedApp} onClose={handleCloseSidebar} />}
    </div>
  );
};

export default AppsPage;