"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import type { SanityPortfolioItem } from "@/lib/sanity/types";
import { useLang } from "@/lib/language-context";

/**
 * Card de fotografia no carrossel do portfólio.
 * Thumbnail clicável → abre lightbox fullscreen.
 * orientation="vertical"  → 9:16 (story)
 * orientation="horizontal" → 16:9 (landscape)
 */
export function PortfolioPhotoCard({
  item,
  gridMode = false,
  onFocus,
}: {
  item: SanityPortfolioItem;
  gridMode?: boolean;
  onFocus?: () => void;
}) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const title =
    (lang === "es"
      ? item.title_es ?? item.title_en
      : lang === "en"
        ? item.title_en
        : item.title_pt) ||
    item.title_pt ||
    "";

  const isHorizontal = item.orientation === "horizontal";
  const src = item.imageUrl ?? "";

  if (!src) return null;

  // ESC fecha o lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Grelha: caixa uniforme 3:4 para todas as fotos (object-cover centra e corta).
  // Lightbox: isHorizontal decide o aspect-ratio do container (object-contain mostra tudo).
  const wrapperCls = gridMode
    ? "shrink-0 h-[260px] md:h-[380px] xl:h-[527px] aspect-[3/4]"
    : isHorizontal
      ? "w-full aspect-video"
      : "w-full aspect-[3/4]";

  return (
    <>
      <button
        type="button"
        onClick={() => { onFocus?.(); setOpen(true); }}
        aria-label={title || "Ver fotografia"}
        className={`group relative ${wrapperCls} overflow-hidden rounded-xl bg-canvas-black cursor-pointer block transition-shadow duration-300 hover:shadow-[0_0_0_2px_rgba(255,255,255,0.15),0_16px_48px_rgba(0,0,0,0.6)]`}
      >
        <Image
          src={src}
          alt={title}
          fill
          sizes="(min-width: 1280px) 527px, (min-width: 768px) 380px, 260px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* Overlay escuro que some no hover */}
        <div className="pointer-events-none absolute inset-0 bg-canvas-black/20 group-hover:bg-canvas-black/0 transition-colors duration-300" />
        {title && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-canvas-black/80 via-canvas-black/20 to-transparent">
            <p className="font-display uppercase text-canvas-white text-[clamp(0.85rem,1.2vw,1rem)] leading-tight">
              {title}
            </p>
          </div>
        )}
      </button>

      {/* Portal para document.body — evita que o transform do Embla quebre
          position:fixed, que fica contido no container do carrossel sem portal */}
      {open && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Fotografia"}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-canvas-black/95 backdrop-blur-sm p-4 md:p-8"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-canvas-white/10 text-canvas-white text-xl hover:bg-canvas-white/20 transition-colors flex items-center justify-center"
          >
            ✕
          </button>

          <div
            className="relative w-full max-w-[1200px] max-h-[85vh]"
            style={{ aspectRatio: isHorizontal ? "16/9" : "3/4" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={title}
              fill
              sizes="95vw"
              className="object-contain"
              quality={90}
              priority
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          {title && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/70">
              {title}
            </p>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
