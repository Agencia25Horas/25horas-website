"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { useAudio } from "@/lib/audio-context";

const VIDEOS = [
  { src: "/hero/1realestate.mp4", poster: "/hero/1realestate.jpg" },
  { src: "/hero/1restaurante.mp4", poster: "/hero/1restaurante.jpg" },
  { src: "/hero/1desporto.mp4", poster: "/hero/1desporto.jpg" },
  { src: "/hero/1educ.mp4", poster: "/hero/1educ.jpg" },
];
const N = VIDEOS.length;
const FADE_MS = 600; // fade de áudio + grayscale
const XFADE_MS = 500; // crossfade entre vídeos
const VIDEO_PARALLAX = 0.12; // depth do vídeo (fundo, move devagar)
const LOGO_PARALLAX = 0.3; // depth do logo (move mais → proximidade)
const OVERSCAN = 24; // % que a camada de vídeo estica além do hero (sem gap)

const SpeakerOn = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
  </svg>
);
const SpeakerOff = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
    <path d="M3 9v6h4l5 5V4L7 9H3zm18.3-.7-1.4-1.4L17 9.8 14.2 7l-1.4 1.4L15.6 11l-2.8 2.8 1.4 1.4L17 12.4l2.8 2.8 1.4-1.4L18.4 11l2.9-2.7z" />
  </svg>
);
const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M15 19l-7-7 7-7" />
  </svg>
);
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
const arrowCls =
  "absolute z-20 top-[44svh] -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full border border-canvas-white/40 bg-canvas-black/40 backdrop-blur-sm text-canvas-white hover:bg-canvas-black/70 transition-colors";

