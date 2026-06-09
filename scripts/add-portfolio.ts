/**
 * Adiciona itens de portfólio ao Sanity (idempotente via _id fixo).
 *
 *   npx tsx scripts/add-portfolio.ts
 *
 * Para acrescentar trabalhos: junta linhas a ITEMS (slug = slug do nicho:
 * restaurantes, desporto, real-estate, travel, corporate, saude,
 * saude-bem-estar, educacao). O `link` pode ser YouTube, Shorts, Vimeo, etc.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const ITEMS: { id: string; slug: string; link: string }[] = [
  {
    id: "portfolio-restaurantes-1",
    slug: "restaurantes",
    link: "https://www.youtube.com/shorts/o4kIVyRa4Fg",
  },
  {
    id: "portfolio-restaurantes-2",
    slug: "restaurantes",
    link: "https://www.youtube.com/watch?v=84iBKOrEAfY",
  },
  {
    id: "portfolio-corporate-1",
    slug: "corporate",
    link: "https://www.youtube.com/shorts/FHkPl6cFOtU",
  },
];

async function main() {
  const txn = client.transaction();
  ITEMS.forEach((it, i) =>
    txn.createOrReplace({
      _id: it.id,
      _type: "portfolioItem",
      niche: { _type: "reference", _ref: `niche-${it.slug}` },
      title_pt: "",
      title_en: "",
      title_es: "",
      link: it.link,
      order: i,
      featured: true,
    }),
  );
  await txn.commit();
  console.log(`✓ ${ITEMS.length} itens criados/atualizados`);

  // Verificação: as referências resolvem para o slug certo?
  const check = await client.fetch(
    `*[_type=="portfolioItem"]{_id, "ns": niche->slug, link} | order(_id)`,
  );
  console.log("Verificação:", JSON.stringify(check, null, 2));
}

main().catch((e) => {
  console.error("❌", e);
  process.exit(1);
});
