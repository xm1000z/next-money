import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "App",
      items: [
        {
          title: "Index",
          href: "/app",
          icon: "HomeIcon",
        },
        {
          title: "Notas",
          href: "https://writer.notas.ai",
          icon: "SquarePen",
          rightIcon: "ExternalLink",
          external: true 
        },
        {
          title: "Chat",
          href: "https://chat.notas.ai",
          icon: "MessageSquare",
          rightIcon: "ExternalLink",
          external: true 
        },
        {
          title: "Search",
          href: "https://search.notas.ai",
          icon: "TrendingUp",
          rightIcon: "ExternalLink",
          external: true 
        },
        {
          title: "SEO",
          href: "https://seo.notas.ai",
          icon: "TextSearch",
          rightIcon: "ExternalLink",
          external: true 
        },
        {
          title: "LISA",
          href: "https://lisa.notas.ai",
          icon: "Users",
          rightIcon: "ExternalLink",
          external: true 
        },
        {
          title: "Studio",
          href: "/app/generate",
          icon: "Eraser"
        },
        {
          title: "History",
          href: "/app/history",
          icon: "History",
        },
        {
          title: "GiftCode",
          href: "/app/giftcode",
          icon: "Gift",
        },
        {
          title: "ChargeOrder",
          href: "/app/order",
          icon: "billing",
        },
      ],
    },
  ],
};
