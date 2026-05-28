import { defineField, defineType } from "sanity";

/**
 * Niche document — um por sector (restaurantes, desporto, real-estate, etc).
 *
 * Junta:
 *   • metadata da identidade do nicho (label, tagline, cor, logo, hero img)
 *   • config da página de packs (hero, objectivo, tagline poética, WhatsApp)
 *
 * Tudo bilingue PT/EN via duplicação de campos (sufixo _pt / _en).
 */
export const niche = defineType({
  name: "niche",
  title: "Niche",
  type: "document",
  groups: [
    { name: "identity", title: "Identidade" },
    { name: "packPage", title: "Página de Packs" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "string",
      description: "ex: restaurantes, desporto, real-estate, travel, corporate, saude",
      validation: (Rule) => Rule.required(),
      group: "identity",
    }),
    defineField({
      name: "code",
      title: "Code (01-06)",
      type: "string",
      description: "Ordem display no website",
      validation: (Rule) => Rule.required(),
      group: "identity",
    }),
    defineField({
      name: "order",
      title: "Order (sort)",
      type: "number",
      group: "identity",
    }),
    defineField({
      name: "label_pt",
      title: "Label (PT)",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "label_en",
      title: "Label (EN)",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "tagline_pt",
      title: "Tagline (PT)",
      description: "Aparece nos cards da home",
      type: "text",
      rows: 2,
      group: "identity",
    }),
    defineField({
      name: "tagline_en",
      title: "Tagline (EN)",
      type: "text",
      rows: 2,
      group: "identity",
    }),
    defineField({
      name: "accentColor",
      title: "Accent Color (hex)",
      type: "string",
      description: "ex: #FED40D — cor de marca do sub-logo",
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/).error("Formato esperado: #RRGGBB"),
      group: "identity",
    }),
    defineField({
      name: "logoSrc",
      title: "Logo path (sub-marca b25)",
      type: "string",
      description: "Caminho em /public, ex: /media/logos/b25restaurantes.png",
      group: "identity",
    }),
    defineField({
      name: "image",
      title: "Hero image (deep page)",
      type: "image",
      options: { hotspot: true },
      group: "identity",
    }),

    /* ─── Página de Packs ─── */
    defineField({
      name: "objective_pt",
      title: "Objectivo (PT)",
      type: "text",
      rows: 2,
      description: "Linha curta no card 'Objetivo' da página",
      group: "packPage",
    }),
    defineField({
      name: "objective_en",
      title: "Objective (EN)",
      type: "text",
      rows: 2,
      group: "packPage",
    }),
    defineField({
      name: "taglineL1_pt",
      title: "Tagline L1 (PT)",
      type: "string",
      description: "Frase poética linha 1, ex: 'A sua marca.'",
      group: "packPage",
    }),
    defineField({
      name: "taglineL1_en",
      title: "Tagline L1 (EN)",
      type: "string",
      group: "packPage",
    }),
    defineField({
      name: "taglineL2_pt",
      title: "Tagline L2 (PT)",
      type: "string",
      description: "Frase poética linha 2 (em destaque com cor), ex: 'O nosso compromisso.'",
      group: "packPage",
    }),
    defineField({
      name: "taglineL2_en",
      title: "Tagline L2 (EN)",
      type: "string",
      group: "packPage",
    }),
    defineField({
      name: "whatsappText_pt",
      title: "WhatsApp pre-fill (PT)",
      type: "text",
      rows: 2,
      description: "Texto que aparece pre-preenchido quando o user carrega no botão WhatsApp",
      group: "packPage",
    }),
    defineField({
      name: "whatsappText_en",
      title: "WhatsApp pre-fill (EN)",
      type: "text",
      rows: 2,
      group: "packPage",
    }),
  ],
  preview: {
    select: { title: "label_pt", subtitle: "tagline_pt", media: "image" },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
