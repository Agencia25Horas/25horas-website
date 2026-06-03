"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import { NICHOS } from "@/lib/servicos";

export function ServicosView() {
  const { t, tNiche } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl">
            <RevealOnScroll>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-type-dim">
                {t("servicos.eyebrow")}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={80}>
              <h1 className="mt-4 font-display uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-canvas-black">
                {t("servicos.title")}
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={160}>
              <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-type-neutral max-w-xl">
                {t("servicos.subtitle")}
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-24 md:pb-32">
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {NICHOS.map((nicho) => {
            const { label, tagline } = tNiche(nicho.slug);
            return (
              <Link
                key={nicho.slug}
                href={`/servicos/${nicho.slug}`}
                className="group block"
                aria-label={label}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-canvas-white/5">
                  <Image
                    src={nicho.image}
                    alt={`${label} — sub-marca 25 Horas Agency`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-type-dim">
                    {nicho.code} / {String(NICHOS.length).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display uppercase text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1] text-canvas-black">
                    {label}
                  </h2>
                  <p className="mt-1 font-body text-[14px] leading-snug text-type-neutral">
                    {tagline}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
