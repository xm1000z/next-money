import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_SITE_URL;

export const siteConfig: SiteConfig = {
  name: "NotasAI",
  description:
    "Inteligencia Artificial en español.",
  url: site_url,
  ogImage: `${site_url}/og.png`,
  links: {
    twitter: "https://x.com/notas_ia",
  },
  mailSupport: "support@notas.ai",
};
