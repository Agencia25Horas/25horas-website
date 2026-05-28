import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk structure:
 *  • Niches (lista normal)
 *  • Packs (lista normal, agrupados por nicho via filter)
 *  • Portfolio Items (lista normal)
 *  • Conteúdo do site (singleton — 1 só documento)
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Nichos")
        .child(S.documentTypeList("niche").title("Nichos")),
      S.listItem()
        .title("Packs")
        .child(S.documentTypeList("pack").title("Packs")),
      S.listItem()
        .title("Portfolio")
        .child(S.documentTypeList("portfolioItem").title("Portfolio Items")),
      S.divider(),
      S.listItem()
        .title("Conteúdo do site")
        .id("siteContent")
        .child(
          S.document()
            .schemaType("siteContent")
            .documentId("siteContent")
            .title("Conteúdo do site"),
        ),
    ]);
