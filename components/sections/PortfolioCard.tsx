"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/language-context";
import { useAudio } from "@/lib/audio-context";
import type { SanityPortfolioItem } from "@/lib/sanity/types";

/**
 * Card de portfolio adaptável a vários tipos de média (campo `link` no Sanity):
 *   • YouTube / Vimeo → capa AUTO da thumbnail (se não houver capa manual) +
 *     clique abre o player no site (iframe, sem download).
 *   • Instagram       → clique abre o CARTÃO oficial do IG dentro do site
 *     (embed.js). Capa = a que o cliente fizer upload.
 *   • Outro link      → abre em nova tab.
 *   • Sem link        → lightbox da foto.
 * Tudo view-only (sem opção de download).
 */

type Media =
  | { kind: "youtube"; id: string; short: boolean }
  | { kind: "vimeo"; id: string }
  | { kind: "instagram"; url: string }
  | { kind: "external"; url: string }
  | null;

function parseMedia(link?: string): Media {
  if (!link) return null;
  const yt = link.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return { kind: "youtube", id: yt[1], short: /\/shorts\//.test(link) };
  const vimeo = link.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "vimeo", id: vimeo[1] };
  if (/instagram\.com\/(?:p|reel|reels|tv)\//.test(link))
    return { kind: "instagram", url: link.split("?")[0] };
  return { kind: "external", url: link };
}

const ytThumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export function PortfolioCard({
  item,
  gridMode = false,
  onFocus,
}: {
  item: SanityPortfolioItem;
  gridMode?: boolean;
  /** Chamado ao clicar — permite ao carousel centrar este slide. */
  onFocus?: () => void;
}) {
  const { lang, t } = useLang();
  const { duck } = useAudio();
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
  const media = parseMedia(item.link);

  // Capa: a manual (coverImage) tem prioridade; senão auto da thumbnail do YT.
  const cover =
    item.imageUrl ||
    (media?.kind === "youtube" ? ytThumb(media.id) : undefined);

  const isVideo = media?.kind === "youtube" || media?.kind === "vimeo";
  const isEmbed = isVideo || media?.kind === "instagram"; // abre modal no site
  const badge = isVideo ? "▶" : media?.kind === "instagram" ? "▶" : media ? "↗" : null;

  // ESC fecha o modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Instagram embed: processa o blockquote quando o modal abre.
  useEffect(() => {
    if (!open || media?.kind !== "instagram") return;
    const w = window as unknown as { instgrm?: { Embeds: { process: () => void } } };
    if (w.instgrm) {
      w.instgrm.Embeds.process();
    } else if (!document.getElementById("ig-embed-script")) {
      const s = document.createElement("script");
      s.id = "ig-embed-script";
      s.src = "https://www.instagram.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, [open, media]);

  // Duck da música de fundo enquanto o modal de vídeo está aberto (tem som).
  useEffect(() => {
    if (!open || !isVideo) return;
    duck(true);
    return () => duck(false);
  }, [open, isVideo, duck]);

  // Orientação: usa o campo explícito do item; fallback: shorts=vertical, resto=horizontal
  const ytShort = media?.kind === "youtube" && media.short;
  const isHorizontal =
    item.orientation === "horizontal" ||
    (item.orientation == null && !ytShort);

  // Grid: altura fixa + aspecto por orientação; fora da grid: 4:5.
  const cardCls = gridMode
    ? `shrink-0 h-[260px] md:h-[380px] xl:h-[527px] ${
        isHorizontal ? "aspect-video" : "aspect-[9/16]"
      }`
    : "aspect-[4/5]";
  const cardInner = (
    <div className={`relative ${cardCls} overflow-hidden rounded-lg bg-canvas-white/5 group`}>
      {cover ? (
        <Image
          src={cover}
          alt={title || t("common.trabalho")}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/40">
            {media?.kind === "instagram" ? "Instagram" : "—"}
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-canvas-black/85 via-canvas-black/30 to-transparent">
        {title && (
          <p className="font-display uppercase text-canvas-white text-[clamp(0.95rem,1.4vw,1.15rem)] leading-tight">
            {title}
          </p>
        )}
      </div>
      {badge && (
        <span
          aria-hidden
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-canvas-black/60 text-canvas-white text-[12px] backdrop-blur-sm group-hover:bg-canvas-black/80"
        >
          {badge}
        </span>
      )}
    </div>
  );

  // (A) Link externo simples (não-embed, ex.: TikTok/Twitter) → nova tab.
  if (media?.kind === "external") {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title || t("common.trabalho")} — ${t("common.abrir")}`}
        className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-canvas-white"
      >
        {cardInner}
      </a>
    );
  }

  // (B) Sem média embed e sem capa → card estático.
  if (!isEmbed && !cover) return cardInner;

  // (C) Vídeo (YT/Vimeo), Instagram, ou foto → abre modal/lightbox no site.
  return (
    <>
      <button
        type="button"
        onClick={() => { onFocus?.(); setOpen(true); }}
        aria-label={
          isVideo
            ? `${t("common.verVideo")}: ${title || t("common.trabalho")}`
            : media?.kind === "instagram"
              ? `${t("common.verInstagram")}: ${title || t("common.trabalho")}`
              : title || t("common.trabalho")
        }
        className="block w-full text-left rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-canvas-white"
      >
        {cardInner}
      </button>

      {open && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || t("common.trabalho")}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12 bg-canvas-black/95 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label={t("cookie.close")}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-canvas-white/10 text-canvas-white text-xl hover:bg-canvas-white/20"
          >
            ✕
          </button>

          <div
            className="relative w-full max-w-[1100px]"
            onClick={(e) => e.stopPropagation()}
          >
            {media?.kind === "youtube" && (
              <div
                className={`relative w-full overflow-hidden rounded-lg bg-black ${
                  ytShort
                    ? "max-w-[420px] mx-auto aspect-[9/16] max-h-[85vh]"
                    : "aspect-video"
                }`}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${media.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={title || t("cat.video")}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            )}

            {media?.kind === "vimeo" && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://player.vimeo.com/video/${media.id}?autoplay=1&dnt=1`}
                  title={title || t("cat.video")}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {media?.kind === "instagram" && (
              <div className="max-h-[85vh] overflow-auto flex justify-center">
                <blockquote
                  className="instagram-media"
                  data-instgrm-permalink={media.url}
                  data-instgrm-version="14"
                  style={{ background: "#fff", margin: 0, maxWidth: 540, width: "100%" }}
                />
              </div>
            )}

            {!media && cover && (
              <div className="relative w-full max-h-[85vh] aspect-[4/5]">
                <Image
                  src={cover}
                  alt={title || t("common.trabalho")}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  quality={90}
                  priority
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            )}
          </div>

          {title && (
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.2em] text-canvas-white/80">
              {title}
            </p>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
