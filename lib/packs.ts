// Source of truth for the niche PACK pages (replicates the Real Estate
// poster layout for all 6 niches). Bilingual content lives here so we don't
// bloat lib/i18n.ts with hundreds of pack-specific keys.
//
// Used by components/sections/NichePackView.tsx via getNichePack(slug).

import type { NichoSlug } from "./servicos";

type Bi = { pt: string; en: string };

export type PackIcon =
  | "calendar"
  | "camera"
  | "pencil"
  | "studio"
  | "block"
  | "reel"
  | "plus";

export type PackFeature = {
  icon: PackIcon;
  title: Bi;
  desc: Bi;
  /** When true the row gets the accent-coloured background (used on the
   *  "Acesso ao estúdio" highlight in Pack A). */
  accent?: boolean;
};

export type Pack = {
  /** Static label ("PACK A" etc.) — not translated. */
  name: "PACK A" | "PACK B" | "PACK C";
  subtitle: Bi;
  highlighted?: boolean;
  features: PackFeature[];
};

export type MinimumItem = {
  icon: "calendar" | "reel" | "plus";
  value: string;
  label: Bi;
};

export type NichePack = {
  /** Sub-brand logo shown in hero + contact section. */
  logoSrc: string;
  hero: {
    titleL1: Bi;
    titleL2: Bi;
    subtitle: Bi;
    description: Bi;
  };
  plano: { l1: Bi; l2: Bi };
  packs: [Pack, Pack, Pack];
  minimums: { eyebrow: Bi; items: MinimumItem[] };
  objective: { eyebrow: Bi; text: Bi };
  tagline: { l1: Bi; l2: Bi };
  ctaTitle: Bi;
  /** Pre-fill for the wa.me link. Encoded at use site. */
  whatsappText: Bi;
};

/* ─── HERO + plano badge: shared across all niches (the product is the
 *      same — gestão de redes sociais — only what we capture changes). ─── */

const SHARED_HERO_TITLE_L1: Bi = { pt: "Gestão de", en: "Social Media" };
const SHARED_HERO_TITLE_L2: Bi = { pt: "Redes Sociais", en: "Management" };
const SHARED_HERO_SUBTITLE: Bi = {
  pt: "Foco em marca. Resultados em vendas.",
  en: "Brand focus. Sales results.",
};
const SHARED_HERO_DESCRIPTION: Bi = {
  pt: "Soluções completas para fortalecer a sua presença digital, através de conteúdo estratégico, criativo e consistente.",
  en: "Complete solutions to strengthen your digital presence through strategic, creative and consistent content.",
};
const SHARED_PLANO: NichePack["plano"] = {
  l1: { pt: "Plano", en: "Monthly" },
  l2: { pt: "Mensal", en: "Plan" },
};

/* ─── Pack A/B/C subtitles: shared (same tiering across all niches). ─── */

const PACK_A_SUBTITLE: Bi = {
  pt: "Gestão Premium\n+ Estúdio",
  en: "Premium Management\n+ Studio",
};
const PACK_B_SUBTITLE: Bi = {
  pt: "Gestão Profissional\nde Redes Sociais",
  en: "Professional\nSocial Media Management",
};
const PACK_C_SUBTITLE: Bi = {
  pt: "Gestão Base\nde Conteúdo",
  en: "Base Content\nManagement",
};

/* ─── Features that don't change per niche. ─── */

const STUDIO_FEATURE: PackFeature = {
  icon: "studio",
  accent: true,
  title: {
    pt: "Acesso ao estúdio 25Horas Agency",
    en: "Access to 25Horas Agency studio",
  },
  desc: {
    pt: "Fotografia profissional, podcast, entrevistas, vídeos institucionais e branding.",
    en: "Professional photography, podcast, interviews, institutional videos and branding.",
  },
};

const NO_STUDIO_FEATURE: PackFeature = {
  icon: "block",
  title: { pt: "Não inclui acesso ao estúdio", en: "Studio access not included" },
  desc: {
    pt: "Este pack não inclui acesso ao estúdio de fotografia/podcast da 25Horas Agency.",
    en: "This pack does not include access to the 25Horas Agency photography/podcast studio.",
  },
};

const PACK_AB_CREATION_FEATURE: PackFeature = {
  icon: "pencil",
  title: { pt: "Criação de", en: "Creation of" },
  desc: {
    pt: "4 a 5 criativos semanais com edição completa, design editorial, copywriting, planeamento e agendamento.",
    en: "4 to 5 weekly creatives with full editing, editorial design, copywriting, planning and scheduling.",
  },
};

