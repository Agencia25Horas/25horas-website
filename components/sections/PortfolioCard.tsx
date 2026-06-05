"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/language-context";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

/**
 * Card de portfolio reutilizável (home /portfolio + deep /servicos/[nicho]/portfolio).
 * Dois comportamentos:
 *   (A) item COM link → abre o link em nova tab (target=_blank, rel=noopener noreferrer)
 *   (B) item SEM link → abre a imagem grande num lightbox (ESC ou clique fora fecham)
 *
 * Nota: o codebase resolve a capa em `imageUrl` (string, via coverImage.asset->url),
 * por isso usamos Next/Image com `imageUrl` — otimiza tanto para o card como para o
 * lightbox (sizes maiores → versão de maior resolução).
 */
export function PortfolioCard({ item }: { item: SanityPortfolioItem }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  const title =
    (lang === "pt" ? item.title_pt : item.title_en) || item.title_pt || "";
  const imgUrl = item.imageUrl;

  // ESC fecha o lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cardInner = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-canvas-white/5 group">
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={title || "Portfolio"}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-canvas-black/85 via-canvas-black/30 to-transparent">
        {title && (
          <p className="font-display uppercase text-canvas-white text-[clamp(0.95rem,1.4vw,1.15rem)] leading-tight">
            {title}
          </p>
        )}
      </div>
      {item.link && (
        <span
          aria-hidden
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-canvas-black/60 text-canvas-white text-[12px] backdrop-blur-sm group-hover:bg-canvas-black/80"
        >
          ↗
        </span>
      )}
    </div>
  );

  // (A) Tem link → abre fora em nova tab
  if (item.link) {
    const platform =
      item.link
        .match(/(instagram|youtube|tiktok|facebook|vimeo)/i)?.[0]
        ?.toLowerCase() ?? "external";
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title || "Trabalho"} — abrir em ${platform}`}
        className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-canvas-white"
      >
        {cardInner}
      </a>
    );
  }

  // Sem link e sem imagem → card estático (nada para abrir)
  if (!imgUrl) return cardInner;

  // (B) Sem link → lightbox para ver a imagem grande
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver ${title || "trabalho"} em tamanho grande`}
        className="block w-full text-left rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-canvas-white"
      >
        {cardInner}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || "Trabalho"}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-canvas-black/95 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-canvas-white/10 text-canvas-white text-xl hover:bg-canvas-white/20"
          >
            ✕
          </button>
          <div className="relative w-full max-w-[1400px] aspect-[4/5] max-h-[85vh]">
            <Image
              src={imgUrl}
              alt={title || "Trabalho"}
              fill
              sizes="90vw"
              className="object-contain"
              quality={90}
              priority
            />
          </div>
          {title && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/80">
              {title}
            </p>
          )}
        </div>
      )}
    </>
  );
}
