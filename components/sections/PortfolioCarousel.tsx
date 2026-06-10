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
        stopOnMouseEnter: true,
        // O default (true) regista um 'focusout' no container que REARRANCA o
        // auto-scroll incondicionalmente (ignora mouseIsOver). Como os cartões
        // são focáveis, trocar de vídeo disparava focusout no anterior → o
        // carrossel voltava a andar e nenhum clique o parava.
        stopOnFocusIn: false,
        // Deteta o hover no WRAPPER (pai do viewport do Embla) → inclui também as
        // SETAS, que vivem no wrapper fora do viewport. stopOnMouseEnter:true marca
        // o flag interno mouseIsOver → o clique (pointerUp) já NÃO volta a arrancar
        // o auto-scroll (era ISTO que o fazia continuar a andar).
        rootNode: (emblaRoot) => emblaRoot.parentElement,
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

  // O auto-scroll pára nativamente no hover (stopOnMouseEnter + rootNode acima) e
  // não retoma no clique. As setas só fazem scroll.
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // A partir do 1.º clique num trabalho o auto-scroll fica desligado DE VEZ:
  // o plugin tem caminhos internos que o rearrancam sozinhos (settle pós-drag,
  // mouseleave, reInit em resize) e todos ignoram que há um vídeo a tocar.
  const engagedRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const autoScroll = emblaApi.plugins().autoScroll;
    if (!autoScroll) return;
    const blockPlay = () => {
      // 'autoScroll:play' é emitido ANTES de o arranque ficar efetivo, por isso
      // um stop() síncrono seria ignorado; a microtask corre logo a seguir mas
      // ainda antes do timer interno (startDelay) do plugin.
      if (engagedRef.current) queueMicrotask(() => autoScroll.stop());
    };
    emblaApi.on("autoScroll:play", blockPlay);
    return () => {
      emblaApi.off("autoScroll:play", blockPlay);
    };
  }, [emblaApi]);

  const focusSlide = useCallback(
    (index: number) => {
      engagedRef.current = true;
      emblaApi?.plugins().autoScroll?.stop();
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  void canPrev;
  void canNext;

  if (count === 0) return null;

  // Slides com largura variável (grid) — duplicados se forem poucos.
  if (isGrid) {
    const loopItems = hasItems ? padForLoop(items) : [];
    return (
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex -ml-4 md:-ml-6">
            {hasItems
              ? loopItems.map((item, i) => (
                  <div key={`${item._id}-${i}`} className="flex-none pl-4 md:pl-6">
                    {item.mediaType === "foto" ? (
                      <PortfolioPhotoCard
                        item={item}
                        gridMode
                        onFocus={() => focusSlide(i)}
                      />
                    ) : (
                      <PortfolioCard
                        item={item}
                        gridMode
                        onFocus={() => focusSlide(i)}
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
          onClick={prev}          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
        >
          ←
        </button>
        <button
          type="button"
          aria-label={t("common.next")}
          onClick={next}          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
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
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex -ml-4 md:-ml-6">
          {hasItems
            ? loopItems.map((item, i) => (
                <div key={`${item._id}-${i}`} className={SLIDE_CLASS}>
                  {item.mediaType === "foto" ? (
                    <PortfolioPhotoCard item={item} onFocus={() => focusSlide(i)} />
                  ) : (
                    <PortfolioCard item={item} onFocus={() => focusSlide(i)} />
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
        onClick={prev}        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        ←
      </button>
      <button
        type="button"
        aria-label={t("common.next")}
        onClick={next}        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 items-center justify-center rounded-full bg-canvas-black/80 text-canvas-white text-xl hover:bg-canvas-black hover:scale-105 transition-all z-10"
      >
        →
      </button>

      <p className="md:hidden mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-canvas-white/50">
        {t("common.deslizar")}
      </p>
    </div>
  );
}
