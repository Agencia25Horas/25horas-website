import { defineField, defineType } from "sanity";

/**
 * Portfolio item — capa + link (sem embeds frágeis).
 * O cliente faz upload da imagem de capa, escreve título PT/EN, escolhe nicho
 * e (opcional) cola um link para Instagram/YouTube/TikTok. Click no card abre
 * o link num separador novo.
 */
export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({
      name: "title_pt",
      title: "Título (PT)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title_en",
      title: "Título (EN)",
      type: "string",
    }),
    defineField({
      name: "niche",
      title: "Nicho",
      type: "reference",
      to: [{ type: "niche" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link (Instagram / YouTube / TikTok)",
      type: "url",
      description:
        "Opcional. Se preenchido, clicar na capa abre este link num separador novo.",
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Menor número aparece primeiro dentro do nicho.",
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      description: "Marcar como destaque na home do /portfolio.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title_pt",
      nicheLabel: "niche.label_pt",
      media: "coverImage",
    },
    prepare({ title, nicheLabel, media }) {
      return {
        title: title ?? "(sem título)",
        subtitle: nicheLabel ?? "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Ordem",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "_createdAt", direction: "desc" },
      ],
    },
  ],
});
