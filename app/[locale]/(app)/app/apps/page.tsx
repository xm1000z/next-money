"use client";

import React from "react";

const apps = [
  {
    name: "Slack",
    logo: "/path/to/slack-logo.png",
    description: "Integrating with Slack enables you to use Midday Assistant right from your Slack workspace, you will also get notifications when you have new transactions and more.",
    status: "Available",
  },
  {
    name: "Raycast",
    logo: "/path/to/raycast-logo.png",
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Coming soon",
  },
  {
    name: "QuickBooks",
    logo: "/path/to/quickbooks-logo.png",
    description: "Integrating with QuickBooks enables you to synchronize transactions and attachments, neatly organizing them in your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Xero",
    logo: "/path/to/xero-logo.png",
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Cal.com",
    logo: "/path/to/calcom-logo.png",
    description: "Integrating with Cal.com automatically synchronizes your tracked hours with your calendar, allowing you to easily monitor your progress on your projects.",
    status: "Coming soon",
  },
  {
    name: "Fortnox",
    logo: "/path/to/fortnox-logo.png",
    description: "By seamlessly integrating with Fortnox, you gain the ability to effortlessly synchronize every transaction and attachment.",
    status: "Coming soon",
  },
  {
    name: "Visma",
    logo: "/path/to/visma-logo.png",
    description: "Integrating with Visma allows you to synchronize transactions and attachments, neatly organizing them within your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Zapier",
    logo: "/path/to/zapier-logo.png",
    description: "Zapier lets you connect Midday to other apps and automate powerful workflows.",
    status: "Coming soon",
  },
];

const AppsPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {apps.map((app) => (
        <div
          key={app.name}
          className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent p-4 shadow-md flex flex-col"
        >
          <div className="flex flex-col items-start mb-2">
            <img src={app.logo} alt={`${app.name} logo`} className="h-16 mb-2" />
            <h2 className="text-md text-left">
              {app.name}
              {app.status === "Coming soon" && (
                <span className="text-[#878787] bg-[#F2F1EF] text-[9px] dark:bg-[#1D1D1D] px-2 py-1 rounded-full font-mono ml-2">Coming soon</span>
              )}
            </h2>
          </div>
          <p className="text-xs text-[#878787] mb-2">{app.description}</p>
          <div className="flex-grow"></div>
          <div className="flex w-full space-x-2">
            <button className="flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent text-white px-3 py-1 text-sm rounded-none hover:bg-gray-900 transition">Details</button>
            <button className="flex-1 border border-[#DCDAD2] dark:border-[#2C2C2C] bg-transparent text-white px-3 py-1 text-sm rounded-none hover:bg-gray-900 transition">Install</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppsPage;
