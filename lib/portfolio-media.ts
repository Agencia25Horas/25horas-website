/**
 * Classificação dos portfolio items por tipo de média. Centraliza a regra de
 * "isto é um vídeo?" (mediaType explícito OU, em itens legados sem mediaType,
 * um link de YouTube/Vimeo) para que as tabs VÍDEOS / FOTOGRAFIAS / REDES
 * SOCIAIS da página de nicho partam todas da mesma fonte.
 */

import type { SanityPortfolioItem } from "./sanity/types";

const VIDEO_RE = /(?:youtube\.com|youtu\.be|vimeo\.com)/;

export function isVideoItem(it: SanityPortfolioItem): boolean {
  if (it.mediaType) return it.mediaType === "video";
  return !!it.link && VIDEO_RE.test(it.link);
}

export function isFotoItem(it: SanityPortfolioItem): boolean {
  return it.mediaType === "foto";
}

export function isSocialItem(it: SanityPortfolioItem): boolean {
  return it.mediaType === "social";
}

/** Reparte uma lista de items pelas três tabs do nicho. */
export function splitPortfolioItems(items: SanityPortfolioItem[]): {
  videos: SanityPortfolioItem[];
  fotos: SanityPortfolioItem[];
  socials: SanityPortfolioItem[];
} {
  return {
    videos: items.filter(isVideoItem),
    fotos: items.filter(isFotoItem),
    socials: items.filter(isSocialItem),
  };
}
