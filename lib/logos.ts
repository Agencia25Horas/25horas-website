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
    src: "/media/logos/b25restaurantes.png",
    label: "RESTAURANTES",
    desc: "Reels gastronómicos, chef videos, drone cinematic.",
    href: "/servicos/restaurantes",
  },
  {
    src: "/media/logos/b25sports.png",
    label: "DESPORTO",
    desc: "Highlights, hype videos e fotografia de jogo.",
    href: "/servicos/desporto",
  },
  {
    src: "/media/logos/b25realstate.png",
    label: "REAL STATE",
    desc: "Tours imobiliários, drone cinematic, walkthroughs.",
    href: "/servicos/real-estate",
  },
  {
    src: "/media/logos/b25travel.png",
    label: "TRAVEL",
    desc: "Hotéis, destinos e lifestyle em loop cinematográfico.",
    href: "/servicos/travel",
  },
  {
    src: "/media/logos/b25corporate.png",
    label: "CORPORATE",
    desc: "Institucional, podcast, eventos e recrutamento.",
    href: "/servicos/corporate",
  },
  {
    src: "/media/logos/b25family.png",
    label: "FAMÍLIA",
    desc: "Pais, filhos e momentos — em forma de cinema.",
    href: "/servicos/saude",
  },
  {
    src: "/media/logos/25saude.png",
    label: "SAÚDE",
    desc: "Clínicas, profissionais e procedimentos — em registo de confiança.",
    href: "/servicos/saude-bem-estar",
  },
  {
    src: "/media/logos/25education.png",
    label: "EDUCAÇÃO",
    desc: "Escolas, formadores e conhecimento — em forma de cinema.",
    href: "/servicos/educacao",
  },
];
