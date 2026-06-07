import { defineField, defineType } from "sanity";

/**
 * Singleton — textos gerais que aparecem na home / sobre / contactos.
 * Apenas um documento deste tipo deve existir (configurado em structure.ts).
 *
 * Phase 3 (próxima sessão) liga isto a /, /sobre, /contactos. Schema fica
 * definido agora para evitar trabalho duplicado depois.
 */
export const siteContent = defineType({
  name: "siteContent",
  title: "Conteúdo do site",
  type: "document",
  groups: [
    { name: "home", title: "Home (hero)" },
    { name: "sobre", title: "Sobre" },
    { name: "contactos", title: "Contactos" },
  ],
  fields: [
    /* HOME — hero */
    defineField({
      name: "homeHero_l1_pt",
      title: "Hero L1 (PT)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "homeHero_l1_en",
      title: "Hero L1 (EN)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "homeHero_l2_pt",
      title: "Hero L2 (PT)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "homeHero_l2_en",
      title: "Hero L2 (EN)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "homeHero_l3_pt",
      title: "Hero L3 (PT)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "homeHero_l3_en",
      title: "Hero L3 (EN)",
      type: "string",
      group: "home",
    }),

    /* SOBRE */
    defineField({
      name: "sobre_title_pt",
      title: "Sobre — Title (PT)",
      type: "string",
      group: "sobre",
    }),
    defineField({
      name: "sobre_title_en",
      title: "Sobre — Title (EN)",
      type: "string",
      group: "sobre",
    }),
    defineField({
      name: "sobre_subtitle_pt",
      title: "Sobre — Subtitle (PT)",
      type: "text",
      rows: 2,
      group: "sobre",
    }),
    defineField({
      name: "sobre_subtitle_en",
      title: "Sobre — Subtitle (EN)",
      type: "text",
      rows: 2,
      group: "sobre",
    }),
    defineField({
      name: "sobre_quemSomosBody_pt",
      title: "Quem somos — body (PT)",
      type: "text",
      rows: 4,
      group: "sobre",
    }),
    defineField({
      name: "sobre_quemSomosBody_en",
      title: "Quem somos — body (EN)",
      type: "text",
      rows: 4,
      group: "sobre",
    }),
    defineField({
      name: "sobre_comoTrabalhamosBody_pt",
      title: "Como trabalhamos — body (PT)",
      type: "text",
      rows: 4,
      group: "sobre",
    }),
    defineField({
      name: "sobre_comoTrabalhamosBody_en",
      title: "Como trabalhamos — body (EN)",
      type: "text",
      rows: 4,
      group: "sobre",
    }),

    /* CONTACTOS */
    defineField({
      name: "contact_email",
      title: "Email",
      type: "string",
      group: "contactos",
    }),
    defineField({
      name: "contact_phone",
      title: "Telefone",
      type: "string",
      group: "contactos",
    }),
    defineField({
      name: "contact_whatsapp",
      title: "WhatsApp (sem prefixo +, ex 351912707015)",
      type: "string",
      group: "contactos",
    }),
    defineField({
      name: "contact_address",
      title: "Morada",
      type: "text",
      rows: 2,
      group: "contactos",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Conteúdo do site" }),
  },
});
