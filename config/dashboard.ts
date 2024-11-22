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
      title: "",
      items: [
        {
          title: "Index",
          href: "/app",
          icon: "HomeIcon",
        },
        {
          title: "Apps",
          href: "/apps",
          icon: "LayoutGrid",
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
          title: "Traductor",
          href: "https://traductor.notas.ai",
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
          title: "Historial",
          href: "/app/history",
          icon: "History",
        },
        {
          title: "Canjear Código",
          href: "/app/giftcode",
          icon: "Gift",
        },
        {
          title: "Facturación",
          href: "/app/order",
          icon: "billing",
        },
      ],
    },
  ],
};
