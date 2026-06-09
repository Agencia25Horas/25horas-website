"use client";

import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import Image from "next/image";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { useLang } from "@/lib/language-context";
import { NICHOS } from "@/lib/servicos";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export function VideosView({
  itemsByNiche,
}: {
  itemsByNiche: Record<string, SanityPortfolioItem[]>;
}) {
  const { t, tNiche } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      <section className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/media/nichos/portfolio.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-canvas-black/60" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.55) 80%, var(--canvas-black) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60">
                {t("portfolio.videos.eyebrow")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] whitespace-pre-line">
                {t("portfolio.videos.title")}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/85 max-w-2xl">
                {t("portfolio.videos.subtitle")}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {NICHOS.map((nicho, i) => {
        const items = itemsByNiche[nicho.slug] ?? [];
        const isLast = i === NICHOS.length - 1;
        const { label } = tNiche(nicho.slug);
        const accent = nicho.accentColor;

        return (
          <section
            key={nicho.slug}
            id={`videos-${nicho.slug}`}
            className={`px-6 md:px-16 py-16 md:py-20 ${
              isLast ? "" : "border-b border-canvas-white/10"
            }`}
            aria-label={`Vídeos ${label}`}
          >
            <div className="max-w-[1320px] mx-auto">
              <div className="mb-10 md:mb-14">
                <RevealOnScroll>
                  <h2
                    className="mt-3 font-display uppercase text-[clamp(2rem,4.5vw,3.5rem)] leading-[1]"
                    style={{ color: accent }}
                  >
                    {label}
                  </h2>
                </RevealOnScroll>
              </div>
              <PortfolioCarousel
                items={items}
                placeholderCount={6}
                emptyLabel={t("common.emBreve")}
                variant="grid"
              />
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
