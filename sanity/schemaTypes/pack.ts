import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Pack document — uma tier (A/B/C) por nicho.
 * Cada nicho tem 3 packs (Premium, Profissional, Base).
 * Features (4 por pack) são um array de objects embedded.
 */
export const pack = defineType({
  name: "pack",
  title: "Pack",
  type: "document",
  fields: [
    defineField({
      name: "niche",
      title: "Niche",
      type: "reference",
      to: [{ type: "niche" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tier",
      title: "Tier",
      type: "string",
      options: {
        list: [
          { title: "PACK A (Premium + Estúdio)", value: "A" },
          { title: "PACK B (Profissional)", value: "B" },
          { title: "PACK C (Base)", value: "C" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted (border accent + badge cor)",
      type: "boolean",
      initialValue: false,
      description: "Tipicamente apenas o PACK A",
    }),
    defineField({
      name: "subtitle_pt",
      title: "Subtitle (PT)",
      type: "string",
      description: "ex: 'Gestão Premium\\n+ Estúdio' (usar \\n para quebra)",
    }),
    defineField({
      name: "subtitle_en",
      title: "Subtitle (EN)",
      type: "string",
    }),
    defineField({
      name: "subtitle_es",
      title: "Subtitle (ES)",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "feature",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "📅 Calendar", value: "calendar" },
                  { title: "📷 Camera", value: "camera" },
                  { title: "✏️ Pencil", value: "pencil" },
                  { title: "🎬 Studio", value: "studio" },
                  { title: "🚫 Block (no studio)", value: "block" },
                  { title: "🎞️ Reel", value: "reel" },
                  { title: "➕ Plus", value: "plus" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "accent",
              title: "Accent (destacar com cor do nicho)",
              type: "boolean",
              initialValue: false,
              description: "Tipicamente o feature do estúdio no PACK A",
            }),
            defineField({
              name: "title_pt",
              title: "Title (PT)",
              type: "string",
            }),
            defineField({
              name: "title_en",
              title: "Title (EN)",
              type: "string",
            }),
            defineField({
              name: "title_es",
              title: "Title (ES)",
              type: "string",
            }),
            defineField({
              name: "desc_pt",
              title: "Description (PT)",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "desc_en",
              title: "Description (EN)",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "desc_es",
              title: "Description (ES)",
              type: "text",
              rows: 2,
            }),
          ],
          preview: {
            select: { title: "title_pt", subtitle: "desc_pt", icon: "icon" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      tier: "tier",
      nicheLabel: "niche.label_pt",
      highlighted: "highlighted",
    },
    prepare({ tier, nicheLabel, highlighted }) {
      return {
        title: `${nicheLabel ?? "?"} · PACK ${tier ?? "?"}`,
        subtitle: highlighted ? "★ Highlighted" : "",
      };
    },
  },
});
