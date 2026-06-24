"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/language-context";

/**
 * HeroMontage — o "match-cut trailer" como PRIMEIRO vídeo do hero.
 *
 * Vive DENTRO do HeroReel, como uma camada (z-15) por baixo do logo (z-20): o
 * logo e o header ficam visíveis o tempo todo, o match-cut toca atrás deles, e
 * no fim dissolve para o reel normal (que monta por baixo). Não é uma "cena
 * separada" — é o hero a abrir já a bombar e a continuar para os vídeos.
 *
 * Toca uma vez; saltável (clique / scroll / Esc).
 */

const ACCENT = "#e85d3a";

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

export function HeroMontage({ onDone }: { onDone: () => void }) {
  const { lang } = useLang();

  const vidsRef = useRef<(HTMLVideoElement | null)[]>([]);
  const kickerRef = useRef<HTMLSpanElement>(null);
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

  // timeline — começa quando o 1.º vídeo tem frame (fallback 1200ms)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    vidsRef.current.forEach((el) => {
      if (!el) return;
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    });

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
    const first = vidsRef.current[SEQ[0].v];
    const startT = window.setTimeout(begin, 1200);
    if (first && first.readyState >= 2) begin();
    else first?.addEventListener("canplay", begin, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(startT);
      first?.removeEventListener("canplay", begin);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (exitRef.current) clearTimeout(exitRef.current);
    };
    // corre UMA vez — não depende de `finish` (lido via finishRef) para que
    // mudar de língua não reinicie a sequência.
  }, []);

  // corte (opacidade) + whip + palavra a cada beat
  useEffect(() => {
    if (exiting) return;
    const v = SEQ[beat].v;
    const el = vidsRef.current[v];
    if (el) {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      el.animate(
        [
          { opacity: 0, transform: "scale(1.22)", filter: "blur(8px)" },
          { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
        ],
        { duration: 550, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    }
    // só translateY — a centragem é feita pelo flex do contentor (não mexer no X
    // aqui senão entra em conflito e descentra a palavra).
    kickerRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(16px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 500, easing: "ease", fill: "backwards" },
    );
  }, [beat, exiting]);

  const current = SEQ[beat];

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
      {CLIPS.map((c, k) => (
        <video
          key={c.src}
          ref={(el) => {
            vidsRef.current[k] = el;
          }}
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            opacity: current.v === k ? 1 : 0,
            filter: "saturate(1.12) contrast(1.08)",
            transition: "opacity 200ms ease",
          }}
        />
      ))}

      {/* scrim — legibilidade da palavra (coerente com o scrim do hero) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg,rgba(10,10,10,.4),transparent 38%,rgba(10,10,10,.55))",
        }}
      />

      {/* palavra do corte — contentor com altura do VIEWPORT (100svh) e alinhado
          em baixo, para a palavra ficar SEMPRE visível (o hero é mais alto que o
          ecrã). Centrada por flex; line-height com folga p/ acentos (Ã, Ç). */}
      <div className="absolute inset-x-0 top-0 h-[100svh] flex items-end justify-center pb-[18svh] px-6 pointer-events-none">
        <span
          ref={kickerRef}
          className="inline-block font-display uppercase text-center leading-[1.08]"
          style={{
            fontSize: "clamp(1.5rem,6vw,4rem)",
            color: current.accent ? ACCENT : "#fff",
            textShadow: "0 4px 24px rgba(0,0,0,.55)",
            maxWidth: "92vw",
          }}
        >
          {current[lang] ?? current.pt}
        </span>
      </div>
    </div>
  );
}
