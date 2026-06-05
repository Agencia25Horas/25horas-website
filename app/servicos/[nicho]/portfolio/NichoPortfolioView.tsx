"use client";

import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { useLang } from "@/lib/language-context";
import { NICHOS, type Nicho } from "@/lib/servicos";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export function NichoPortfolioView({
  nicho,
  items,
}: {
  nicho: Nicho;
  items: SanityPortfolioItem[];
}) {
  const { t, tNiche } = useLang();
  const { label, tagline } = tNiche(nicho.slug);
  const accent = nicho.accentColor;

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-16 pt-12 md:pt-16 pb-10 md:pb-14">
        <div className="max-w-[1320px] mx-auto">
          <RevealOnScroll>
            <Link
              href={`/servicos/${nicho.slug}`}
              className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 hover:text-canvas-white transition-colors mb-6"
            >
              ← {label}
            </Link>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {t("portfolio.eyebrow")} · {nicho.code} / {String(NICHOS.length).padStart(2, "0")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={140}>
            <h1
              className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]"
              style={{ color: accent }}
            >
              {label}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={200}>
            <p className="mt-5 font-body text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-canvas-white/80 max-w-2xl">
              {tagline}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-16 pb-24 md:pb-32">
        <div className="max-w-[1320px] mx-auto">
          {items.length === 0 ? (
            <>
              <RevealOnScroll>
                <div className="mb-10 max-w-2xl">
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: accent }}
                  >
                    {t("portfolio.emConstrucao")}
                  </p>
                  <h2 className="mt-3 font-display uppercase text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1] text-canvas-white">
                    {t("portfolio.brevemente")} {label.toLowerCase()}.
                  </h2>
                  <p className="mt-4 font-body text-[15px] leading-relaxed text-canvas-white/70">
                    {t("portfolio.preparar")}
                  </p>
                </div>
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/5] rounded-lg bg-canvas-white/5 border border-canvas-white/10 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/50">
                      {t("common.emBreve")} · {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <PortfolioCarousel items={items} />
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
