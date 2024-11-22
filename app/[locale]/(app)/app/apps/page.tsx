"use client";

import React from "react";

const apps = [
  {
    name: "Slack",
    description: "Integrating with Slack enables you to use Midday Assistant right from your Slack workspace, you will also get notifications when you have new transactions and more.",
    status: "Available",
  },
  {
    name: "Raycast",
    description: "Track time directly in Raycast. You can start a timer, add time to an existing project or create a new project directly from Raycast.",
    status: "Coming soon",
  },
  {
    name: "QuickBooks",
    description: "Integrating with QuickBooks enables you to synchronize transactions and attachments, neatly organizing them in your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Xero",
    description: "Integrating with Xero allows you to synchronize transactions and attachments neatly organized in your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Cal.com",
    description: "Integrating with Cal.com automatically synchronizes your tracked hours with your calendar, allowing you to easily monitor your progress on your projects.",
    status: "Coming soon",
  },
  {
    name: "Fortnox",
    description: "By seamlessly integrating with Fortnox, you gain the ability to effortlessly synchronize every transaction and attachment.",
    status: "Coming soon",
  },
  {
    name: "Visma",
    description: "Integrating with Visma allows you to synchronize transactions and attachments, neatly organizing them within your bookkeeping software.",
    status: "Coming soon",
  },
  {
    name: "Zapier",
    description: "Zapier lets you connect Midday to other apps and automate powerful workflows.",
    status: "Coming soon",
  },
];

const AppsPage = () => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app) => (
          <div
            key={app.name}
            className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 mr-2">
                <span className="text-2xl">{app.name.charAt(0)}</span>
              </div>
              <h2 className="text-lg font-semibold flex items-center">
                {app.name}
                {app.status === "Coming soon" && (
                  <span className="text-red-500 text-xs font-semibold ml-2">Coming soon</span>
                )}
              </h2>
            </div>
            <p className="text-sm mb-2">{app.description}</p>
            <div className="flex justify-between">
              <button className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] text-white px-4 py-2 rounded-none hover:bg-gray-700">Details</button>
              <button className="border border-[#DCDAD2] dark:border-[#2C2C2C] bg-[#ececec] dark:bg-[#1b1b1b] text-white px-4 py-2 rounded-none hover:bg-gray-700">Install</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppsPage;
