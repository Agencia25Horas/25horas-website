import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findNicho, NICHOS, type NichoSlug } from "@/lib/servicos";
import { fetchPortfolioByNiche } from "@/lib/sanity/fetch";
import { NichoPortfolioView } from "./NichoPortfolioView";

type Params = { nicho: string };

export async function generateStaticParams() {
  return NICHOS.map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) return { title: "Portfólio" };
  return {
    title: `Portfólio · ${n.label}`,
    description: `Trabalhos de ${n.label.toLowerCase()} da 25 Horas Agency — vídeo, fotografia e design.`,
    alternates: { canonical: `/servicos/${n.slug}/portfolio` },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) notFound();
  const items = await fetchPortfolioByNiche(n.slug as NichoSlug);
  return <NichoPortfolioView nicho={n} items={items} />;
}
