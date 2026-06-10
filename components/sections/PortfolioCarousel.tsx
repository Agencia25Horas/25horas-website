"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback, useEffect, useRef, useState } from "react";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { PortfolioPhotoCard } from "@/components/sections/PortfolioPhotoCard";
import type { SanityPortfolioItem } from "@/lib/sanity/types";
import { useLang } from "@/lib/language-context";

// Embla padding-gap approach: container has negative margin-left = GAP,
// each slide has padding-left = GAP. This makes the loop seam get the
// same spacing as all other slide transitions (CSS gap does not).
const SLIDE_CLASS =
  "flex-[0_0_calc(100%-1rem)] md:flex-[0_0_33.333%] min-w-0 pl-4 md:pl-6";

// Embla precisa de slides suficientes para criar os clones do loop seamless.
// 8 é o mínimo seguro para que o loop não mostre uma costura visível.
const MIN_FOR_LOOP = 8;

function padForLoop(arr: SanityPortfolioItem[]): SanityPortfolioItem[] {
  if (arr.length === 0 || arr.length >= MIN_FOR_LOOP) return arr;
  const out: SanityPortfolioItem[] = [];
  while (out.length < MIN_FOR_LOOP) out.push(...arr);
  return out;
}

export function PortfolioCarousel({
  items,
  placeholderCount = 0,
  emptyLabel = "Em breve",
  variant = "carousel",
}: {
  items: SanityPortfolioItem[];
  placeholderCount?: number;
  emptyLabel?: string;
  variant?: "carousel" | "grid";
}) {
  const { t } = useLang();
  const hasItems = items != null && items.length > 0;
  const count = hasItems ? items.length : placeholderCount;
  const isGrid = variant === "grid";

  // containScroll: false é obrigatório para loop funcionar com slides de
  // largura variável (o "trimSnaps" padrão impede o loop seamless).
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      containScroll: false,
      align: "center",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false, // controlado manualmente no wrapper externo
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

  // Referência cacheada ao plugin AutoScroll — disponível imediatamente após
  // o emblaApi estar pronto, sem precisar de o re-resolver em cada evento.
  type ASPlugin = { play: () => void; stop: () => void };
  const asRef = useRef<ASPlugin | null>(null);
  useEffect(() => {
    if (!emblaApi) return;
    const plugins = emblaApi.plugins() as unknown as Record<string, ASPlugin>;
    asRef.current = plugins.autoScroll ?? null;
  }, [emblaApi]);

  const onWrapperEnter = useCallback(() => asRef.current?.stop(), []);
  const onWrapperLeave = useCallback(() => asRef.current?.play(), []);

  const prev = useCallback(() => {
    asRef.current?.stop();
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const next = useCallback(() => {
    asRef.current?.stop();
    emblaApi?.scrollNext();
  }, [emblaApi]);

  void canPrev;
  void canNext;

  if (count === 0) return null;

  // Slides com largura variável (grid) — duplicados se forem poucos.
  if (isGrid) {
    const loopItems = hasItems ? padForLoop(items) : [];
    return (
      <div
        className="relative"
        onMouseEnter={onWrapperEnter}
        onMouseLeave={onWrapperLeave}
      >
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex -ml-4 md:-ml-6">
            {hasItems
              ? loopItems.map((item, i) => (
                  <div key={`${item._id}-${i}`} className="flex-none pl-4 md:pl-6">
                    {item.mediaType === "foto" ? (
                      <PortfolioPhotoCard
                        item={item}
                        gridMode
                        onFocus={() => emblaApi?.scrollTo(i)}
                      />
                    ) : (
                      <PortfolioCard
                        item={item}
                        gridMode
                        onFocus={() => emblaApi?.scrollTo(i)}
                      />
                    )}
                  </div>
                ))
              : Array.from({ length: placeholderCount }).map((_, idx) => (
                  <div key={`ph-${idx}`} className="flex-none pl-4 md:pl-6">
                    <div
                      className="h-[260px] md:h-[380px] xl:h-[527px] aspect-[9/16] relative overflow-hidden rounded-xl bg-canvas-white/5 border border-canvas-white/10 flex items-center justify-center"
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

        <button
          type="button"
          aria-label={t("common.prev")}
          onClick={prev}
          onMouseEnter={onWrapperEnter}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={t("common.next")}
          onClick={next}
          onMouseEnter={onWrapperEnter}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
        >
          →
        </button>
        <p className="md:hidden mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-white/50">
          {t("common.deslizar")}
        </p>
      </div>
    );
  }

  // Slides de largura fixa (carousel standard, nicho pages) — também duplicados.
  const loopItems = hasItems ? padForLoop(items) : [];
  return (
    <div
      className="relative"
      onMouseEnter={onWrapperEnter}
      onMouseLeave={onWrapperLeave}
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 md:-ml-6">
          {hasItems
            ? loopItems.map((item, i) => (
                <div key={`${item._id}-${i}`} className={SLIDE_CLASS}>
                  {item.mediaType === "foto" ? (
                    <PortfolioPhotoCard item={item} onFocus={() => emblaApi?.scrollTo(i)} />
                  ) : (
                    <PortfolioCard item={item} onFocus={() => emblaApi?.scrollTo(i)} />
                  )}
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

      <button
        type="button"
        aria-label={t("common.prev")}
        onClick={prev}
        onMouseEnter={onWrapperEnter}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        ←
      </button>
      <button
        type="button"
        aria-label={t("common.next")}
        onClick={next}
        onMouseEnter={onWrapperEnter}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        →
      </button>

      <p className="md:hidden mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-white/50">
        {t("common.deslizar")}
      </p>
    </div>
  );
}
