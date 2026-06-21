import type { Metadata } from "next";
import { WebsitesView } from "./WebsitesView";

export const metadata: Metadata = {
  title: "Criação de Websites e Lojas Online",
  description:
    "Design e desenvolvimento de websites rápidos e pensados para converter — sites institucionais, lojas online, landing pages, plataformas à medida, SEO e manutenção. Lisboa. Orçamento sob consulta.",
  keywords: [
    "criação de websites",
    "desenvolvimento web",
    "web design",
    "loja online",
    "e-commerce",
    "landing pages",
    "plataformas web",
    "SEO",
    "Lisboa",
    "25 Horas",
  ],
  alternates: { canonical: "/servicos/websites" },
  openGraph: {
    title: "Criação de Websites — 25 Horas Agency",
    description:
      "Sites institucionais, lojas online, landing pages e plataformas à medida — rápidos, bonitos e a converter.",
    url: "/servicos/websites",
    type: "website",
    locale: "pt_PT",
    siteName: "25 Horas Agency",
  },
};

export default function WebsitesPage() {
  return <WebsitesView />;
}
