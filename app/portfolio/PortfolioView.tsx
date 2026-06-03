"use client";

import Image from "next/image";
import Link from "next/link";
import { TomatinoHeader } from "@/components/chrome/TomatinoHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { useLang } from "@/lib/language-context";
import { NICHOS } from "@/lib/servicos";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

export function PortfolioView({
  itemsByNiche,
}: {
  itemsByNiche: Record<string, SanityPortfolioItem[]>;
}) {
  const { lang, t, tNiche } = useLang();

  return (
    <main id="main" className="bg-canvas-black text-canvas-white">
      <TomatinoHeader />
      <div className="h-[104px] md:h-[112px]" />

      <section className="px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16">
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
        const hasContent = items.length > 0;
        const isLast = i === NICHOS.length - 1;
        const { label } = tNiche(nicho.slug);
        const accent = nicho.accentColor;

        return (
          <section
            key={nicho.slug}
            id={`portfolio-${nicho.slug}`}
            className={`px-6 md:px-12 py-16 md:py-20 ${
              isLast ? "" : "border-b border-canvas-white/10"
            }`}
            aria-label={`Portfolio ${label}`}
          >
            <div className="max-w-[1320px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
                <div>
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
                <RevealOnScroll delay={120}>
                  <Link
                    href={`/servicos/${nicho.slug}/portfolio`}
                    className="inline-flex items-center self-start font-mono text-[12px] uppercase tracking-[0.15em] text-canvas-white border-b pb-1 hover:opacity-60 transition-opacity"
                    style={{ borderColor: accent }}
                  >
                    {t("common.verTudo")}
                  </Link>
                </RevealOnScroll>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {hasContent
                  ? items.slice(0, 3).map((item) => (
                      <PortfolioCard
                        key={item._id}
                        item={item}
                        lang={lang}
                        accent={accent}
                      />
                    ))
                  : Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={`scaffold-${nicho.slug}-${idx}`}
                        className="relative aspect-[4/5] rounded-lg bg-canvas-white/5 border border-canvas-white/10 flex items-center justify-center"
                        aria-hidden
                      >
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/50">
                          {t("common.emBreve")} · {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </section>
        );
      })}

      <SiteFooter />
    </main>
  );
}

function PortfolioCard({
  item,
  lang,
  accent,
}: {
  item: SanityPortfolioItem;
  lang: "pt" | "en";
  accent: string;
}) {
  const title = (lang === "pt" ? item.title_pt : item.title_en) ?? item.title_pt ?? "";

  const card = (
    <figure className="space-y-3 group">
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-canvas-white/5">
        {item.imageUrl && (
          <Image
            src={item.imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      {title && (
        <figcaption className="font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/75 group-hover:text-canvas-white transition-colors">
          {title}
        </figcaption>
      )}
    </figure>
  );

  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded-lg"
        style={{ outlineColor: accent }}
        aria-label={title}
      >
        {card}
      </a>
    );
  }
  return card;
}
