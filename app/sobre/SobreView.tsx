"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import { LOGOS } from "@/lib/logos";
import type { SanitySiteContent } from "@/lib/sanity/types";

export function SobreView({
  siteContent,
}: {
  siteContent: SanitySiteContent | null;
}) {
  const { t, tNiche, lang } = useLang();

  const pick = (
    pt: string | undefined,
    en: string | undefined,
    fallback: string,
  ) => ((lang === "pt" ? pt : en) || fallback);

  const title = pick(
    siteContent?.sobre_title_pt,
    siteContent?.sobre_title_en,
    t("sobre.title"),
  );
  const subtitle = pick(
    siteContent?.sobre_subtitle_pt,
    siteContent?.sobre_subtitle_en,
    t("sobre.subtitle"),
  );
  const quemSomosBody = pick(
    siteContent?.sobre_quemSomosBody_pt,
    siteContent?.sobre_quemSomosBody_en,
    t("sobre.quemSomosBody"),
  );
  const comoTrabalhamosBody = pick(
    siteContent?.sobre_comoTrabalhamosBody_pt,
    siteContent?.sobre_comoTrabalhamosBody_en,
    t("sobre.comoTrabalhamosBody"),
  );

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("sobre.eyebrow")}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <h1 className="mt-4 font-display uppercase text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-canvas-white">
              {title}
            </h1>
          </RevealOnScroll>
          <RevealOnScroll delay={160}>
            <p className="mt-10 font-body text-[clamp(1.15rem,1.6vw,1.4rem)] leading-relaxed text-canvas-white/85 max-w-3xl">
              {subtitle}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-12 pb-20 md:pb-28">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <RevealOnScroll>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("sobre.quemSomos")}
              </p>
              <h2 className="mt-3 font-display uppercase whitespace-pre-line text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-canvas-white">
                {t("sobre.quemSomosTitle")}
              </h2>
              <p className="mt-5 font-body text-[16px] leading-relaxed text-canvas-white/75">
                {quemSomosBody}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
                {t("sobre.comoTrabalhamos")}
              </p>
              <h2 className="mt-3 font-display uppercase whitespace-pre-line text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-canvas-white">
                {t("sobre.comoTrabalhamosTitle")}
              </h2>
              <p className="mt-5 font-body text-[16px] leading-relaxed text-canvas-white/75">
                {comoTrabalhamosBody}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-28 border-t border-canvas-white/15">
        <div className="max-w-[1320px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55">
              {t("sobre.sectoresEyebrow")}
            </p>
            <h2 className="mt-3 font-display uppercase text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-canvas-white">
              {t("sobre.sectoresTitle")}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <ul className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
              {LOGOS.map((logo) => {
                const niche = tNiche(logo.href.replace("/servicos/", ""));
                return (
                  <li key={logo.label}>
                    <Link
                      href={logo.href}
                      className="group block"
                      aria-label={niche.label}
                    >
                      <div className="relative aspect-[4/3] flex items-center justify-center p-4 md:p-6 rounded-lg bg-canvas-white/5 border border-canvas-white/10 group-hover:border-canvas-white/30 transition-colors">
                        <div className="relative w-full h-full">
                          <Image
                            src={logo.src}
                            alt={`${niche.label} — sub-marca 25 Horas Agency`}
                            fill
                            sizes="(min-width: 768px) 30vw, 45vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/55 group-hover:text-canvas-white transition-colors">
                        {niche.label}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </RevealOnScroll>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
