import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findNicho, type NichoSlug } from "@/lib/servicos";
import { fetchPortfolioByNiche } from "@/lib/sanity/fetch";
import { splitPortfolioItems } from "@/lib/portfolio-media";
import { STATIC_NICHE_PHOTOS } from "@/lib/niche-images";
import { NichePortfolioView, type PortfolioTab } from "./NichePortfolioView";

type Params = { nicho: string };
type Search = { tab?: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) return { title: "Portfólio" };
  return {
    title: `${n.label} — Portfólio`,
    description: `Vídeos, fotografia e redes sociais de ${n.label.toLowerCase()} da 25 Horas Agency.`,
    alternates: { canonical: `/portfolio/${n.slug}` },
  };
}

/** Normaliza o ?tab= (aceita também os valores legados) para uma das 3 tabs. */
function parseTab(raw?: string): PortfolioTab {
  if (raw === "fotografias" || raw === "fotos") return "fotografias";
  if (raw === "redes" || raw === "social" || raw === "redes-sociais") return "redes";
  return "videos";
}

/** Sem ?tab= explícito, abre na primeira tab com conteúdo (um nicho só com
 *  fotos abre em FOTOGRAFIAS em vez de mostrar a tab VÍDEOS vazia). */
function pickInitialTab(
  raw: string | undefined,
  counts: { videos: number; fotos: number; socials: number },
  isRestaurantes: boolean,
): PortfolioTab {
  if (raw) return parseTab(raw);
  if (counts.videos > 0) return "videos";
  if (counts.fotos > 0 || isRestaurantes) return "fotografias";
  if (counts.socials > 0) return "redes";
  return "videos";
}

export default async function NichoPortfolioPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) notFound();

  const { tab } = await searchParams;
  const items = await fetchPortfolioByNiche(n.slug as NichoSlug);
  const { videos, fotos, socials } = splitPortfolioItems(items);
  const initialTab = pickInitialTab(
    tab,
    { videos: videos.length, fotos: fotos.length, socials: socials.length },
    n.slug === "restaurantes",
  );

  return (
    <NichePortfolioView
      slug={n.slug}
      accent={n.accentColor}
      heroImage={STATIC_NICHE_PHOTOS[n.slug] ?? "/media/nichos/portfolio.webp"}
      initialTab={initialTab}
      videos={videos}
      fotos={fotos}
      socials={socials}
    />
  );
}
