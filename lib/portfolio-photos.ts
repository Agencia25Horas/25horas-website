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
  sushi:    [3, 4, 5, 6, 7], // 07 = sashimi de atum (portrait); 08-12 landscape (12 é quadrada → lightbox 16:9)
  carnes:   [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  doces:    [4, 5, 6, 7],
  pizzas:   [4],
  peixe:    [2, 3, 6], // 01 é landscape (capa), 02/03/06 portrait, 04/05/07/08 landscape
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
    count: 12,
    cover: "/portfolio/restaurantes/sushi/04.jpeg",
    items: makeItems("sushi", 12),
  },
  {
    slug: "peixe",
    label: "Peixe e Marisco",
    labelEn: "Fish & Seafood",
    labelEs: "Pescado y Marisco",
    count: 8,
    cover: "/portfolio/restaurantes/peixe/01.jpeg",
    items: makeItems("peixe", 8),
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
    label: "Massas, Saladas e Focaccias",
    labelEn: "Pasta, Salads & Focaccias",
    labelEs: "Pastas, Ensaladas y Focaccias",
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

// Nota: as fotos de outros nichos (desporto, corporate, …) vêm de
// PORTFOLIO_FALLBACK (lib/portfolio-fallback.ts) via fetchPortfolioByNiche, já
// com mediaType="foto" — a tab FOTOGRAFIAS do nicho fá-las passar daí. Não
// duplicar essa lista aqui.
