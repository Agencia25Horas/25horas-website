"use client";

import Image from "next/image";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
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
  saude: "/media/nichos/familyop.png", // slug "saude" = nicho FAMÍLIA
};

export function HomeView({
  siteContent,
  nichePhotos,
}: {
  siteContent: SanitySiteContent | null;
  /** Mapa slug → URL da foto do nicho (Sanity). Editável pelo cliente no Studio. */
  nichePhotos?: Record<string, string>;
}) {
  const { lang } = useLang();

  const pick = (pt: string | undefined, en: string | undefined) =>
    (lang === "pt" ? pt : en) ?? "";

  const heroL1 = pick(siteContent?.homeHero_l1_pt, siteContent?.homeHero_l1_en);
  const heroL2 = pick(siteContent?.homeHero_l2_pt, siteContent?.homeHero_l2_en);
  const heroL3 = pick(siteContent?.homeHero_l3_pt, siteContent?.homeHero_l3_en);
  const hasHeroText = Boolean(heroL1 || heroL2 || heroL3);

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      {/* ═══════════ 01 — HERO (logo + tagline opcional do Sanity) ═══════════ */}
      <section
        id="hero"
        className="relative w-full overflow-hidden min-h-[640px] md:min-h-[760px] flex items-start justify-center bg-canvas-black"
        aria-label="25 Horas Agency"
      >
        <div className="relative z-10 w-full flex flex-col items-center px-4 md:px-8 -mt-[60px]">
          <RevealOnScroll>
            <div className="relative w-[min(85vw,900px)] aspect-[3/2]">
              <Image
                src="/media/logos/b25agency.png"
                alt="25 Horas Agency"
                fill
                priority
                sizes="(min-width: 768px) 900px, 85vw"
                className="object-contain"
                quality={95}
              />
            </div>
          </RevealOnScroll>

          {hasHeroText && (
            <RevealOnScroll delay={140}>
              <div className="mt-2 md:mt-4 text-center max-w-3xl mx-auto">
                {heroL1 && (
                  <p className="font-display uppercase text-[clamp(1.25rem,2.4vw,1.875rem)] leading-tight text-canvas-white">
                    {heroL1}
                  </p>
                )}
                {heroL2 && (
                  <p className="font-display uppercase text-[clamp(1.25rem,2.4vw,1.875rem)] leading-tight text-canvas-white">
                    {heroL2}
                  </p>
                )}
                {heroL3 && (
                  <p className="mt-1 font-display uppercase text-[clamp(1rem,2vw,1.5rem)] leading-tight text-canvas-white/65">
                    {heroL3}
                  </p>
                )}
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

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
            />
          );
        })}
      </div>

      <SiteFooter />
    </main>
  );
}
