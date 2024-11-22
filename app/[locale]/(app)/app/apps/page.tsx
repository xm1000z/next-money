"use client";

import React from "react";

const apps = [
  {
    name: "Notas",
    logo: "@/public/apple-touch-icon.png",
    description: "Integrating with Slack enables you to use Midday Assistant right from your Slack workspace, you will also get notifications when you have new transactions and more.",
    status: "Coming soon",
  },
  {
    name: "Chat",
    logo: "@/public/apple-touch-icon.png",
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Available",
  },
  {
    name: "Search",
    logo: "@/public/apple-touch-icon.png",
    description: "Integrating with QuickBooks enables you to synchronize transactions and attachments, neatly organizing them in your bookkeeping software.",
    status: "Available",
  },
  {
    name: "Traductor",
    logo: "@/public/apple-touch-icon.png",
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Available",
  },
  {
    name: "PDF",
    logo: "@/public/apple-touch-icon.png",
    description: "Integrating with Cal.com automatically synchronizes your tracked hours with your calendar, allowing you to easily monitor your progress on your projects.",
    status: "Coming soon",
  },
];

const AppsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {apps.map((app) => (
        <div
          key={app.name}
          className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent p-4 shadow-md flex flex-col h-full"
        >
          <div className="flex flex-col items-start mb-4">
            <img src={app.logo} alt={`${app.name} logo`} className="h-16 mb-3" />
            <h2 className="text-sm font-medium text-left">
              {app.name}
              {app.status === "Coming soon" && (
                <span className="text-[#878787] bg-[#F2F1EF] text-[10px] dark:bg-[#1D1D1D] px-2 py-1 rounded-full font-mono ml-2">Muy Pronto</span>
              )}
            </h2>
          </div>
          <p className="text-[12px] text-[#878787] mb-4 flex-grow">{app.description}</p>
          <div className="flex w-full space-x-2">
            <button
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-gray-300 cursor-not-allowed' : 'text-white hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
              disabled={app.status === "Coming soon"}
            >
              Detalles
            </button>
            <button
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] ${app.status === "Coming soon" ? 'text-gray-300 cursor-not-allowed' : 'text-white hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
              disabled={app.status === "Coming soon"}
            >
              Visitar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppsPage;
