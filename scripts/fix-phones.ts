/**
 * Fix pontual dos telefones no Sanity (documento `siteContent`).
 *
 * O seed antigo gravou números ERRADOS no dataset:
 *   contact_phone:    "+351 928 059 855"  →  "+351 912 707 015"
 *   contact_whatsapp: "351963869519"      →  "351912707015"
 *
 * A página /contactos lê o telefone do Sanity (siteContent.contact_phone),
 * por isso o site live mostra o número errado até isto correr.
 *
 * Correr UMA vez (precisa de SANITY_API_WRITE_TOKEN em .env.local, permissões
 * Editor ou superior):
 *   pnpm tsx scripts/fix-phones.ts
 *
 * Faz fetch + log do ANTES, depois patch.set() só dos 2 campos, e log do DEPOIS.
 * Não toca em mais nada.
 */

import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "Falta SANITY_API_WRITE_TOKEN em .env.local — gera em sanity.io/manage → API → Tokens (Editor+).",
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

const CORRECT = {
  contact_phone: "+351 912 707 015",
  contact_whatsapp: "351912707015",
};

async function main() {
  const before = await client.fetch(
    `*[_type == "siteContent"][0]{_id, contact_phone, contact_whatsapp}`,
  );

  if (!before?._id) {
    console.error("Nenhum documento siteContent encontrado — nada a corrigir.");
    process.exit(1);
  }

  console.log("ANTES :", {
    contact_phone: before.contact_phone,
    contact_whatsapp: before.contact_whatsapp,
  });

  const res = await client.patch(before._id).set(CORRECT).commit();

  console.log("DEPOIS:", {
    contact_phone: res.contact_phone,
    contact_whatsapp: res.contact_whatsapp,
  });
  console.log("✓ Telefone + WhatsApp corrigidos no documento siteContent.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
