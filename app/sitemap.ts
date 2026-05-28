import type { MetadataRoute } from "next";
import { NICHOS } from "@/lib/servicos";

const BASE = "https://25horasagency.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/sobre", priority: 0.8, freq: "monthly" },
    { path: "/servicos", priority: 0.9, freq: "monthly" },
    { path: "/portfolio", priority: 0.9, freq: "weekly" },
    { path: "/contactos", priority: 0.7, freq: "yearly" },
    { path: "/orcamento", priority: 0.7, freq: "yearly" },
  ];

  const nichoRoutes = NICHOS.flatMap((n) => [
    {
      url: `${BASE}/servicos/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE}/servicos/${n.slug}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

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
