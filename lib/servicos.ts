// Source of truth for the SERVIÇOS map.
// Base transversal (gestão de redes) is shared across every niche.
// Each niche then adds its own VÍDEO / FOTOGRAFIA / DESIGN specialisation.

export type NichoSlug =
  | "restaurantes"
  | "desporto"
  | "real-estate"
  | "travel"
  | "corporate"
  | "saude";

export type Nicho = {
  code: string;
  slug: NichoSlug;
  label: string;
  emoji: string;
  tagline: string;
  image: string;
  video: string[];
  fotografia: string[];
  /**
   * Optional. Brief só listou Design para Restaurantes, Desporto e Real Estate.
   * Travel, Corporate e Saúde herdam a linguagem visual transversal (DESIGN_TRANSVERSAL).
   */
  design?: string[];
};

export const BASE_TRANSVERSAL = {
  code: "00",
  label: "GESTÃO DE REDES SOCIAIS",
  tagline: "A base transversal — presente em todos os nichos.",
  pillars: [
    "Planeamento mensal",
    "Copywriting",
    "Agendamento",
  ],
  channels: ["Instagram", "Facebook", "TikTok"],
  cadence: [
    { label: "Posts", value: "15 / mês" },
    { label: "Stories", value: "60 / mês" },
  ],
} as const;

export const NICHOS: Nicho[] = [
  {
    code: "01",
    slug: "restaurantes",
    label: "RESTAURANTES",
    emoji: "🍽️",
    tagline: "Pratos, ambiente e equipa — em forma de cinema.",
    image: "/media/nichos/restaurantes.jpg",
    video: [
      "Reels gastronómicos",
      "Highlights de restaurante",
      "Vídeos de pratos premium",
      "Behind the scenes",
      "Chef videos",
      "Cobertura de eventos",
      "TikTok vertical",
      "Drone cinematic",
      "UGC style content",
    ],
    fotografia: [
      "Fotografia gastronómica",
      "Cocktails",
      "Ambiente",
      "Staff",
      "Branding",
      "Menu",
      "Lifestyle",
    ],
    design: [
      "Menus",
      "Stories",
      "Campanhas",
      "Promoções",
      "Branding visual",
    ],
  },
  {
    code: "02",
    slug: "desporto",
    label: "DESPORTO",
    emoji: "⚽",
    tagline: "Atletas, equipas e estádios — em movimento.",
    image: "/media/nichos/desporto.jpg",
    video: [
      "Highlights",
      "Jogos completos",
      "Entrevistas",
      "Hype videos",
      "Bastidores",
      "TikTok sports",
      "Drone de estádio",
    ],
    fotografia: [
      "Jogo",
      "Atleta",
      "Equipa",
      "Treino",
      "Media day",
    ],
    design: [
      "Matchday",
      "Resultados",
      "Escalações",
      "Campanhas de jogadores",
    ],
  },
  {
    code: "03",
    slug: "real-estate",
    label: "REAL ESTATE",
    emoji: "🏠",
    tagline: "Espaços que se vendem em sessenta segundos.",
    image: "/media/nichos/real-estate.jpg",
    video: [
      "Tours imobiliários",
      "Drone cinematic",
      "Luxury walkthrough",
      "Vertical reels",
      "Property showcase",
    ],
    fotografia: [
      "Interior",
      "Exterior",
      "Arquitetura",
      "Lifestyle",
    ],
    design: [
      "Flyers",
      "Property cards",
      "Social campaigns",
    ],
  },
  {
    code: "04",
    slug: "travel",
    label: "TRAVEL",
    emoji: "✈️",
    tagline: "Hotéis, paisagens e experiências em loop cinematográfico.",
    image: "/media/nichos/travel.jpg",
    video: [
      "Cinematic travel",
      "Hotel reels",
      "Destination promo",
      "Lifestyle travel",
    ],
    fotografia: [
      "Hotel",
      "Paisagem",
      "Experiência",
      "Lifestyle",
    ],
  },
  {
    code: "05",
    slug: "corporate",
    label: "CORPORATE",
    emoji: "🏢",
    tagline: "Marcas, fundadores e cultura — em registo institucional.",
    image: "/media/nichos/corporate.jpg",
    video: [
      "Institucional",
      "Entrevistas",
      "Podcast",
      "Eventos",
      "Recrutamento",
    ],
    fotografia: [
      "Corporate portraits",
      "Office lifestyle",
      "Eventos",
    ],
  },
  {
    code: "06",
    slug: "saude",
    label: "SAÚDE & BEM-ESTAR",
    emoji: "💆",
    tagline: "Clínicas e profissionais — com tom e confiança.",
    image: "/media/nichos/saude.jpg",
    video: [
      "Procedimentos",
      "Reels informativos",
      "Branding clinic",
      "Testemunhos",
    ],
    fotografia: [
      "Espaço",
      "Equipa",
      "Procedimentos",
      "Branding",
    ],
  },
];

// Design as a transversal language — explicit at the bottom of /servicos.
export const DESIGN_TRANSVERSAL = {
  label: "DESIGN",
  tagline: "Uma linguagem visual coerente, viva em todos os nichos.",
  items: [
    "Stories",
    "Posts",
    "Campanhas",
    "Branding",
    "Menus",
    "Flyers",
    "Motion graphics",
  ],
} as const;

export function findNicho(slug: string): Nicho | undefined {
  return NICHOS.find((n) => n.slug === slug);
}
