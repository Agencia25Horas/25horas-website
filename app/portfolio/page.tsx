import type { Metadata } from "next";
import { PortfolioHubView } from "./PortfolioHubView";

export const metadata: Metadata = {
  title: "Portfólio — Trabalhos por área de negócio",
  description:
    "Vídeos, fotografia e redes sociais da 25 Horas Agency, organizados por área de negócio.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioHubView />;
}
