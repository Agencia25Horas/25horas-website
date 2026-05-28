/**
 * Seed Sanity com os dados estáticos de lib/packs.ts + lib/servicos.ts.
 *
 * Correr UMA vez após criar o projecto Sanity:
 *   1. Copia .env.local.example para .env.local e preenche
 *   2. Adiciona SANITY_API_WRITE_TOKEN (gera em sanity.io/manage → API → Tokens)
 *   3. pnpm seed
 *
 * É idempotente: se um documento já existir (pelo _id determinístico baseado
 * no slug), faz update em vez de criar duplicado.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { NICHOS } from "../lib/servicos";
import { PACKS_BY_NICHE } from "../lib/packs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Falta SANITY_API_WRITE_TOKEN em .env.local — gera em sanity.io/manage → API → Tokens (permissões Editor ou superior).",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

/** IDs determinísticos para idempotência (re-running não cria duplicados). */
const nicheId = (slug: string) => `niche-${slug}`;
const packId = (slug: string, tier: "A" | "B" | "C") => `pack-${slug}-${tier.toLowerCase()}`;

async function seedNiches() {
  console.log("→ Niches");
  const txn = client.transaction();
  for (let i = 0; i < NICHOS.length; i++) {
    const n = NICHOS[i];
    const sanityPacks = PACKS_BY_NICHE[n.slug];
    txn.createOrReplace({
      _id: nicheId(n.slug),
      _type: "niche",
      slug: n.slug,
      code: n.code,
      order: i,
      label_pt: n.label,
      label_en: n.label, // EN label vem do i18n; o cliente pode editar no studio
      tagline_pt: n.tagline,
      tagline_en: n.tagline, // idem
      accentColor: n.accentColor,
      logoSrc: sanityPacks.logoSrc,
      // Pack page config
      objective_pt: sanityPacks.objective.text.pt,
      objective_en: sanityPacks.objective.text.en,
      taglineL1_pt: sanityPacks.tagline.l1.pt,
      taglineL1_en: sanityPacks.tagline.l1.en,
      taglineL2_pt: sanityPacks.tagline.l2.pt,
      taglineL2_en: sanityPacks.tagline.l2.en,
      whatsappText_pt: sanityPacks.whatsappText.pt,
      whatsappText_en: sanityPacks.whatsappText.en,
    });
    console.log(`   ✓ ${n.slug}`);
  }
  await txn.commit();
}

async function seedPacks() {
  console.log("→ Packs");
  const txn = client.transaction();
  for (const n of NICHOS) {
    const pack = PACKS_BY_NICHE[n.slug];
    for (const p of pack.packs) {
      const tier = p.name.replace("PACK ", "") as "A" | "B" | "C";
      txn.createOrReplace({
        _id: packId(n.slug, tier),
        _type: "pack",
        niche: { _type: "reference", _ref: nicheId(n.slug) },
        tier,
        highlighted: p.highlighted ?? false,
        subtitle_pt: p.subtitle.pt,
        subtitle_en: p.subtitle.en,
        features: p.features.map((f, idx) => ({
          _key: `feat-${tier}-${idx}`,
          _type: "feature",
          icon: f.icon,
          accent: f.accent ?? false,
          title_pt: f.title.pt,
          title_en: f.title.en,
          desc_pt: f.desc.pt,
          desc_en: f.desc.en,
        })),
      });
      console.log(`   ✓ ${n.slug} · PACK ${tier}`);
    }
  }
  await txn.commit();
}

async function seedSiteContent() {
  console.log("→ Conteúdo do site (singleton)");
  await client.createOrReplace({
    _id: "siteContent",
    _type: "siteContent",
    // Hero da home
    homeHero_l1_pt: "AS HISTÓRIAS",
    homeHero_l1_en: "THE STORIES",
    homeHero_l2_pt: "SÃO DAS MARCAS.",
    homeHero_l2_en: "BELONG TO THE BRANDS.",
    homeHero_l3_pt: "AS IMAGENS SÃO NOSSAS.",
    homeHero_l3_en: "THE IMAGES ARE OURS.",
    // Sobre
    sobre_title_pt: "Cinema para marcas.",
    sobre_title_en: "Cinema for brands.",
    sobre_subtitle_pt:
      "Não fazemos vídeos. Fazemos filmes para marcas. 25 frames por segundo, 25 horas por dia.",
    sobre_subtitle_en:
      "We don't make videos. We make films for brands. 25 frames per second, 25 hours a day.",
    // Contactos
    contact_email: "agencia25horas@gmail.com",
    contact_phone: "+351 928 059 855",
    contact_whatsapp: "351963869519",
    contact_address:
      "Avenida da Siderurgia Nacional Nº1, Sala 105, 2840-075 Aldeia de Paio Pires",
  });
  console.log("   ✓ ok");
}

async function main() {
  console.log(`Sanity seed → project ${projectId}, dataset ${dataset}\n`);
  await seedNiches();
  await seedPacks();
  await seedSiteContent();
  console.log("\n✅ Seed completo. Vai a /studio para confirmar.");
}

main().catch((err) => {
  console.error("❌ Seed falhou:", err);
  process.exit(1);
});
