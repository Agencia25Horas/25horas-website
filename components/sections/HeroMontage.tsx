"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * HeroMontage — o "match-cut trailer" como PRIMEIRO vídeo do hero.
 *
 * Vive DENTRO do HeroReel, como uma camada (z-15) que dissolve para o reel no
 * fim. SEM TEXTO (pedido do cliente: "sem NENHUM texto") — é dinâmica de vídeo
 * pura: cortes rápidos entre os 4 nichos.
 *
 * DESKTOP: cortes em VÍDEO. MOBILE: cortes nas IMAGENS-poster — os browsers de
 * telemóvel não tocam 4 vídeos em simultâneo de forma fiável (ficava preto/
 * engasgado); as imagens são leves e o "whip" dá a mesma energia. Toca uma vez.
 */

const CLIPS = [
  { src: "/hero/1corp.mp4", poster: "/hero/1corp.jpg" }, // 0
  { src: "/hero/1desporto.mp4", poster: "/hero/1desporto.jpg" }, // 1
  { src: "/hero/1nig.mp4", poster: "/hero/1nig.jpg" }, // 2
  { src: "/hero/1educ.mp4", poster: "/hero/1educ.jpg" }, // 3
];

type Beat = { v: number; pt: string; en: string; es: string; accent?: boolean };
const SEQ: Beat[] = [
  { v: 1, pt: "GARRA", en: "DRIVE", es: "GARRA", accent: true },
  { v: 0, pt: "VISÃO", en: "VISION", es: "VISIÓN" },
  { v: 2, pt: "RITMO", en: "RHYTHM", es: "RITMO" },
  { v: 3, pt: "FUTURO", en: "FUTURE", es: "FUTURO" },
  { v: 1, pt: "PAIXÃO", en: "PASSION", es: "PASIÓN", accent: true },
  { v: 2, pt: "NOITE", en: "NIGHT", es: "NOCHE" },
  { v: 0, pt: "DETALHE", en: "DETAIL", es: "DETALLE" },
  { v: 3, pt: "HISTÓRIA", en: "STORY", es: "HISTORIA" },
  { v: 1, pt: "EMOÇÃO", en: "EMOTION", es: "EMOCIÓN", accent: true },
  { v: 2, pt: "LUZ", en: "LIGHT", es: "LUZ" },
];

const STEP_MS = 820;
const FADE_MS = 600;

function detectMobile() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
    window.innerWidth <= 768
  );
}

export function HeroMontage({ onDone }: { onDone: () => void }) {
  // HeroMontage só monta no cliente (playMontage começa false no SSR), por isso
  // ler `window` aqui é seguro (sem mismatch de hidratação).
  const [isMobile] = useState(detectMobile);

  const mediaRef = useRef<(HTMLVideoElement | HTMLImageElement | null)[]>([]);
  const intervalRef = useRef<number | null>(null);
  const exitRef = useRef<number | null>(null);

  const [beat, setBeat] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [shown, setShown] = useState(false);

  const finish = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setExiting(true);
    exitRef.current = window.setTimeout(onDone, FADE_MS);
  }, [onDone]);
  // Ref para o `finish` mais recente — a timeline corre UMA vez e lê-o por aqui,
  // por isso mudar de língua (que recria `onDone`/`finish`) NÃO reinicia a
  // sequência: só o texto re-renderiza na nova língua, no mesmo ponto.
  const finishRef = useRef(finish);
  finishRef.current = finish;

  // toca um media SE for vídeo (imagens não têm play()).
  const playMedia = (el: HTMLVideoElement | HTMLImageElement | null) => {
    if (el && "play" in el) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    }
  };

  // timeline — corre UMA vez. No desktop espera o 1.º vídeo ter frame (fallback
  // 1200ms); no mobile (imagens) arranca já.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    mediaRef.current.forEach(playMedia);

    let started = false;
    let b = 0;
    const begin = () => {
      if (started) return;
      started = true;
      intervalRef.current = window.setInterval(() => {
        b++;
        if (b < SEQ.length) setBeat(b);
        else finishRef.current();
      }, STEP_MS);
    };

    const startT = window.setTimeout(begin, 1200); // fallback sempre
    const first = mediaRef.current[SEQ[0].v];
    if (isMobile) {
      begin(); // imagens: arranca imediatamente
    } else if (first && "readyState" in first && first.readyState >= 2) {
      begin();
    } else if (first && "addEventListener" in first) {
      (first as HTMLVideoElement).addEventListener("canplay", begin, {
        once: true,
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(startT);
      if (first && "removeEventListener" in first) {
        (first as HTMLVideoElement).removeEventListener("canplay", begin);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exitRef.current) clearTimeout(exitRef.current);
    };
  }, [isMobile]);

  // corte (opacidade) + whip a cada beat (sem texto)
  useEffect(() => {
    if (exiting) return;
    const v = SEQ[beat].v;
    const el = mediaRef.current[v];
    if (el) {
      playMedia(el);
      el.animate(
        [
          { opacity: 0, transform: "scale(1.22)", filter: "blur(8px)" },
          { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
        ],
        { duration: 550, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    }
  }, [beat, exiting]);

  const current = SEQ[beat];
  const mediaClass =
    "absolute inset-0 w-full h-full object-cover will-change-transform";
  const mediaStyle = (k: number): React.CSSProperties => ({
    opacity: current.v === k ? 1 : 0,
    filter: "saturate(1.12) contrast(1.08)",
    transition: "opacity 200ms ease",
  });

  return (
    <div
      aria-hidden
      data-no-clone
      className="absolute inset-0 z-[15] overflow-hidden pointer-events-none"
      style={{
        opacity: shown && !exiting ? 1 : 0,
        transition: `opacity ${exiting ? FADE_MS : 300}ms ease`,
      }}
    >
      {CLIPS.map((c, k) =>
        isMobile ? (
          // MOBILE: imagem-poster (leve, fiável)
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={c.src}
            ref={(el) => {
              mediaRef.current[k] = el;
            }}
            src={c.poster}
            alt=""
            loading="eager"
            decoding="async"
            className={mediaClass}
            style={mediaStyle(k)}
          />
        ) : (
          // DESKTOP: vídeo
          <video
            key={c.src}
            ref={(el) => {
              mediaRef.current[k] = el;
            }}
            src={c.src}
            poster={c.poster}
            muted
            playsInline
            loop
            preload="auto"
            className={mediaClass}
            style={mediaStyle(k)}
          />
        ),
      )}

      {/* scrim — coerente com o scrim do hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg,rgba(10,10,10,.4),transparent 38%,rgba(10,10,10,.55))",
        }}
      />
    </div>
  );
}
