"use client";

import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { HeroReel } from "@/components/sections/HeroReel";
import { NichoBlock } from "@/components/sections/NichoBlock";
import { useLang } from "@/lib/language-context";
import { LOGOS } from "@/lib/logos";
import { NICHOS } from "@/lib/servicos";
import type { SanitySiteContent } from "@/lib/sanity/types";

/** Fotos de fundo (depth) estáticas por nicho — fallback quando o nicho não
 *  tem foto no Sanity. O cliente pode sobrepor qualquer uma no Studio. */
const STATIC_NICHE_PHOTOS: Record<string, string> = {
  restaurantes: "/media/nichos/restauranteop.jpeg",
  desporto: "/media/nichos/desportoop.jpg",
  "real-estate": "/media/nichos/realestateop.jpg",
  travel: "/media/nichos/travelop.png",
  corporate: "/media/nichos/corporateop.png",
  saude: "/media/nichos/familyop.png", // slug "saude" = nicho FAMÍLIA
  "saude-bem-estar": "/media/nichos/saudeop.png", // slug "saude-bem-estar" = nicho SAÚDE
  educacao: "/media/nichos/testeop.png",
};

/** Afinações de enquadramento da foto depth por nicho (override dos defaults do
 *  NichoBlock). Sem entrada = default object-[center_30%] md:object-center.
 *  As object-[X%_30%] md:object-center deslocam o sujeito na horizontal SÓ em
 *  mobile (no desktop volta a centrar). overscan menor = foto um pouco menor. */
const NICHE_PHOTO_TUNING: Record<
  string,
  {
    position?: string;
    overscan?: number;
    zoom?: number;
    fit?: "cover" | "contain";
  }
> = {
  saude: { position: "object-top", overscan: 0, zoom: 1 }, // FAMÍLIA — cabeças visíveis
  educacao: { overscan: 6, zoom: 1.06 }, // zoom-out ligeiro
  travel: { position: "object-[54%_30%] md:object-center", overscan: 8 }, // mobile: sujeito p/ esquerda + menor
  "saude-bem-estar": {
    position: "object-[47%_30%] md:object-center",
    overscan: 8,
  }, // mobile: sujeito p/ direita + menor
};

export function HomeView({
  siteContent,
  nichePhotos,
}: {
  siteContent: SanitySiteContent | null;
  /** Mapa slug → URL da foto do nicho (Sanity). Editável pelo cliente no Studio. */
  nichePhotos?: Record<string, string>;
}) {
  const { lang, t } = useLang();

  // O Sanity é um override por-língua. Se faltar a língua atual (ex.: ES ainda
  // não preenchido no CMS) cai para a tradução ESTÁTICA do i18n — nunca para
  // outra língua (era isso que mostrava inglês no modo espanhol).
  const pick = (
    pt: string | undefined,
    en: string | undefined,
    es: string | undefined,
    key: string,
  ) => (lang === "es" ? es : lang === "en" ? en : pt) || t(key);

  const heroL1 = pick(
    siteContent?.homeHero_l1_pt,
    siteContent?.homeHero_l1_en,
    siteContent?.homeHero_l1_es,
    "home.hero.title.l1",
  );
  const heroL2 = pick(
    siteContent?.homeHero_l2_pt,
    siteContent?.homeHero_l2_en,
    siteContent?.homeHero_l2_es,
    "home.hero.title.l2",
  );
  const heroL3 = pick(
    siteContent?.homeHero_l3_pt,
    siteContent?.homeHero_l3_en,
    siteContent?.homeHero_l3_es,
    "home.hero.title.l3",
  );

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      {/* H1 para SEO/leitores de ecrã — o herói é o reel de vídeo. */}
      <h1 className="sr-only">
        25 Horas Agency — cinema para marcas em Lisboa
      </h1>

      {/* ═══════════ 01 — HERO REEL (vídeo por nicho + logo + som no hover) ═══════════ */}
      <HeroReel heroLines={[heroL1, heroL2, heroL3].filter(Boolean)} />

      {/* ═══════════ 02-07 — SEIS NICHOS ═══════════ */}
      <div id="nichos">
        {NICHOS.map((nicho, i) => {
          const logo = LOGOS.find(
            (l) => l.href === `/servicos/${nicho.slug}`,
          );
          return (
            <NichoBlock
              key={nicho.slug}
              nicho={nicho}
              logo={logo}
              alignment={i % 2 === 0 ? "text-left" : "text-right"}
              photoSrc={
                nichePhotos?.[nicho.slug] ?? STATIC_NICHE_PHOTOS[nicho.slug]
              }
              photoPosition={NICHE_PHOTO_TUNING[nicho.slug]?.position}
              photoOverscan={NICHE_PHOTO_TUNING[nicho.slug]?.overscan}
              photoZoom={NICHE_PHOTO_TUNING[nicho.slug]?.zoom}
              photoFit={NICHE_PHOTO_TUNING[nicho.slug]?.fit}
            />
          );
        })}
      </div>

      <SiteFooter />
    </main>
  );
}
