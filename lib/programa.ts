// Programme catalogue — verticals as a film-festival lineup.
// Counts and years are placeholder. Swap with real Sanity data later.

export type Programme = {
  code: string;
  slug: string;
  label: string;
  count: number;
  yearFrom: number;
  yearTo: number;
  /** Background gradient — sets the tonal identity per vertical. */
  gradient: string;
  /** Single-line tagline for the index card. */
  tagline: string;
};

export const PROGRAMMES: Programme[] = [
  {
    code: "01",
    slug: "hospitalidade",
    label: "HOSPITALIDADE",
    count: 12,
    yearFrom: 2022,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 30% 70%, #3a2010 0%, #1a0e08 55%, #0a0a0a 100%)",
    tagline: "Hotéis · restaurantes · cafés que duram.",
  },
  {
    code: "02",
    slug: "musica",
    label: "MÚSICA",
    count: 8,
    yearFrom: 2022,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 70% 40%, #2a1030 0%, #14081c 55%, #0a0a0a 100%)",
    tagline: "Concertos · videoclipes · estúdio.",
  },
  {
    code: "03",
    slug: "desporto",
    label: "DESPORTO",
    count: 6,
    yearFrom: 2023,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 50% 30%, #102030 0%, #0a1422 55%, #0a0a0a 100%)",
    tagline: "Atletas, equipas, modalidades — em movimento.",
  },
  {
    code: "04",
    slug: "institucional",
    label: "INSTITUCIONAL",
    count: 9,
    yearFrom: 2022,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 40% 50%, #261e14 0%, #14110a 55%, #0a0a0a 100%)",
    tagline: "Marcas, fundações, propósito.",
  },
  {
    code: "05",
    slug: "imobiliario",
    label: "IMOBILIÁRIO",
    count: 7,
    yearFrom: 2023,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 60% 60%, #2c2418 0%, #16110a 55%, #0a0a0a 100%)",
    tagline: "Espaços que se vendem em 60 segundos.",
  },
  {
    code: "06",
    slug: "eventos",
    label: "EVENTOS",
    count: 11,
    yearFrom: 2022,
    yearTo: 2026,
    gradient:
      "radial-gradient(ellipse at 30% 50%, #2a1814 0%, #16100a 55%, #0a0a0a 100%)",
    tagline: "Festivais, lançamentos, casamentos.",
  },
];

export function findProgramme(slug: string): Programme | undefined {
  return PROGRAMMES.find((p) => p.slug === slug);
}
