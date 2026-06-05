/**
 * Server-side fetchers do Sanity. Cada um cai gracefully para os dados
 * estáticos em lib/packs.ts / lib/servicos.ts se:
 *   • Sanity não está configurado (sem NEXT_PUBLIC_SANITY_PROJECT_ID)
 *   • A query falha ou devolve null
 *
 * Isto garante que o site nunca parte só por causa do CMS.
 */

import type { NichePack } from "@/lib/packs";
import { getNichePack as staticGetNichePack } from "@/lib/packs";
import type { NichoSlug } from "@/lib/servicos";
import { sanityClient, sanityEnabled, urlForImage } from "./client";
import {
  ALL_NICHES_QUERY,
  NICHE_BY_SLUG_QUERY,
  PORTFOLIO_ALL_QUERY,
  PORTFOLIO_BY_NICHE_QUERY,
  SITE_CONTENT_QUERY,
} from "./queries";
import { adaptSanityNiche } from "./adapter";
import type {
  SanityNiche,
  SanityPortfolioItem,
  SanitySiteContent,
} from "./types";

/** Devolve o NichePack para um slug, do Sanity ou fallback estático. */
export async function fetchNichePack(slug: NichoSlug): Promise<NichePack> {
  if (!sanityEnabled || !sanityClient) {
    return staticGetNichePack(slug);
  }
  try {
    const data = await sanityClient.fetch<SanityNiche | null>(
      NICHE_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 60, tags: [`niche:${slug}`] } },
    );
    if (!data) return staticGetNichePack(slug);
    return adaptSanityNiche(data);
  } catch (err) {
    console.warn(`[sanity] fetchNichePack(${slug}) falhou — fallback static`, err);
    return staticGetNichePack(slug);
  }
}

/** Portfolio items de um nicho. Vazio se Sanity desligado / erro / sem items. */
export async function fetchPortfolioByNiche(
  slug: NichoSlug,
): Promise<SanityPortfolioItem[]> {
  if (!sanityEnabled || !sanityClient) return [];
  try {
    const data = await sanityClient.fetch<SanityPortfolioItem[] | null>(
      PORTFOLIO_BY_NICHE_QUERY,
      { slug },
      { next: { revalidate: 60, tags: [`portfolio:${slug}`] } },
    );
    return data ?? [];
  } catch (err) {
    console.warn(`[sanity] fetchPortfolioByNiche(${slug}) falhou`, err);
    return [];
  }
}

/** Singleton com textos da home / sobre / contactos. Null se erro/desligado. */
export async function fetchSiteContent(): Promise<SanitySiteContent | null> {
  if (!sanityEnabled || !sanityClient) return null;
  try {
    return await sanityClient.fetch<SanitySiteContent | null>(
      SITE_CONTENT_QUERY,
      {},
      { next: { revalidate: 60, tags: ["siteContent"] } },
    );
  } catch (err) {
    console.warn("[sanity] fetchSiteContent falhou", err);
    return null;
  }
}

/**
 * Mapa slug → URL da foto do nicho (campo `image` no Sanity). Vazio se
 * Sanity desligado / erro / sem fotos. Usado na home como foto de fundo
 * (depth) — EDITÁVEL pelo cliente: basta carregar uma imagem no nicho no
 * Studio e ela aparece automaticamente. Sem imagem → fallback estático.
 */
export async function fetchNichePhotos(): Promise<Record<string, string>> {
  if (!sanityEnabled || !sanityClient) return {};
  try {
    const niches = await sanityClient.fetch<SanityNiche[] | null>(
      ALL_NICHES_QUERY,
      {},
      { next: { revalidate: 60, tags: ["niche:photos"] } },
    );
    const map: Record<string, string> = {};
    for (const n of niches ?? []) {
      if (!n.slug || !n.image) continue;
      const url = urlForImage(n.image)?.width(1600).quality(80).auto("format").url();
      if (url) map[n.slug] = url;
    }
    return map;
  } catch (err) {
    console.warn("[sanity] fetchNichePhotos falhou", err);
    return {};
  }
}

/** Todos os portfolio items, agrupados por nicheSlug. */
export async function fetchAllPortfolio(): Promise<
  Record<string, SanityPortfolioItem[]>
> {
  if (!sanityEnabled || !sanityClient) return {};
  try {
    const items = await sanityClient.fetch<SanityPortfolioItem[] | null>(
      PORTFOLIO_ALL_QUERY,
      {},
      { next: { revalidate: 60, tags: ["portfolio:all"] } },
    );
    const grouped: Record<string, SanityPortfolioItem[]> = {};
    for (const it of items ?? []) {
      const slug = it.nicheSlug ?? "_unknown";
      (grouped[slug] ??= []).push(it);
    }
    return grouped;
  } catch (err) {
    console.warn("[sanity] fetchAllPortfolio falhou", err);
    return {};
  }
}