const PACK_C_FEATURES_TAIL: PackFeature[] = [
  {
    icon: "camera",
    title: { pt: "Captação de", en: "Capture of" },
    desc: {
      pt: "vídeo, fotografia e conteúdos institucionais.",
      en: "video, photography and institutional content.",
    },
  },
  {
    icon: "pencil",
    title: { pt: "Edição de conteúdos,", en: "Content editing," },
    desc: {
      pt: "planeamento mensal e agendamento.",
      en: "monthly planning and scheduling.",
    },
  },
];

const PACK_B_CAPTURE_GENERIC: PackFeature = {
  icon: "camera",
  title: { pt: "Captação de", en: "Capture of" },
  desc: {
    pt: "vídeo, fotografia e conteúdo para redes sociais.",
    en: "video, photography and social media content.",
  },
};

const SHARED_MINIMUMS: NichePack["minimums"] = {
  eyebrow: {
    pt: "Conteúdo mínimo mensal · todos os packs",
    en: "Monthly minimum content · all packs",
  },
  items: [
    { icon: "calendar", value: "15", label: { pt: "Posts no perfil", en: "Feed posts" } },
    { icon: "reel", value: "4", label: { pt: "Reels por mês", en: "Reels per month" } },
    { icon: "plus", value: "60", label: { pt: "Stories", en: "Stories" } },
  ],
};

const SHARED_OBJ_EYEBROW: Bi = { pt: "Objetivo", en: "Objective" };
const SHARED_CTA_TITLE: Bi = {
  pt: "Pronto para começar? Pede o teu pack.",
  en: "Ready to start? Get your pack.",
};

/* ─── Helpers to compose a niche entry with minimal repetition. ─── */

type NicheVariation = {
  logoSrc: string;
  visitCadence: { title: Bi; desc: Bi };
  monthlyVisitTitle?: Bi;
  packACapture: Bi;
  objective: Bi;
  tagline: { l1: Bi; l2: Bi };
  whatsappText: Bi;
};

function makeNichePack(v: NicheVariation): NichePack {
  return {
    logoSrc: v.logoSrc,
    hero: {
      titleL1: SHARED_HERO_TITLE_L1,
      titleL2: SHARED_HERO_TITLE_L2,
      subtitle: SHARED_HERO_SUBTITLE,
      description: SHARED_HERO_DESCRIPTION,
    },
    plano: SHARED_PLANO,
    packs: [
      {
        name: "PACK A",
        subtitle: PACK_A_SUBTITLE,
        highlighted: true,
        features: [
          { icon: "calendar", title: v.visitCadence.title, desc: v.visitCadence.desc },
          {
            icon: "camera",
            title: { pt: "Captação de", en: "Capture of" },
            desc: v.packACapture,
          },
          PACK_AB_CREATION_FEATURE,
          STUDIO_FEATURE,
        ],
      },
      {
        name: "PACK B",
        subtitle: PACK_B_SUBTITLE,
        features: [
          { icon: "calendar", title: v.visitCadence.title, desc: v.visitCadence.desc },
          PACK_B_CAPTURE_GENERIC,
          PACK_AB_CREATION_FEATURE,
          NO_STUDIO_FEATURE,
        ],
      },
      {
        name: "PACK C",
        subtitle: PACK_C_SUBTITLE,
        features: [
          {
            icon: "calendar",
            title: v.monthlyVisitTitle ?? { pt: "1 visita mensal", en: "Monthly visit" },
            desc: { pt: "", en: "" },
          },
          ...PACK_C_FEATURES_TAIL,
        ],
      },
    ],
    minimums: SHARED_MINIMUMS,
    objective: { eyebrow: SHARED_OBJ_EYEBROW, text: v.objective },
    tagline: v.tagline,
    ctaTitle: SHARED_CTA_TITLE,
    whatsappText: v.whatsappText,
  };
}

/* ─── Per-niche data. ─── */

