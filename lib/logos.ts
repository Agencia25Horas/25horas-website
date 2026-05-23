// SplitScrollReel slides — 8 panels.
// 1–6: the six niches from the client brief. Each links to its dedicated
//      department page at /servicos/[nicho].
// 7–8: 25Horas sub-brands (AGENCY + PRODUÇÕES) — kept as identity slides.
//
// The `desc` line is a punchy single-sentence pull from the brief, designed
// to read in the slow split-scroll. Full breakdown lives on the niche page.

export type LogoEntry = {
  /** Path under /public */
  src: string;
  /** Mono label shown on the left column */
  label: string;
  /** Short description (PT) shown under the label */
  desc: string;
  /** Click destination */
  href: string;
  /** Open in new tab? Use for external sub-brand sites. */
  external?: boolean;
};

export const LOGOS: LogoEntry[] = [
  {
    src: "/media/logos/restaurantes.png",
    label: "RESTAURANTES",
    desc: "Reels gastronómicos, chef videos, drone cinematic — a tua casa em estado de cinema.",
    href: "/servicos/restaurantes",
  },
  {
    src: "/media/logos/sports.png",
    label: "DESPORTO",
    desc: "Highlights, hype videos e fotografia de jogo — os teus atletas em movimento.",
    href: "/servicos/desporto",
  },
  {
    src: "/media/logos/realstate.png",
    label: "REAL ESTATE",
    desc: "Tours imobiliários, drone cinematic e walkthroughs de luxo que vendem em sessenta segundos.",
    href: "/servicos/real-estate",
  },
  {
    src: "/media/logos/travel.png",
    label: "TRAVEL",
    desc: "Hotéis, destinos e lifestyle — a experiência em loop cinematográfico.",
    href: "/servicos/travel",
  },
  {
    src: "/media/logos/corporate.png",
    label: "CORPORATE",
    desc: "Institucional, podcast, eventos e recrutamento — em registo afinado.",
    href: "/servicos/corporate",
  },
  {
    // Visual placeholder until a saúde logo é fornecido.
    src: "/media/logos/family.png",
    label: "SAÚDE & BEM-ESTAR",
    desc: "Procedimentos, testemunhos e branding clínico — com tom e confiança.",
    href: "/servicos/saude",
  },
  {
    src: "/media/logos/agency.png",
    label: "AGENCY",
    desc: "A casa criativa por trás dos nichos — comunicação 360, estratégica e cinematográfica.",
    href: "/manifesto",
  },
  {
    src: "/media/logos/producoes.png",
    label: "PRODUÇÕES",
    desc: "Produção audiovisual completa — do slate ao genérico final.",
    href: "/programa",
  },
];
