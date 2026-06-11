"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useState } from "react";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { AccordionSlider } from "@/components/sections/AccordionSlider";
import { useLang } from "@/lib/language-context";
import { RESTAURANTES_CATEGORIES } from "@/lib/portfolio-photos";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export type PortfolioTab = "videos" | "fotografias" | "redes";

const TABS: { key: PortfolioTab; labelKey: string }[] = [
  { key: "videos", labelKey: "nav.videos" },
  { key: "fotografias", labelKey: "nav.fotografias" },
  { key: "redes", labelKey: "nav.redes" },
];

export function NichePortfolioView({
  slug,
  accent,
  heroImage,
  initialTab,
  videos,
  fotos,
  socials,
}: {
  slug: string;
  accent: string;
  heroImage: string;
  initialTab: PortfolioTab;
  videos: SanityPortfolioItem[];
  fotos: SanityPortfolioItem[];
  socials: SanityPortfolioItem[];
}) {
  const { t, tNiche } = useLang();
  const { label, tagline } = tNiche(slug);
  const [tab, setTab] = useState<PortfolioTab>(initialTab);
  const isRestaurantes = slug === "restaurantes";

  // Troca de tab sem navegação: actualiza só o ?tab= via replaceState (o "videos"
  // fica como URL limpo, sem query). Mantém o histórico do browser limpo.
  const selectTab = useCallback(
    (next: PortfolioTab) => {
      setTab(next);
      const url = next === "videos" ? `/portfolio/${slug}` : `/portfolio/${slug}?tab=${next}`;
      window.history.replaceState(null, "", url);
    },
    [slug],
  );

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      {/* Hero — foto do nicho + título na cor de marca */}
      <section className="relative w-full overflow-hidden h-[48svh] md:h-[56svh] flex items-end border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={heroImage}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-center grayscale contrast-125 brightness-90"
          />
          <div className="absolute inset-0 bg-canvas-black/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.6) 78%, var(--canvas-black) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 pb-10 md:pb-14">
          <div className="max-w-[1320px] mx-auto">
            <RevealOnScroll>
              <Link
                href="/portfolio"
                className="inline-flex items-center font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60 hover:text-canvas-white transition-colors mb-5"
              >
                {t("common.todosNichos")}
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.2em]"
                style={{ color: accent }}
              >
                {t("portfolio.eyebrow")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={140}>
              <h1
                className="mt-3 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                style={{ color: accent }}
              >
                {label}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <p className="mt-4 font-body text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-canvas-white/85 max-w-2xl">
                {tagline}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Tab bar — VÍDEOS / FOTOGRAFIAS / REDES SOCIAIS */}
      <section className="sticky top-16 md:top-[72px] z-30 bg-canvas-black/95 backdrop-blur-sm border-b border-canvas-white/10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-16">
          <div className="flex items-center gap-6 md:gap-10 overflow-x-auto" role="tablist">
            {TABS.map((tb) => {
              const active = tab === tb.key;
              return (
                <button
                  key={tb.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectTab(tb.key)}
                  className={`relative whitespace-nowrap py-4 md:py-5 font-body font-semibold text-[12px] md:text-[13px] uppercase tracking-wider transition-colors ${
                    active
                      ? "text-canvas-white"
                      : "text-canvas-white/45 hover:text-canvas-white/80"
                  }`}
                >
                  {t(tb.labelKey)}
                  <span
                    className="absolute left-0 right-0 bottom-0 h-[2px] rounded-full transition-opacity"
                    style={{
                      backgroundColor: accent,
                      opacity: active ? 1 : 0,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conteúdo da tab activa */}
      <section className="px-6 md:px-16 py-12 md:py-16 min-h-[40svh]">
        <div className="max-w-[1320px] mx-auto">
          {tab === "videos" && (
            <PortfolioCarousel
              items={videos}
              placeholderCount={6}
              emptyLabel={t("common.emBreve")}
              variant="grid"
            />
          )}

          {tab === "fotografias" &&
            (isRestaurantes ? (
              <AccordionSlider
                categories={RESTAURANTES_CATEGORIES}
                basePath={`/portfolio/${slug}/fotografias`}
              />
            ) : (
              <PortfolioCarousel
                items={fotos}
                placeholderCount={6}
                emptyLabel={t("common.emBreve")}
                variant="grid"
              />
            ))}

          {tab === "redes" &&
            (socials.length > 0 ? (
              <PortfolioCarousel items={socials} variant="grid" />
            ) : (
              <div className="rounded-xl border border-canvas-white/10 bg-canvas-white/[0.03] py-20 md:py-28 px-6 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/50">
                  {t("common.emBreve")}
                </p>
                <p className="mt-4 font-body text-[15px] leading-relaxed text-canvas-white/70 max-w-md mx-auto">
                  {t("portfolio.redes.vazio")}
                </p>
              </div>
            ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
