import type { Metadata } from "next";
import { PortfolioView } from "./PortfolioView";
import { fetchAllPortfolio } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Trabalhos da 25 Horas Agency por nicho — vídeo, fotografia e design para marcas.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const itemsByNiche = await fetchAllPortfolio();
  return <PortfolioView itemsByNiche={itemsByNiche} />;
}
