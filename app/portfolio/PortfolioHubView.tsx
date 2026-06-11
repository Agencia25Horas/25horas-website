"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import { NICHOS } from "@/lib/servicos";
import { STATIC_NICHE_PHOTOS } from "@/lib/niche-images";

export function PortfolioHubView() {
  const { t, tNiche } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      {/* Hero */}
      <section className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/media/nichos/portfolio.webp"
            alt=""
            fill
            sizes="100vw"
            priority
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
                {t("portfolio.eyebrow")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                {t("portfolio.title")}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-canvas-white/85 max-w-2xl">
                {t("portfolio.subtitle")}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Grelha de nichos */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {NICHOS.map((nicho, i) => {
              const { label, tagline } = tNiche(nicho.slug);
              const accent = nicho.accentColor;
              const img =
                STATIC_NICHE_PHOTOS[nicho.slug] ?? "/media/nichos/portfolio.webp";

              return (
                <RevealOnScroll key={nicho.slug} delay={(i % 4) * 70}>
                  <Link
                    href={`/portfolio/${nicho.slug}`}
                    aria-label={label}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-xl border border-canvas-white/10"
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      className="object-cover object-center grayscale contrast-125 brightness-90 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    {/* Overlay para legibilidade */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.35) 45%, transparent 70%)",
                      }}
                    />
                    {/* Barra de marca em cima */}
                    <span
                      aria-hidden
                      className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500"
                      style={{ backgroundColor: accent }}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p
                        className="font-mono text-[10px] uppercase tracking-[0.18em]"
                        style={{ color: accent }}
                      >
                        {nicho.code}
                      </p>
                      <h2
                        className="mt-1.5 font-display uppercase text-[clamp(1.25rem,2vw,1.75rem)] leading-[1]"
                        style={{ color: accent }}
                      >
                        {label}
                      </h2>
                      <p className="mt-2 font-body text-[13px] leading-snug text-canvas-white/70 line-clamp-2">
                        {tagline}
                      </p>
                      <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-canvas-white/0 group-hover:text-canvas-white/80 transition-colors duration-300">
                        {t("portfolio.hub.cta")}
                      </span>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
