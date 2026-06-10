/**
 * Dados estáticos das fotos de portfolio por nicho e categoria.
 * Quando o Sanity tiver suporte a mediaType="foto", esta source pode ser
 * substituída ou complementada por dados do CMS.
 */

import type { SanityPortfolioItem } from "./sanity/types";

export interface PhotoCategory {
  slug: string;
  label: string;
  labelEn: string;
  labelEs: string;
  count: number;
  cover: string; // URL da capa no accordion
  items: SanityPortfolioItem[];
}

// Fotos verticais (3:4 — portrait profissional, não 9:16 story)
const VERTICAL: Record<string, number[]> = {
  sushi:    [3, 4, 5, 6],
  carnes:   [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  doces:    [4, 5, 6, 7],
  pizzas:   [4],
  peixe:    [2, 3], // 01 é landscape (capa), 02/03 portrait
};

function makeItems(
  slug: string,
  count: number,
): SanityPortfolioItem[] {
  const vertSet = new Set(VERTICAL[slug] ?? []);
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      _id: `photo-${slug}-${String(n).padStart(2, "0")}`,
      nicheSlug: "restaurantes",
      imageUrl: `/portfolio/restaurantes/${slug}/${String(n).padStart(2, "0")}.jpeg`,
      mediaType: "foto" as const,
      orientation: vertSet.has(n) ? ("vertical" as const) : ("horizontal" as const),
      order: n,
      featured: n <= 3,
    };
  });
}

export const RESTAURANTES_CATEGORIES: PhotoCategory[] = [
  {
    slug: "sushi",
    label: "Sushi",
    labelEn: "Sushi",
    labelEs: "Sushi",
    count: 6,
    cover: "/portfolio/restaurantes/sushi/04.jpeg",
    items: makeItems("sushi", 6),
  },
  {
    slug: "peixe",
    label: "Peixe",
    labelEn: "Fish",
    labelEs: "Pescado",
    count: 3,
    cover: "/portfolio/restaurantes/peixe/01.jpeg",
    items: makeItems("peixe", 3),
  },
  {
    slug: "pizzas",
    label: "Pizzas",
    labelEn: "Pizzas",
    labelEs: "Pizzas",
    count: 4,
    cover: "/portfolio/restaurantes/pizzas/04.jpeg",
    items: makeItems("pizzas", 4),
  },
  {
    slug: "hamburgers",
    label: "Hambúrgueres",
    labelEn: "Burgers",
    labelEs: "Hamburguesas",
    count: 1,
    cover: "/portfolio/restaurantes/hamburgers/01.jpeg",
    items: makeItems("hamburgers", 1),
  },
  {
    slug: "carnes",
    label: "Carnes",
    labelEn: "Meats",
    labelEs: "Carnes",
    count: 16,
    cover: "/portfolio/restaurantes/carnes/04.jpeg",
    items: makeItems("carnes", 16),
  },
  {
    slug: "massas",
    label: "Massas & Saladas",
    labelEn: "Pasta & Salads",
    labelEs: "Pastas y Ensaladas",
    count: 4,
    cover: "/portfolio/restaurantes/massas/04.jpeg",
    items: makeItems("massas", 4),
  },
  {
    slug: "doces",
    label: "Sobremesas",
    labelEn: "Desserts",
    labelEs: "Postres",
    count: 7,
    cover: "/portfolio/restaurantes/doces/04.jpeg",
    items: makeItems("doces", 7),
  },
  {
    slug: "diversos",
    label: "Diversos",
    labelEn: "Various",
    labelEs: "Varios",
    count: 3,
    cover: "/portfolio/restaurantes/diversos/04.jpeg",
    items: makeItems("diversos", 3),
  },
];

export function getCategoryBySlug(slug: string): PhotoCategory | undefined {
  return RESTAURANTES_CATEGORIES.find((c) => c.slug === slug);
}

// ── Fotos de outros nichos (desporto, corporate) na página de fotografia ──
// `oris` = orientação REAL de cada ficheiro por ordem (h=landscape, v=portrait).
function nicheFotos(niche: string, oris: string): SanityPortfolioItem[] {
  return oris.split("").map((o, i): SanityPortfolioItem => {
    const n = String(i + 1).padStart(2, "0");
    return {
      _id: `foto-${niche}-${n}`,
      nicheSlug: niche,
      imageUrl: `/portfolio/${niche}/${n}.jpeg`,
      mediaType: "foto",
      orientation: o === "h" ? "horizontal" : "vertical",
      order: i,
      featured: i < 3,
    };
  });
}

export interface NichoFotoSection {
  slug: string;
  label: string;
  labelEn: string;
  labelEs: string;
  items: SanityPortfolioItem[];
}

export const OUTROS_NICHOS_FOTOS: NichoFotoSection[] = [
  {
    slug: "desporto",
    label: "Desporto",
    labelEn: "Sports",
    labelEs: "Deporte",
    items: nicheFotos("desporto", "vvvvvhvhhh"),
  },
  {
    slug: "corporate",
    label: "Corporate",
    labelEn: "Corporate",
    labelEs: "Corporativo",
    items: nicheFotos("corporate", "hhhhhhhhhvvvvvvvvv"),
  },
];