export const PACKS_BY_NICHE: Record<NichoSlug, NichePack> = {
  restaurantes: makeNichePack({
    logoSrc: "/media/logos/b25restaurantes.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session" },
      desc: {
        pt: "Dia e horário acordados com o restaurante.",
        en: "Day and time arranged with the restaurant.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, pratos, ambiente, equipa e bastidores na cozinha.",
      en: "video, photography and vertical content, dishes, atmosphere, team and kitchen behind the scenes.",
    },
    objective: {
      pt: "Encher reservas, criar fome no scroll e fidelizar comensais.",
      en: "Fill reservations, build appetite on scroll and keep guests loyal.",
    },
    tagline: {
      l1: { pt: "Os pratos.", en: "The dishes." },
      l2: { pt: "O nosso cinema.", en: "Our cinema." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para restaurantes.",
      en: "Hi! I'd like to know more about your restaurant packs.",
    },
  }),

  desporto: makeNichePack({
    logoSrc: "/media/logos/b25sports.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session" },
      desc: {
        pt: "Matchday ou treino — acordamos com o clube/atleta.",
        en: "Matchday or training — arranged with the club/athlete.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, jogo, treino, atletas, media day e bastidores.",
      en: "video, photography and vertical content, matches, training, athletes, media day and behind the scenes.",
    },
    objective: {
      pt: "Aumentar adeptos, valorizar atletas e fechar patrocínios.",
      en: "Grow fanbase, raise athlete value and close sponsorships.",
    },
    tagline: {
      l1: { pt: "O jogo.", en: "The game." },
      l2: { pt: "A nossa lente.", en: "Our lens." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para clubes ou atletas.",
      en: "Hi! I'd like to know more about your packs for clubs or athletes.",
    },
  }),

  "real-estate": makeNichePack({
    logoSrc: "/media/logos/b25realstate.png",
    visitCadence: {
      title: { pt: "1 visita semanal", en: "Weekly visit" },
      desc: {
        pt: "Todas as segundas-feiras das 10h às 14h.",
        en: "Every Monday from 10am to 2pm.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, lifestyle imobiliário, bastidores, equipa e propriedades.",
      en: "video, photography and vertical content, real estate lifestyle, behind the scenes, team and properties.",
    },
    objective: {
      pt: "Fortalecer a marca, gerar confiança e aumentar resultados.",
      en: "Strengthen the brand, build trust and grow results.",
    },
    tagline: {
      l1: { pt: "A sua marca.", en: "Your brand." },
      l2: { pt: "O nosso compromisso.", en: "Our commitment." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para Real Estate.",
      en: "Hi! I'd like to know more about your Real Estate packs.",
    },
  }),

  travel: makeNichePack({
    logoSrc: "/media/logos/b25travel.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session" },
      desc: {
        pt: "Dia e horário acordados com o hotel ou parceiro de destino.",
        en: "Day and time arranged with the hotel or destination partner.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, hotel, paisagem, lifestyle e experiência.",
      en: "video, photography and vertical content, hotel, landscape, lifestyle and experience.",
    },
    objective: {
      pt: "Encher quartos, vender experiências e construir destino.",
      en: "Fill rooms, sell experiences and build the destination.",
    },
    tagline: {
      l1: { pt: "O destino.", en: "The destination." },
      l2: { pt: "A nossa história.", en: "Our story." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para hotéis e destinos.",
      en: "Hi! I'd like to know more about your hotel/destination packs.",
    },
  }),

  corporate: makeNichePack({
    logoSrc: "/media/logos/b25corporate.png",
    visitCadence: {
      title: { pt: "1 visita semanal", en: "Weekly visit" },
      desc: {
        pt: "Todas as segundas-feiras das 10h às 14h.",
        en: "Every Monday from 10am to 2pm.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, institucional, podcast, equipa, eventos e branding.",
      en: "video, photography and vertical content, institutional, podcast, team, events and branding.",
    },
    objective: {
      pt: "Construir autoridade, atrair talento e fechar contratos.",
      en: "Build authority, attract talent and close contracts.",
    },
    tagline: {
      l1: { pt: "A vossa marca.", en: "Your brand." },
      l2: { pt: "A nossa autoria.", en: "Our authorship." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs corporate.",
      en: "Hi! I'd like to know more about your corporate packs.",
    },
  }),

  saude: makeNichePack({
    logoSrc: "/media/logos/b25family.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session" },
      desc: {
        pt: "Dia e horário acordados com a clínica ou família.",
        en: "Day and time arranged with the clinic or family.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, clínica, profissionais, procedimentos e momentos de família.",
      en: "video, photography and vertical content, clinic, professionals, procedures and family moments.",
    },
    objective: {
      pt: "Marcar consultas, criar confiança e encher agendas.",
      en: "Book appointments, build trust and fill calendars.",
    },
    tagline: {
      l1: { pt: "A vossa história.", en: "Your story." },
      l2: { pt: "A nossa câmara.", en: "Our camera." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para família e clínicas.",
      en: "Hi! I'd like to know more about your family/clinic packs.",
    },
  }),
};

export function getNichePack(slug: NichoSlug): NichePack {
  return PACKS_BY_NICHE[slug];
}
