"use client";

import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { useLang } from "@/lib/language-context";
import { NICHOS } from "@/lib/servicos";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export function PortfolioView({
  itemsByNiche,
}: {
  itemsByNiche: Record<string, SanityPortfolioItem[]>;
}) {
  const { t, tNiche } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1320px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("portfolio.eyebrow")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white">
              {t("portfolio.title")}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/75 max-w-2xl">
              {t("portfolio.subtitle")}
            </p>
          </RevealOnScroll>
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
            id={`portfolio-${nicho.slug}`}
            className={`px-6 md:px-16 py-16 md:py-20 ${
              isLast ? "" : "border-b border-canvas-white/10"
            }`}
            aria-label={`Portfolio ${label}`}
          >
            <div className="max-w-[1320px] mx-auto">
              <div className="mb-10 md:mb-14">
                <RevealOnScroll>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {nicho.code} / {String(NICHOS.length).padStart(2, "0")}
                  </p>
                </RevealOnScroll>
                <RevealOnScroll delay={60}>
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
              />
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}
