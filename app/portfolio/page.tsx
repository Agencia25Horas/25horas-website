import type { Metadata } from "next";
import { PortfolioHubView } from "./PortfolioHubView";

export const metadata: Metadata = {
  title: "Portefólio — Trabalhos por nicho",
  description:
    "Vídeos, fotografia e redes sociais da 25 Horas Agency, organizados por nicho.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return <PortfolioHubView />;
}
