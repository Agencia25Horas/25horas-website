"use client";

import Link from "next/link";
import Image from "next/image";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PortfolioCarousel } from "@/components/sections/PortfolioCarousel";
import { useLang } from "@/lib/language-context";
import type { PhotoCategory } from "@/lib/portfolio-photos";

export function CategoriaGalleryView({
  category,
  nicheSlug,
}: {
  category: PhotoCategory;
  nicheSlug: string;
}) {
  const { lang, tNiche } = useLang();
  const { label: nicheLabel } = tNiche(nicheSlug);

  const label =
    lang === "en" ? category.labelEn
    : lang === "es" ? category.labelEs
    : category.label;

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />

      {/* Hero */}
      <section className="relative w-full overflow-hidden h-[54svh] md:h-[60svh] flex items-center border-b border-canvas-white/10 pt-[104px] md:pt-[112px]">
        <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={category.cover}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-canvas-black/65" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.6) 80%, var(--canvas-black) 100%)",
            }}
          />
        </div>
        <div className="relative z-10 w-full px-6 md:px-16 py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto">
            <RevealOnScroll>
              <Link
                href={`/portfolio/${nicheSlug}?tab=fotografias`}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/50 hover:text-canvas-white/80 transition-colors mb-4"
              >
                ← {lang === "en" ? "Photography" : lang === "es" ? "Fotografía" : "Fotografia"}
              </Link>
            </RevealOnScroll>
            <RevealOnScroll delay={60}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/60">
                {lang === "en" ? "Portfolio" : lang === "es" ? "Portafolio" : "Portfólio"}
                {" · "}
                {lang === "en" ? "Photography" : lang === "es" ? "Fotografía" : "Fotografia"}
                {" · "}
                {nicheLabel}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                {label}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={180}>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/50">
                {category.count} {lang === "en" ? "photos" : lang === "es" ? "fotos" : "fotografias"}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Carrossel */}
      <section className="px-6 md:px-16 py-16 md:py-20">
        <div className="max-w-[1320px] mx-auto">
          <PortfolioCarousel
            items={category.items}
            placeholderCount={0}
            emptyLabel=""
            variant="grid"
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
