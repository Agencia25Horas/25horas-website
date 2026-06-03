import { groq } from "next-sanity";

/** Devolve um nicho pelo slug + os seus 3 packs ordenados por tier. */
export const NICHE_BY_SLUG_QUERY = groq`*[_type == "niche" && slug == $slug][0]{
  _id,
  slug,
  code,
  label_pt, label_en,
  tagline_pt, tagline_en,
  accentColor,
  logoSrc,
  image,
  objective_pt, objective_en,
  taglineL1_pt, taglineL1_en,
  taglineL2_pt, taglineL2_en,
  whatsappText_pt, whatsappText_en,
  "packs": *[_type == "pack" && references(^._id)] | order(tier asc) {
    _id,
    tier,
    highlighted,
    subtitle_pt, subtitle_en,
    features[]{
      icon, accent,
      title_pt, title_en,
      desc_pt, desc_en
    }
  }
}`;

/** Lista todos os nichos por ordem. Usado para a home + navegação. */
export const ALL_NICHES_QUERY = groq`*[_type == "niche"] | order(order asc) {
  _id,
  slug,
  code,
  label_pt, label_en,
  tagline_pt, tagline_en,
  accentColor,
  logoSrc,
  image
}`;

/** Slugs apenas — para generateStaticParams. */
export const ALL_NICHE_SLUGS_QUERY = groq`*[_type == "niche"].slug`;

/** Portfolio items por nicho — capa, título, link e nicheSlug resolvidos. */
export const PORTFOLIO_BY_NICHE_QUERY = groq`*[_type == "portfolioItem" && niche->slug == $slug] | order(order asc, _createdAt desc) {
  _id,
  title_pt, title_en,
  "nicheSlug": niche->slug,
  "imageUrl": coverImage.asset->url,
  link,
  order,
  featured
}`;

/** Todos os portfolio items, com nicheSlug resolvido. Usado em /portfolio. */
export const PORTFOLIO_ALL_QUERY = groq`*[_type == "portfolioItem"] | order(order asc, _createdAt desc) {
  _id,
  title_pt, title_en,
  "nicheSlug": niche->slug,
  "imageUrl": coverImage.asset->url,
  link,
  order,
  featured
}`;

/** Singleton do conteúdo geral do site (hero da home, sobre, contactos). */
export const SITE_CONTENT_QUERY = groq`*[_type == "siteContent"][0]{
  homeHero_l1_pt, homeHero_l1_en,
  homeHero_l2_pt, homeHero_l2_en,
  homeHero_l3_pt, homeHero_l3_en,
  sobre_title_pt, sobre_title_en,
  sobre_subtitle_pt, sobre_subtitle_en,
  sobre_quemSomosBody_pt, sobre_quemSomosBody_en,
  sobre_comoTrabalhamosBody_pt, sobre_comoTrabalhamosBody_en,
  contact_email,
  contact_phone,
  contact_whatsapp,
  contact_address
}`;
