import type { MetadataRoute } from "next";
import { fetchNicheSitemap } from "@/lib/sanity/fetch";

const BASE = "https://25horasagency.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/sobre", priority: 0.8, freq: "monthly" },
    { path: "/servicos", priority: 0.9, freq: "monthly" },
    { path: "/portfolio", priority: 0.9, freq: "weekly" },
    { path: "/contactos", priority: 0.7, freq: "yearly" },
    { path: "/orcamento", priority: 0.7, freq: "yearly" },
    { path: "/politica-privacidade", priority: 0.3, freq: "yearly" },
    { path: "/cookies", priority: 0.3, freq: "yearly" },
  ];

  // Nichos do Sanity (lastModified = _updatedAt). Fallback estático se o CMS falhar.
  const niches = await fetchNicheSitemap();
  const nichoRoutes = niches.flatMap((n) => {
    const lastModified = n.updatedAt ? new Date(n.updatedAt) : now;
    return [
      {
        url: `${BASE}/servicos/${n.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${BASE}/servicos/${n.slug}/portfolio`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      {
        url: `${BASE}/portfolio/${n.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      },
    ];
  });

  return [
    ...staticRoutes.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...nichoRoutes,
  ];
}
