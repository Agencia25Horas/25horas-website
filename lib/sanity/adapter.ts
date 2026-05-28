/**
 * Adapter — converte uma resposta do Sanity para o shape NichePack que o
 * NichePackView espera. Mantém o componente front-end inalterado: apenas a
 * fonte dos dados muda (Sanity ↔ lib/packs.ts).
 *
 * Partes partilhadas entre todos os nichos (hero "Gestão de Redes Sociais",
 * mínimos mensais, ctaTitle, plano badge) são hardcoded aqui — o cliente
 * não precisa de editar essas. Estão centralizadas em lib/packs.ts também.
 */

import type { NichePack, Pack, PackFeature, PackIcon } from "@/lib/packs";
import type { SanityNiche, SanityPack, SanityFeature } from "./types";

/** Defaults partilhados — mesmos valores que makeNichePack em lib/packs.ts. */
const SHARED = {
  hero: {
    titleL1: { pt: "Gestão de", en: "Social Media" },
    titleL2: { pt: "Redes Sociais", en: "Management" },
    subtitle: {
      pt: "Foco em marca. Resultados em vendas.",
      en: "Brand focus. Sales results.",
    },
    description: {
      pt: "Soluções completas para fortalecer a sua presença digital, através de conteúdo estratégico, criativo e consistente.",
      en: "Complete solutions to strengthen your digital presence through strategic, creative and consistent content.",
    },
  },
  plano: {
    l1: { pt: "Plano", en: "Monthly" },
    l2: { pt: "Mensal", en: "Plan" },
  },
  minimums: {
    eyebrow: {
      pt: "Conteúdo mínimo mensal · todos os packs",
      en: "Monthly minimum content · all packs",
    },
    items: [
      {
        icon: "calendar" as const,
        value: "15",
        label: { pt: "Posts no perfil", en: "Feed posts" },
      },
      {
        icon: "reel" as const,
        value: "4",
        label: { pt: "Reels por mês", en: "Reels per month" },
      },
      {
        icon: "plus" as const,
        value: "60",
        label: { pt: "Stories", en: "Stories" },
      },
    ],
  },
  ctaTitle: {
    pt: "Pronto para começar? Pede o teu pack.",
    en: "Ready to start? Get your pack.",
  },
  objectiveEyebrow: { pt: "Objetivo", en: "Objective" },
};

function bi(pt?: string, en?: string) {
  return { pt: pt ?? "", en: en ?? "" };
}

function adaptFeature(f: SanityFeature): PackFeature {
  return {
    icon: f.icon as PackIcon,
    accent: f.accent,
    title: bi(f.title_pt, f.title_en),
    desc: bi(f.desc_pt, f.desc_en),
  };
}

function adaptPack(p: SanityPack): Pack {
  return {
    name: `PACK ${p.tier}` as Pack["name"],
    subtitle: bi(p.subtitle_pt, p.subtitle_en),
    highlighted: p.highlighted,
    features: (p.features ?? []).map(adaptFeature),
  };
}

/**
 * Converte um SanityNiche (com packs embedded) num NichePack completo.
 * O logoSrc cai para o que vier do Sanity; o chamador é responsável por
 * fornecer um valor se Sanity não tiver.
 */
export function adaptSanityNiche(s: SanityNiche): NichePack {
  const packs = (s.packs ?? []).slice().sort((a, b) =>
    a.tier.localeCompare(b.tier),
  );
  // Garantir que temos exactamente 3 packs (Sanity pode ter menos durante setup)
  const [a, b, c] = packs;
  const adapted: Pack[] = [
    a ? adaptPack(a) : fallbackPack("A"),
    b ? adaptPack(b) : fallbackPack("B"),
    c ? adaptPack(c) : fallbackPack("C"),
  ];

  return {
    logoSrc: s.logoSrc ?? "",
    hero: SHARED.hero,
    plano: SHARED.plano,
    packs: [adapted[0], adapted[1], adapted[2]],
    minimums: SHARED.minimums,
    objective: {
      eyebrow: SHARED.objectiveEyebrow,
      text: bi(s.objective_pt, s.objective_en),
    },
    tagline: {
      l1: bi(s.taglineL1_pt, s.taglineL1_en),
      l2: bi(s.taglineL2_pt, s.taglineL2_en),
    },
    ctaTitle: SHARED.ctaTitle,
    whatsappText: bi(s.whatsappText_pt, s.whatsappText_en),
  };
}

function fallbackPack(tier: "A" | "B" | "C"): Pack {
  return {
    name: `PACK ${tier}`,
    subtitle: { pt: `(Pack ${tier} por configurar)`, en: `(Pack ${tier} pending)` },
    features: [],
  };
}
