// Source of truth for the niche PACK pages (replicates the Real Estate
// poster layout for all 6 niches). Bilingual content lives here so we don't
// bloat lib/i18n.ts with hundreds of pack-specific keys.
//
// Used by components/sections/NichePackView.tsx via getNichePack(slug).

import type { NichoSlug } from "./servicos";

type Bi = { pt: string; en: string; es?: string };

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

const SHARED_HERO_TITLE_L1: Bi = { pt: "Gestão de", en: "Social Media", es: "Gestión de" };
const SHARED_HERO_TITLE_L2: Bi = { pt: "Redes Sociais", en: "Management", es: "Redes Sociales" };
const SHARED_HERO_SUBTITLE: Bi = {
  pt: "Foco em marca. Resultados em vendas.",
  en: "Brand focus. Sales results.",
  es: "Foco en marca. Resultados en ventas.",
};
const SHARED_HERO_DESCRIPTION: Bi = {
  pt: "Soluções completas para fortalecer a sua presença digital, através de conteúdo estratégico, criativo e consistente.",
  en: "Complete solutions to strengthen your digital presence through strategic, creative and consistent content.",
  es: "Soluciones completas para reforzar tu presencia digital, a través de contenido estratégico, creativo y consistente.",
};
const SHARED_PLANO: NichePack["plano"] = {
  l1: { pt: "Plano", en: "Monthly", es: "Plan" },
  l2: { pt: "Mensal", en: "Plan", es: "Mensual" },
};

/* ─── Pack A/B/C subtitles: shared (same tiering across all niches). ─── */

const PACK_A_SUBTITLE: Bi = {
  pt: "Gestão Premium\n+ Estúdio",
  en: "Premium Management\n+ Studio",
  es: "Gestión Premium\n+ Estudio",
};
const PACK_B_SUBTITLE: Bi = {
  pt: "Gestão Profissional\nde Redes Sociais",
  en: "Professional\nSocial Media Management",
  es: "Gestión Profesional\nde Redes Sociales",
};
const PACK_C_SUBTITLE: Bi = {
  pt: "Gestão Base\nde Conteúdo",
  en: "Base Content\nManagement",
  es: "Gestión Base\nde Contenido",
};

/* ─── Features that don't change per niche. ─── */

const STUDIO_FEATURE: PackFeature = {
  icon: "studio",
  accent: true,
  title: {
    pt: "Acesso ao estúdio 25 Horas Agency",
    en: "Access to 25 Horas Agency studio",
    es: "Acceso al estudio 25 Horas Agency",
  },
  desc: {
    pt: "Fotografia profissional, podcast, entrevistas, vídeos institucionais e branding.",
    en: "Professional photography, podcast, interviews, institutional videos and branding.",
    es: "Fotografía profesional, podcast, entrevistas, vídeos institucionales y branding.",
  },
};

const NO_STUDIO_FEATURE: PackFeature = {
  icon: "block",
  title: { pt: "Não inclui acesso ao estúdio", en: "Studio access not included", es: "No incluye acceso al estudio" },
  desc: {
    pt: "Este pack não inclui acesso ao estúdio de fotografia/podcast da 25 Horas Agency.",
    en: "This pack does not include access to the 25 Horas Agency photography/podcast studio.",
    es: "Este pack no incluye acceso al estudio de fotografía/podcast de 25 Horas Agency.",
  },
};

const PACK_AB_CREATION_FEATURE: PackFeature = {
  icon: "pencil",
  title: { pt: "Criação de", en: "Creation of", es: "Creación de" },
  desc: {
    pt: "4 a 5 criativos semanais com edição completa, design editorial, copywriting, planeamento e agendamento.",
    en: "4 to 5 weekly creatives with full editing, editorial design, copywriting, planning and scheduling.",
    es: "4 a 5 creatividades semanales con edición completa, diseño editorial, copywriting, planificación y programación.",
  },
};

const PACK_C_FEATURES_TAIL: PackFeature[] = [
  {
    icon: "camera",
    title: { pt: "Captação de", en: "Capture of", es: "Captación de" },
    desc: {
      pt: "vídeo, fotografia e conteúdos institucionais.",
      en: "video, photography and institutional content.",
      es: "vídeo, fotografía y contenidos institucionales.",
    },
  },
  {
    icon: "pencil",
    title: { pt: "Edição de conteúdos,", en: "Content editing,", es: "Edición de contenidos," },
    desc: {
      pt: "planeamento mensal e agendamento.",
      en: "monthly planning and scheduling.",
      es: "planificación mensual y programación.",
    },
  },
];

const PACK_B_CAPTURE_GENERIC: PackFeature = {
  icon: "camera",
  title: { pt: "Captação de", en: "Capture of", es: "Captación de" },
  desc: {
    pt: "vídeo, fotografia e conteúdo para redes sociais.",
    en: "video, photography and social media content.",
    es: "vídeo, fotografía y contenido para redes sociales.",
  },
};

