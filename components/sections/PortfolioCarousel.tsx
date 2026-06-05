"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

/**
 * Carrossel de portfolio com loop + auto-play subtil.
 *   Mobile = 1 slide (swipe) · Desktop = 3 slides (setas + drag).
 * Cada slide é um PortfolioCard, que mantém o comportamento:
 *   link → nova tab · sem link → lightbox.
 */
export function PortfolioCarousel({
  items,
}: {
  items: SanityPortfolioItem[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
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

  if (!items || items.length === 0) return null;

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex-[0_0_calc(100%-1rem)] md:flex-[0_0_calc(33.333%-1rem)] min-w-0"
            >
              <PortfolioCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Setas — só em desktop (mobile usa swipe) */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={prev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Seguinte"
        onClick={next}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        →
      </button>

      {/* Hint de swipe — só em mobile */}
      <p className="md:hidden mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-white/50">
        ← deslizar →
      </p>
    </div>
  );
}
