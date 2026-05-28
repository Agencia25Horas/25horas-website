/**
 * Tipos das respostas do Sanity para as queries em queries.ts.
 * Mantidos manualmente — pequenos o suficiente para não precisar de codegen.
 */

import type { Image } from "sanity";

export type SanityFeature = {
  icon: "calendar" | "camera" | "pencil" | "studio" | "block" | "reel" | "plus";
  accent?: boolean;
  title_pt?: string;
  title_en?: string;
  desc_pt?: string;
  desc_en?: string;
};

export type SanityPack = {
  _id: string;
  tier: "A" | "B" | "C";
  highlighted?: boolean;
  subtitle_pt?: string;
  subtitle_en?: string;
  features?: SanityFeature[];
};

export type SanityNiche = {
  _id: string;
  slug: string;
  code: string;
  label_pt?: string;
  label_en?: string;
  tagline_pt?: string;
  tagline_en?: string;
  accentColor?: string;
  logoSrc?: string;
  image?: Image;
  objective_pt?: string;
  objective_en?: string;
  taglineL1_pt?: string;
  taglineL1_en?: string;
  taglineL2_pt?: string;
  taglineL2_en?: string;
  whatsappText_pt?: string;
  whatsappText_en?: string;
  packs?: SanityPack[];
};

export type SanityPortfolioItem = {
  _id: string;
  title_pt?: string;
  title_en?: string;
  nicheSlug?: string;
  imageUrl?: string;
  link?: string;
  order?: number;
  featured?: boolean;
};

export type SanitySiteContent = {
  homeHero_l1_pt?: string;
  homeHero_l1_en?: string;
  homeHero_l2_pt?: string;
  homeHero_l2_en?: string;
  homeHero_l3_pt?: string;
  homeHero_l3_en?: string;
  sobre_title_pt?: string;
  sobre_title_en?: string;
  sobre_subtitle_pt?: string;
  sobre_subtitle_en?: string;
  sobre_quemSomosBody_pt?: string;
  sobre_quemSomosBody_en?: string;
  sobre_comoTrabalhamosBody_pt?: string;
  sobre_comoTrabalhamosBody_en?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_whatsapp?: string;
  contact_address?: string;
};