const SHARED_MINIMUMS: NichePack["minimums"] = {
  eyebrow: {
    pt: "Conteúdo mínimo mensal · todos os packs",
    en: "Monthly minimum content · all packs",
    es: "Contenido mínimo mensual · todos los packs",
  },
  items: [
    { icon: "calendar", value: "15", label: { pt: "Posts no perfil", en: "Feed posts", es: "Posts en el perfil" } },
    { icon: "reel", value: "4", label: { pt: "Reels por mês", en: "Reels per month", es: "Reels por mes" } },
    { icon: "plus", value: "60", label: { pt: "Stories", en: "Stories", es: "Stories" } },
  ],
};

const SHARED_OBJ_EYEBROW: Bi = { pt: "Objetivo", en: "Objective", es: "Objetivo" };
const SHARED_CTA_TITLE: Bi = {
  pt: "Pronto para começar? Pede o teu pack.",
  en: "Ready to start? Get your pack.",
  es: "¿Listo para empezar? Pide tu pack.",
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
            title: { pt: "Captação de", en: "Capture of", es: "Captación de" },
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
            title: v.monthlyVisitTitle ?? { pt: "1 visita mensal", en: "Monthly visit", es: "1 visita mensual" },
            desc: { pt: "", en: "", es: "" },
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
      title: { pt: "1 sessão semanal", en: "Weekly session", es: "1 sesión semanal" },
      desc: {
        pt: "Dia e horário acordados com o restaurante.",
        en: "Day and time arranged with the restaurant.",
        es: "Día y horario acordados con el restaurante.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, pratos, ambiente, equipa e bastidores na cozinha.",
      en: "video, photography and vertical content, dishes, atmosphere, team and kitchen behind the scenes.",
      es: "vídeo, fotografía y contenido vertical, platos, ambiente, equipo y backstage en la cocina.",
    },
    objective: {
      pt: "Encher reservas, criar fome no scroll e fidelizar comensais.",
      en: "Fill reservations, build appetite on scroll and keep guests loyal.",
      es: "Llenar reservas, despertar el hambre en el scroll y fidelizar a los comensales.",
    },
    tagline: {
      l1: { pt: "Os pratos.", en: "The dishes.", es: "Los platos." },
      l2: { pt: "O nosso cinema.", en: "Our cinema.", es: "Nuestro cine." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para restaurantes.",
      en: "Hi! I'd like to know more about your restaurant packs.",
      es: "¡Hola! Quiero saber más sobre los packs para restaurantes.",
    },
  }),

  desporto: makeNichePack({
    logoSrc: "/media/logos/b25sports.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session", es: "1 sesión semanal" },
      desc: {
        pt: "Matchday ou treino — acordamos com o clube/atleta.",
        en: "Matchday or training — arranged with the club/athlete.",
        es: "Matchday o entrenamiento — lo acordamos con el club/atleta.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, jogo, treino, atletas, media day e bastidores.",
      en: "video, photography and vertical content, matches, training, athletes, media day and behind the scenes.",
      es: "vídeo, fotografía y contenido vertical, partido, entrenamiento, atletas, media day y backstage.",
    },
    objective: {
      pt: "Aumentar adeptos, valorizar atletas e fechar patrocínios.",
      en: "Grow fanbase, raise athlete value and close sponsorships.",
      es: "Aumentar la afición, dar valor a los atletas y cerrar patrocinios.",
    },
    tagline: {
      l1: { pt: "O jogo.", en: "The game.", es: "El partido." },
      l2: { pt: "A nossa lente.", en: "Our lens.", es: "Nuestra lente." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para clubes ou atletas.",
      en: "Hi! I'd like to know more about your packs for clubs or athletes.",
      es: "¡Hola! Quiero saber más sobre los packs para clubes o atletas.",
    },
  }),

  "real-estate": makeNichePack({
    logoSrc: "/media/logos/b25realstate.png",
    visitCadence: {
      title: { pt: "1 visita semanal", en: "Weekly visit", es: "1 visita semanal" },
      desc: {
        pt: "Todas as segundas-feiras das 10h às 14h.",
        en: "Every Monday from 10am to 2pm.",
        es: "Todos los lunes de 10h a 14h.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, lifestyle imobiliário, bastidores, equipa e propriedades.",
      en: "video, photography and vertical content, real estate lifestyle, behind the scenes, team and properties.",
      es: "vídeo, fotografía y contenido vertical, lifestyle inmobiliario, backstage, equipo y propiedades.",
    },
    objective: {
      pt: "Fortalecer a marca, gerar confiança e aumentar resultados.",
      en: "Strengthen the brand, build trust and grow results.",
      es: "Reforzar la marca, generar confianza y aumentar resultados.",
    },
    tagline: {
      l1: { pt: "A sua marca.", en: "Your brand.", es: "Tu marca." },
      l2: { pt: "O nosso compromisso.", en: "Our commitment.", es: "Nuestro compromiso." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para Real Estate.",
      en: "Hi! I'd like to know more about your Real Estate packs.",
      es: "¡Hola! Quiero saber más sobre los packs para Real Estate.",
    },
  }),

  travel: makeNichePack({
    logoSrc: "/media/logos/b25travel.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session", es: "1 sesión semanal" },
      desc: {
        pt: "Dia e horário acordados com o hotel ou parceiro de destino.",
        en: "Day and time arranged with the hotel or destination partner.",
        es: "Día y horario acordados con el hotel o el partner de destino.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, hotel, paisagem, lifestyle e experiência.",
      en: "video, photography and vertical content, hotel, landscape, lifestyle and experience.",
      es: "vídeo, fotografía y contenido vertical, hotel, paisaje, lifestyle y experiencia.",
    },
    objective: {
      pt: "Encher quartos, vender experiências e construir destino.",
      en: "Fill rooms, sell experiences and build the destination.",
      es: "Llenar habitaciones, vender experiencias y construir destino.",
    },
    tagline: {
      l1: { pt: "O destino.", en: "The destination.", es: "El destino." },
      l2: { pt: "A nossa história.", en: "Our story.", es: "Nuestra historia." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para hotéis e destinos.",
      en: "Hi! I'd like to know more about your hotel/destination packs.",
      es: "¡Hola! Quiero saber más sobre los packs para hoteles y destinos.",
    },
  }),

  corporate: makeNichePack({
    logoSrc: "/media/logos/b25corporate.png",
    visitCadence: {
      title: { pt: "1 visita semanal", en: "Weekly visit", es: "1 visita semanal" },
      desc: {
        pt: "Todas as segundas-feiras das 10h às 14h.",
        en: "Every Monday from 10am to 2pm.",
        es: "Todos los lunes de 10h a 14h.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, institucional, podcast, equipa, eventos e branding.",
      en: "video, photography and vertical content, institutional, podcast, team, events and branding.",
      es: "vídeo, fotografía y contenido vertical, institucional, podcast, equipo, eventos y branding.",
    },
    objective: {
      pt: "Construir autoridade, atrair talento e fechar contratos.",
      en: "Build authority, attract talent and close contracts.",
      es: "Construir autoridad, atraer talento y cerrar contratos.",
    },
    tagline: {
      l1: { pt: "A vossa marca.", en: "Your brand.", es: "Vuestra marca." },
      l2: { pt: "A nossa autoria.", en: "Our authorship.", es: "Nuestra autoría." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs corporate.",
      en: "Hi! I'd like to know more about your corporate packs.",
      es: "¡Hola! Quiero saber más sobre los packs corporate.",
    },
  }),

  "saude-bem-estar": makeNichePack({
    logoSrc: "/media/logos/25saude.png",
    visitCadence: {
      title: { pt: "1 visita semanal", en: "Weekly visit", es: "1 visita semanal" },
      desc: {
        pt: "Dia e horário acordados com a clínica.",
        en: "Day and time arranged with the clinic.",
        es: "Día y horario acordados con la clínica.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, clínica, profissionais, procedimentos e testemunhos.",
      en: "video, photography and vertical content, clinic, professionals, procedures and testimonials.",
      es: "vídeo, fotografía y contenido vertical, clínica, profesionales, procedimientos y testimonios.",
    },
    objective: {
      pt: "Marcar consultas, criar confiança e encher agendas.",
      en: "Book appointments, build trust and fill calendars.",
      es: "Conseguir citas, crear confianza y llenar agendas.",
    },
    tagline: {
      l1: { pt: "A vossa saúde.", en: "Your health.", es: "Vuestra salud." },
      l2: { pt: "A nossa câmara.", en: "Our camera.", es: "Nuestra cámara." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para clínicas e saúde.",
      en: "Hi! I'd like to know more about your clinic/health packs.",
      es: "¡Hola! Quiero saber más sobre los packs para clínicas y salud.",
    },
  }),

  saude: makeNichePack({
    logoSrc: "/media/logos/b25family.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session", es: "1 sesión semanal" },
      desc: {
        pt: "Dia e horário acordados com a família.",
        en: "Day and time arranged with the family.",
        es: "Día y horario acordados con la familia.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, momentos de família, retratos, eventos e lifestyle.",
      en: "video, photography and vertical content, family moments, portraits, events and lifestyle.",
      es: "vídeo, fotografía y contenido vertical, momentos de familia, retratos, eventos y lifestyle.",
    },
    objective: {
      pt: "Preservar memórias, criar legado e contar histórias de família.",
      en: "Preserve memories, build legacy and tell family stories.",
      es: "Preservar recuerdos, crear legado y contar historias de familia.",
    },
    tagline: {
      l1: { pt: "A vossa história.", en: "Your story.", es: "Vuestra historia." },
      l2: { pt: "A nossa câmara.", en: "Our camera.", es: "Nuestra cámara." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para sessões de família.",
      en: "Hi! I'd like to know more about your family session packs.",
      es: "¡Hola! Quiero saber más sobre los packs para sesiones de familia.",
    },
  }),

  educacao: makeNichePack({
    logoSrc: "/media/logos/25education.png",
    visitCadence: {
      title: { pt: "1 sessão semanal", en: "Weekly session", es: "1 sesión semanal" },
      desc: {
        pt: "Dia e horário acordados com a escola ou formador.",
        en: "Day and time arranged with the school or educator.",
        es: "Día y horario acordados con la escuela o el formador.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, campus, formadores, alunos, aulas e eventos.",
      en: "video, photography and vertical content, campus, educators, students, classes and events.",
      es: "vídeo, fotografía y contenido vertical, campus, formadores, alumnos, clases y eventos.",
    },
    objective: {
      pt: "Atrair inscrições, valorizar o ensino e construir comunidade.",
      en: "Drive enrolments, raise teaching value and build community.",
      es: "Atraer matrículas, dar valor a la enseñanza y construir comunidad.",
    },
    tagline: {
      l1: { pt: "O conhecimento.", en: "The knowledge.", es: "El conocimiento." },
      l2: { pt: "A nossa lente.", en: "Our lens.", es: "Nuestra lente." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para escolas e formação.",
      en: "Hi! I'd like to know more about your education/training packs.",
      es: "¡Hola! Quiero saber más sobre los packs para escuelas y formación.",
    },
  }),

  eventos: makeNichePack({
    logoSrc: "/media/logos/b25eventos.png",
    visitCadence: {
      title: { pt: "Cobertura por evento", en: "Per-event coverage", es: "Cobertura por evento" },
      desc: {
        pt: "Equipa no terreno no dia do evento — combinada contigo.",
        en: "Crew on the ground on event day — arranged with you.",
        es: "Equipo sobre el terreno el día del evento — acordado contigo.",
      },
    },
    packACapture: {
      pt: "vídeo, fotografia e conteúdo vertical, palco, convidados, ambiente e bastidores.",
      en: "video, photography and vertical content, stage, guests, atmosphere and behind the scenes.",
      es: "vídeo, fotografía y contenido vertical, escenario, invitados, ambiente y backstage.",
    },
    objective: {
      pt: "Encher eventos, criar hype e eternizar cada edição.",
      en: "Fill events, build hype and immortalise every edition.",
      es: "Llenar eventos, crear hype y eternizar cada edición.",
    },
    tagline: {
      l1: { pt: "O evento.", en: "The event.", es: "El evento." },
      l2: { pt: "O nosso cinema.", en: "Our cinema.", es: "Nuestro cine." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre os packs para eventos.",
      en: "Hi! I'd like to know more about your event packs.",
      es: "¡Hola! Quiero saber más sobre los packs para eventos.",
    },
  }),

  studio: makeNichePack({
    logoSrc: "/media/logos/b25studio.png",
    visitCadence: {
      title: { pt: "Sessões no estúdio", en: "Studio sessions", es: "Sesiones en el estudio" },
      desc: {
        pt: "Marcas a tua sessão no estúdio 25 Horas.",
        en: "Book your session at the 25 Horas studio.",
        es: "Reservas tu sesión en el estudio 25 Horas.",
      },
    },
    packACapture: {
      pt: "retratos, produto, podcast e conteúdo de marca no estúdio.",
      en: "portraits, product, podcast and brand content in the studio.",
      es: "retratos, producto, podcast y contenido de marca en el estudio.",
    },
    objective: {
      pt: "Elevar a marca com produção de estúdio profissional.",
      en: "Elevate the brand with professional studio production.",
      es: "Elevar la marca con producción de estudio profesional.",
    },
    tagline: {
      l1: { pt: "O teu estúdio.", en: "Your studio.", es: "Tu estudio." },
      l2: { pt: "A nossa produção.", en: "Our production.", es: "Nuestra producción." },
    },
    whatsappText: {
      pt: "Olá! Quero saber mais sobre o estúdio e os packs.",
      en: "Hi! I'd like to know more about the studio and packs.",
      es: "¡Hola! Quiero saber más sobre el estudio y los packs.",
    },
  }),
};

export function getNichePack(slug: NichoSlug): NichePack {
  return PACKS_BY_NICHE[slug];
}
