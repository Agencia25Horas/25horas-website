/**
 * Adapter — converte uma resposta do Sanity para o shape NichePack que o
 * NichePackView espera. Mantém o componente front-end inalterado: apenas a
 * fonte dos dados muda (Sanity ↔ lib/packs.ts).
 *
 * MODELO: o conteúdo ESTÁTICO (lib/packs.ts) é o default JÁ TRADUZIDO (PT/EN/ES);
 * o Sanity é um override POR-LÍNGUA. Cada campo cai para o estático quando a
 * língua respetiva está vazia no CMS — por isso o ES nunca mostra EN (o dataset
 * de produção só tem PT/EN; o ES vem do estático até o cliente o preencher).
 */

import type { NichePack, Pack, PackFeature, PackIcon } from "@/lib/packs";
import type { SanityNiche, SanityPack, SanityFeature } from "./types";

type Bi = { pt: string; en: string; es?: string };
const EMPTY_BI: Bi = { pt: "", en: "", es: "" };

/** Sanity override por-língua, com fallback para o estático (que tem ES). */
function bi(
  pt: string | undefined,
  en: string | undefined,
  es: string | undefined,
  fb: Bi = EMPTY_BI,
) {
  return {
    pt: pt || fb.pt || "",
    en: en || fb.en || pt || "",
    es: es || fb.es || en || fb.en || pt || "",
  };
}

function adaptFeature(f: SanityFeature, fb?: PackFeature): PackFeature {
  return {
    icon: (f.icon as PackIcon) || fb?.icon || "calendar",
    accent: f.accent ?? fb?.accent,
    title: bi(f.title_pt, f.title_en, f.title_es, fb?.title),
    desc: bi(f.desc_pt, f.desc_en, f.desc_es, fb?.desc),
  };
}

function adaptPack(p: SanityPack, fb?: Pack): Pack {
  return {
    name: `PACK ${p.tier}` as Pack["name"],
    subtitle: bi(p.subtitle_pt, p.subtitle_en, p.subtitle_es, fb?.subtitle),
    highlighted: p.highlighted ?? fb?.highlighted,
    features: (p.features ?? []).map((f, i) => adaptFeature(f, fb?.features[i])),
  };
}

/**
 * Converte um SanityNiche (com packs embedded) num NichePack completo, usando
 * o NichePack ESTÁTICO (`fb`) como fallback traduzido campo-a-campo.
 */
export function adaptSanityNiche(s: SanityNiche, fb: NichePack): NichePack {
  const packs = (s.packs ?? [])
    .slice()
    .sort((a, b) => a.tier.localeCompare(b.tier));
  const [a, b, c] = packs;
  // Se o Sanity não trouxer um pack, usa o estático (já com ES) por inteiro.
  const adapted: [Pack, Pack, Pack] = [
    a ? adaptPack(a, fb.packs[0]) : fb.packs[0],
    b ? adaptPack(b, fb.packs[1]) : fb.packs[1],
    c ? adaptPack(c, fb.packs[2]) : fb.packs[2],
  ];

  return {
    logoSrc: s.logoSrc || fb.logoSrc,
    // Partes partilhadas (hero, plano, mínimos, CTA) — já traduzidas no estático.
    hero: fb.hero,
    plano: fb.plano,
    packs: adapted,
    minimums: fb.minimums,
    objective: {
      eyebrow: fb.objective.eyebrow,
      text: bi(s.objective_pt, s.objective_en, s.objective_es, fb.objective.text),
    },
    tagline: {
      l1: bi(s.taglineL1_pt, s.taglineL1_en, s.taglineL1_es, fb.tagline.l1),
      l2: bi(s.taglineL2_pt, s.taglineL2_en, s.taglineL2_es, fb.tagline.l2),
    },
    ctaTitle: fb.ctaTitle,
    whatsappText: bi(
      s.whatsappText_pt,
      s.whatsappText_en,
      s.whatsappText_es,
      fb.whatsappText,
    ),
  };
}
