// Source of truth for the SERVIÇOS map.
// Used by:
//   • SplitScrollReel (8 slides, agency/producoes first, then 6 nichos)
//   • /servicos and /servicos/[nicho] pages (deep listing)

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
  /** Optional — Travel, Corporate, Saúde don't offer Design as a service. */
  design?: string[];
};

// Shared across every slide — "GESTÃO DE REDES SOCIAIS" appears as the
// last (3rd or 4th) panel in every slide's accordion.
export const GESTAO_REDES = {
  label: "GESTÃO DE REDES SOCIAIS",
  emoji: "📲",
  items: [
    "Planeamento mensal",
    "Copywriting",
    "Agendamento",
    "Instagram",
    "Facebook",
    "TikTok",
    "15 posts",
    "60 stories",
  ],
} as const;

// Legacy structure kept for /servicos and /servicos/[nicho] pages which
// render pillars/channels/cadence as separate blocks.
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
      "Highlights restaurante",
      "Vídeos pratos premium",
      "Behind the scenes",
      "Chef videos",
      "Eventos",
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
      "Drone estádio",
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
      "Campanhas jogadores",
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
    // NO design — Travel não oferece design como serviço.
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
    // NO design — Corporate não oferece design como serviço.
  },
  {
    code: "06",
    slug: "saude",
    label: "SAÚDE & FAMÍLIA",
    emoji: "💆",
    tagline: "Clínicas, profissionais e momentos de família — com tom e confiança.",
    image: "/media/nichos/saude.jpg",
    video: [
      "Procedimentos",
      "Reels informativos",
      "Branding clinic",
      "Testemunhos",
      "Família",
      "Lifestyle clínico",
    ],
    fotografia: [
      "Espaço",
      "Equipa",
      "Procedimentos",
      "Branding",
      "Retratos de família",
    ],
    // NO design — Saúde & Família não oferece design como serviço.
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
