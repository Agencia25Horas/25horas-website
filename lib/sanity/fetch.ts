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
import { sanityClient, sanityEnabled } from "./client";
import {
  NICHE_BY_SLUG_QUERY,
  PORTFOLIO_ALL_QUERY,
  PORTFOLIO_BY_NICHE_QUERY,
} from "./queries";
import { adaptSanityNiche } from "./adapter";
import type { SanityNiche, SanityPortfolioItem } from "./types";

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