export function HeroReel({
  logoSrc = "/media/logos/b25agency.webp",
  heroLines = [],
}: {
  logoSrc?: string;
  heroLines?: string[];
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const { duck } = useAudio();

  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const refOf = useCallback(
    (slot: 0 | 1) => (slot === 0 ? v0.current : v1.current),
    [],
  );
  const parallaxRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const [slots, setSlots] = useState<[number, number]>([0, 1]);
  const [front, setFront] = useState<0 | 1>(0);
  // `muted` = o botão de som está em mute. SSR-safe: começa mudo, ajustado no
  // mount (desktop → som permitido + GATED PELO HOVER; mobile → mudo até tap).
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [fbIdx, setFbIdx] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  // espelhos para os handlers (evita closures obsoletos)
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const hoveringRef = useRef(hovering);
  hoveringRef.current = hovering;
  const frontRef = useRef(front);
  frontRef.current = front;
  const hasHoverRef = useRef(hasHover);
  hasHoverRef.current = hasHover;
  const transitioning = useRef(false);
  const fadeRaf = useRef<number | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  // Desktop: cor segue o hover (b&w por defeito, cor ao passar o rato — mesmo
  // em mute). Mobile (sem hover): SEMPRE com cor, nunca fica cinzento.
  const colorOn = !hasHover || hovering;

  // ── fade de áudio (helper) ──────────────────────────────────────
  const fadeAudio = useCallback(
    (el: HTMLVideoElement | null, target: number, duration: number) => {
      if (!el) return;
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      const start = el.volume;
      const t0 = performance.now();
      if (target > 0) el.muted = false;
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        el.volume = start + (target - start) * t;
        if (t < 1) fadeRaf.current = requestAnimationFrame(tick);
        else {
          fadeRaf.current = null;
          if (target === 0) el.muted = true;
        }
      };
      fadeRaf.current = requestAnimationFrame(tick);
      // GARANTIA do estado final mesmo que o rAF seja throttled (tab em
      // background, etc.) — sem isto o som podia continuar após o hover-out.
      fadeTimer.current = window.setTimeout(() => {
        el.volume = target;
        el.muted = target === 0;
      }, duration + 60);
    },
    [],
  );

  // Caminho ÚNICO do áudio do vídeo da frente:
  //   • em mute → sempre calado;
  //   • desktop → segue o hover (em cima = som, fora = mute);
  //   • mobile (sem hover) → ligado (o botão é o único controlo).
  const applyAudio = useCallback(() => {
    const fv = refOf(frontRef.current);
    if (!fv) return;
    const target = mutedRef.current
      ? 0
      : hasHoverRef.current
        ? hoveringRef.current
          ? 1
          : 0
        : 1;
    fadeAudio(fv, target, FADE_MS);
  }, [refOf, fadeAudio]);

  // ── ducking: quando o vídeo tem som, baixa a música de fundo do site ──
  const videoAudible = !muted && (hasHover ? hovering : true);
  useEffect(() => {
    duck(videoAudible);
  }, [videoAudible, duck]);
  useEffect(() => () => duck(false), [duck]); // repõe ao desmontar

  // ── arranque + deteção de capacidades ───────────────────────────
  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      !!conn &&
      (conn.saveData === true ||
        ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? ""));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (slow || reduce) {
      setFallback(true);
      return;
    }
    const hh = window.matchMedia("(hover: hover)").matches;
    setHasHover(hh);
    hasHoverRef.current = hh;
    // desktop: som permitido (mas só toca no hover). mobile: mudo até tap.
    setMuted(!hh);
    mutedRef.current = !hh;
    const fv = refOf(0);
    if (fv) {
      fv.muted = true;
      fv.play().catch(() => {});
    }
    return () => {
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [refOf]);

  // ciclo de posters no modo fallback
  useEffect(() => {
    if (!fallback) return;
    const id = setInterval(() => setFbIdx((i) => (i + 1) % N), 5000);
    return () => clearInterval(id);
  }, [fallback]);

  // ── depth/parallax no scroll (sem GSAP — leve) ──────────────────
  useEffect(() => {
    if (fallback) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const vh = window.innerHeight || 1;
        const vid = parallaxRef.current;
        const logo = logoRef.current;
        if (vid) vid.style.transform = `translate3d(0,${y * VIDEO_PARALLAX}px,0)`;
        if (logo) {
          const p = Math.min(1, Math.max(0, (y / vh - 0.5) / 0.5));
          logo.style.transform = `translate3d(0,${y * LOGO_PARALLAX}px,0)`;
          logo.style.opacity = String(1 - p * 0.4); // 1 → 0.6 após 50%
        }
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fallback]);

  // ── crossfade para um vídeo qualquer (próximo, anterior, ou índice) ──
  const crossfadeTo = useCallback(
    (targetIdx: number) => {
      if (transitioning.current) return;
      transitioning.current = true;
      const cur = frontRef.current;
      const nxt = (cur === 0 ? 1 : 0) as 0 | 1;
      const oldVideo = refOf(cur);
      const nextVideo = refOf(nxt);
      if (oldVideo) oldVideo.muted = true; // corta JÁ o áudio do que sai
      if (nextVideo) {
        // se o slot livre não tinha este vídeo pré-carregado (ex.: anterior),
        // troca a fonte e carrega; se já o tinha (próximo), arranca logo.
        if (slotsRef.current[nxt] !== targetIdx) {
          nextVideo.src = VIDEOS[targetIdx].src;
          nextVideo.poster = VIDEOS[targetIdx].poster;
          setSlots((prev) => {
            const s = [...prev] as [number, number];
            s[nxt] = targetIdx;
            return s;
          });
          nextVideo.load();
        }
        nextVideo.currentTime = 0;
        nextVideo.muted = true;
        nextVideo.volume = 0;
        nextVideo.play().catch(() => {});
      }
      setFront(nxt);
      frontRef.current = nxt;
      applyAudio(); // áudio segue o vídeo visível + o hover atual
      window.setTimeout(() => {
        if (oldVideo) oldVideo.pause();
        setSlots((prev) => {
          const s = [...prev] as [number, number];
          s[cur] = (targetIdx + 1) % N; // pré-carrega o próximo no slot livre
          return s;
        });
        transitioning.current = false;
      }, XFADE_MS);
    },
    [refOf, applyAudio],
  );

  const currentIdx = useCallback(() => slotsRef.current[frontRef.current], []);
  const advance = useCallback(
    () => crossfadeTo((currentIdx() + 1) % N),
    [crossfadeTo, currentIdx],
  );
  const goPrev = useCallback(
    () => crossfadeTo((currentIdx() - 1 + N) % N),
    [crossfadeTo, currentIdx],
  );

  const onTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const v = e.currentTarget;
      if (v !== refOf(frontRef.current)) return;
      const dur = v.duration || 0;
      if (dur && dur - v.currentTime <= 0.6 && !transitioning.current) {
        advance();
      }
    },
    [refOf, advance],
  );

  const onVideoEnded = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      if (e.currentTarget === refOf(frontRef.current) && !transitioning.current) {
        advance();
      }
    },
    [refOf, advance],
  );

  // ── hover (desktop) — caminho único via applyAudio ──────────────
  const onEnter = useCallback(() => {
    if (!hasHoverRef.current) return;
    setHovering(true);
    hoveringRef.current = true;
    applyAudio();
  }, [applyAudio]);

  const onLeave = useCallback(() => {
    if (!hasHoverRef.current) return;
    setHovering(false);
    hoveringRef.current = false;
    applyAudio(); // rato saiu → mute
  }, [applyAudio]);

  // ── botão de som: liga/desliga (em desktop o hover é que toca) ──
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      applyAudio();
      return next;
    });
  }, [applyAudio]);

  const videoStyle = (slot: 0 | 1): React.CSSProperties => ({
    opacity: front === slot && videoReady ? 1 : 0,
    filter: colorOn ? "grayscale(0)" : "grayscale(1)",
    transitionProperty: "opacity, filter",
    transitionDuration: `${XFADE_MS}ms, ${FADE_MS}ms`,
    transitionTimingFunction: "ease",
  });

  return (
    <section
      aria-label="25 Horas Agency"
      className="relative w-full h-[110svh] md:h-[115svh] min-h-[640px] overflow-hidden bg-canvas-black"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Camada de vídeo (z-0) com depth no scroll, ou fallback poster ── */}
      {fallback ? (
        <Image
          src={VIDEOS[fbIdx].poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale transition-opacity duration-700"
        />
      ) : (
        <div
          ref={parallaxRef}
          className="absolute inset-x-0 will-change-transform"
          style={{ top: `${-OVERSCAN}%`, bottom: `${-OVERSCAN}%` }}
        >
          {/* Poster de fundo (fallback do 1.º frame), sem priority. */}
          <Image
            src={VIDEOS[0].poster}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <video
            ref={v0}
            src={VIDEOS[slots[0]].src}
            poster={VIDEOS[slots[0]].poster}
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onTimeUpdate={onTimeUpdate}
            onEnded={onVideoEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={videoStyle(0)}
          />
          <video
            ref={v1}
            src={VIDEOS[slots[1]].src}
            poster={VIDEOS[slots[1]].poster}
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            onTimeUpdate={onTimeUpdate}
            onEnded={onVideoEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={videoStyle(1)}
          />
        </div>
      )}

      {/* ── Overlay (z-10): scrim + bottom fade IGUAL ao NichoBlock + reforço ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `rgba(10,10,10,${colorOn ? 0.5 : 0.42})`,
          transition: "background 600ms ease",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 32%, rgba(10,10,10,0.6) 76%, var(--canvas-black) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 65%, var(--canvas-black) 100%)",
        }}
      />

      {/* ── Logo (z-20) + tagline — depth próprio (move mais + fade) ── */}
      <div
        ref={logoRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pb-[9svh] md:pb-[11svh] pointer-events-none will-change-transform"
      >
        <div className="relative w-[min(74vw,720px)] aspect-[3/2]">
          <Image
            src={logoSrc}
            alt="25 Horas Agency"
            fill
            priority
            sizes="(min-width: 768px) 720px, 74vw"
            quality={75}
            className="object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
          />
        </div>
        {heroLines.length > 0 && (
          <div className="-mt-1 md:mt-0 text-center max-w-2xl">
            {heroLines.map((line, i) => (
              <p
                key={i}
                className={`font-display uppercase leading-tight text-canvas-white ${
                  i === heroLines.length - 1
                    ? "mt-1 text-[clamp(0.8rem,1.6vw,1.15rem)] text-canvas-white/75"
                    : "text-[clamp(0.95rem,1.9vw,1.4rem)]"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ── Setas anterior/seguinte (z-20) — escondidas no fallback ── */}
      {!fallback && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={en ? "Previous video" : "Vídeo anterior"}
            className={`${arrowCls} left-4 md:left-8`}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={advance}
            aria-label={en ? "Next video" : "Vídeo seguinte"}
            className={`${arrowCls} right-4 md:right-8`}
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* ── Botão de som (z-20) — escondido no fallback ── */}
      {!fallback && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={
            muted
              ? en
                ? "Turn sound on"
                : "Ligar som"
              : en
                ? "Turn sound off"
                : "Desligar som"
          }
          className="absolute z-20 bottom-[16svh] right-6 md:bottom-[19svh] md:right-12 w-11 h-11 inline-flex items-center justify-center rounded-full border border-canvas-white/40 bg-canvas-black/40 backdrop-blur-sm text-canvas-white hover:bg-canvas-black/70 transition-colors"
        >
          {muted ? <SpeakerOff /> : <SpeakerOn />}
        </button>
      )}
    </section>
  );
}
