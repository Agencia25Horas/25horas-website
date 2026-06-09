"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback, useEffect, useState } from "react";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import type { SanityPortfolioItem } from "@/lib/sanity/types";
import { useLang } from "@/lib/language-context";

const SLIDE_CLASS =
  "flex-[0_0_calc(100%-1rem)] md:flex-[0_0_calc(33.333%-1rem)] min-w-0";

/**
 * Carrossel de portfolio com scroll contínuo lento (marquee), loop infinito.
 *   Mobile = 1 slide (swipe) · Desktop = 3 slides (setas + drag).
 * Cada slide é um PortfolioCard, que mantém o comportamento:
 *   link → nova tab · sem link → lightbox.
 *
 * Quando ainda não há items, mostra `placeholderCount` slides "Em breve" a
 * rodar (loop demo) — para o carrossel já ter movimento antes de haver conteúdo.
 */
export function PortfolioCarousel({
  items,
  placeholderCount = 0,
  emptyLabel = "Em breve",
}: {
  items: SanityPortfolioItem[];
  /** Nº de slides "Em breve" a rodar quando não há items. 0 = não renderiza nada. */
  placeholderCount?: number;
  /** Texto dos placeholders (traduzido pelo chamador). */
  emptyLabel?: string;
}) {
  const { t } = useLang();
  const hasItems = items != null && items.length > 0;
  const count = hasItems ? items.length : placeholderCount;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [
      // Scroll contínuo lento (marquee), direita→esquerda, infinito.
      // speed baixo = devagarinho; não pausa sozinho (stopOn* a false).
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // canPrev/canNext mantêm-se p/ futuro (caso se desactive o loop). Com
  // loop=true ficam sempre true — referenciados aqui p/ não ficarem unused.
  void canPrev;
  void canNext;

  if (count === 0) return null;

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {hasItems
            ? items.map((item) => (
                <div key={item._id} className={SLIDE_CLASS}>
                  <PortfolioCard item={item} />
                </div>
              ))
            : Array.from({ length: placeholderCount }).map((_, idx) => (
                <div key={`ph-${idx}`} className={SLIDE_CLASS}>
                  <div
                    className="relative aspect-[4/5] rounded-lg bg-canvas-white/5 border border-canvas-white/10 flex items-center justify-center"
                    aria-hidden
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/50">
                      {emptyLabel} · {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Setas — só em desktop (mobile usa swipe) */}
      <button
        type="button"
        aria-label={t("common.prev")}
        onClick={prev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        ←
      </button>
      <button
        type="button"
        aria-label={t("common.next")}
        onClick={next}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        →
      </button>

      {/* Hint de swipe — só em mobile */}
      <p className="md:hidden mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-white/50">
        {t("common.deslizar")}
      </p>
    </div>
  );
}
