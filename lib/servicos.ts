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
  | "saude"
  | "saude-bem-estar"
  | "educacao"
  | "eventos"
  | "studio";

export type Nicho = {
  code: string;
  slug: NichoSlug;
  label: string;
  emoji: string;
  tagline: string;
  image: string;
  /** Hex código da cor de marca do sub-logo do nicho. Aplica-se ao
   *  título do nicho na home e na deep page, CTAs específicos da
   *  niche, bordas de cards highlighted, linhas decorativas. */
  accentColor: string;
  /** Fotos extra (moody/Unsplash) para intercalar na deep page do nicho. */
  photos?: string[];
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
    accentColor: "#FED40D",
    photos: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
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
    accentColor: "#37a138",
    photos: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
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
    accentColor: "#e7071f",
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
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
    accentColor: "#314599",
    photos: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
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
    design: [
      "Branding",
      "Flyers",
      "Stories",
      "Posts",
    ],
  },
  {
    code: "05",
    slug: "corporate",
    label: "CORPORATE",
    emoji: "🏢",
    tagline: "Marcas, fundadores e cultura — em registo institucional.",
    image: "/media/nichos/corporate.jpg",
    accentColor: "#8f41b9",
    photos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
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
    design: [
      "Apresentações",
      "Branding",
      "Motion graphics",
      "Campanhas",
    ],
  },
  {
    code: "06",
    slug: "saude",
    label: "FAMÍLIA",
    emoji: "💆",
    tagline: "Pais, filhos e momentos — em forma de cinema.",
    image: "/media/nichos/saude.jpg",
    accentColor: "#ce9a2e",
    photos: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    video: [
      "Família",
      "Retratos de família",
      "Reels familiares",
      "Eventos familiares",
      "Lifestyle",
      "Memórias",
    ],
    fotografia: [
      "Retratos de família",
      "Crianças",
      "Eventos",
      "Lifestyle",
      "Casais",
    ],
    design: [
      "Convites",
      "Álbuns",
      "Stories",
      "Posts",
    ],
  },
  {
    code: "07",
    slug: "saude-bem-estar",
    label: "SAÚDE",
    emoji: "🩺",
    tagline: "Clínicas, profissionais e procedimentos — em registo de confiança.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop&auto=format&q=80",
    accentColor: "#ec588c",
    photos: [
      "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    video: [
      "Procedimentos",
      "Reels informativos",
      "Branding clínico",
      "Testemunhos",
      "Lifestyle clínico",
      "Equipa clínica",
    ],
    fotografia: [
      "Espaço",
      "Equipa",
      "Procedimentos",
      "Branding",
      "Retratos profissionais",
    ],
    design: [
      "Branding clínico",
      "Stories",
      "Posts",
      "Flyers",
    ],
  },
  {
    code: "08",
    slug: "educacao",
    label: "EDUCAÇÃO",
    emoji: "🎓",
    tagline: "Escolas, formadores e conhecimento — em forma de cinema.",
    image: "/media/nichos/educationop.png",
    accentColor: "#1bb3e2",
    photos: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=800&fit=crop&auto=format&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop&auto=format&q=80",
    ],
    video: [
      "Vídeos institucionais",
      "Cursos online",
      "Depoimentos de alunos",
      "Aulas em destaque",
      "Eventos académicos",
      "Reels educativos",
    ],
    fotografia: [
      "Campus",
      "Formadores",
      "Alunos",
      "Eventos",
      "Lifestyle académico",
    ],
    design: [
      "Materiais de curso",
      "Stories",
      "Campanhas de inscrição",
      "Apresentações",
    ],
  },
  {
    code: "09",
    slug: "eventos",
    label: "EVENTOS",
    emoji: "🎉",
    tagline: "Festivais, marcas e momentos — cobertura em registo de cinema.",
    image: "/media/nichos/eventosop.jpg",
    accentColor: "#009688",
    video: [
      "Aftermovie",
      "Cobertura de evento",
      "Reels",
      "Highlights",
      "Entrevistas",
      "Drone cinematic",
    ],
    fotografia: [
      "Cobertura",
      "Ambiente",
      "Convidados",
      "Branding",
      "Lifestyle",
    ],
    design: [
      "Cartazes",
      "Stories",
      "Posts",
      "Campanhas",
    ],
  },
  {
    code: "10",
    slug: "studio",
    label: "STUDIO",
    emoji: "🎬",
    tagline: "Retratos, podcast e produto — no nosso estúdio.",
    image: "/media/nichos/studioop.jpg",
    accentColor: "#76F020",
    video: [
      "Podcast",
      "Vídeos institucionais",
      "Entrevistas",
      "Reels",
      "Branding",
      "Behind the scenes",
    ],
    fotografia: [
      "Retratos profissionais",
      "Produto",
      "Branding",
      "Ambiente de estúdio",
    ],
    design: [
      "Stories",
      "Posts",
      "Campanhas",
      "Branding visual",
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
