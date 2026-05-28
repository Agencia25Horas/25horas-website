import type { Metadata } from "next";
import { PortfolioView } from "./PortfolioView";
import { fetchAllPortfolio } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Portefolio — 25 Horas",
  description: "Trabalhos por nicho — vídeo, fotografia e design.",
};

export default async function PortfolioPage() {
  const itemsByNiche = await fetchAllPortfolio();
  return <PortfolioView itemsByNiche={itemsByNiche} />;
}
