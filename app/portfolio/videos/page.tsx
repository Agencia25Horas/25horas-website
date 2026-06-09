import type { Metadata } from "next";
import { fetchAllPortfolio } from "@/lib/sanity/fetch";
import { VideosView } from "./VideosView";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export const metadata: Metadata = {
  title: "Vídeos — Portfólio",
  description: "Filmes e campanhas da 25 Horas Agency por nicho.",
  alternates: { canonical: "/portfolio/videos" },
};

const VIDEO_RE = /(?:youtube\.com|youtu\.be|vimeo\.com)/;

function isVideo(it: SanityPortfolioItem): boolean {
  if (it.mediaType) return it.mediaType === "video";
  return !!it.link && VIDEO_RE.test(it.link);
}

export default async function VideosPage() {
  const all = await fetchAllPortfolio();
  const filtered: Record<string, SanityPortfolioItem[]> = {};
  for (const [slug, items] of Object.entries(all)) {
    const f = items.filter(isVideo);
    if (f.length > 0) filtered[slug] = f;
  }
  return <VideosView itemsByNiche={filtered} />;
}
