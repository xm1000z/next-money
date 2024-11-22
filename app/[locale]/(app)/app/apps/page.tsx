"use client";

import React from "react";
import notas from "@/public/apple-touch-icon.png"
import chat from "@/public/apple-touch-icon.png"
import search from "@/public/apple-touch-icon.png"
import traductor from "@/public/apple-touch-icon.png"
import studio from "@/public/apple-touch-icon.png"
import pdf from "@/public/apple-touch-icon.png"


const apps = [
  {
    name: "Notas",
    logo: notas,
    description: "Integrating with Slack enables you to use Midday Assistant right from your Slack workspace, you will also get notifications when you have new transactions and more.",
    status: "Coming soon",
  },
  {
    name: "Chat",
    logo: chat,
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Available",
  },
  {
    name: "Search",
    logo: search,
    description: "Integrating with QuickBooks enables you to synchronize transactions and attachments, neatly organizing them in your bookkeeping software.",
    status: "Available",
  },
  {
    name: "Traductor",
    logo: traductor,
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Available",
  },
  {
    name: "Studio",
    logo: studio,
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "PDF",
    logo: pdf,
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
          className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent p-6 shadow-md flex flex-col h-full"
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
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-[#DCDAD2] dark:text-[#2C2C2C]' : 'dark:text-white text-black hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
              disabled={app.status === "Coming soon"}
            >
              Detalles
            </button>
            <button
              className={`flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent ${app.status === "Coming soon" ? 'text-[#DCDAD2] dark:text-[#2C2C2C]' : 'dark:text-white text-black hover:bg-accent'} px-3 py-1 text-sm rounded-none transition`}
              disabled={app.status === "Coming soon"}
            >
              Acceder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppsPage;