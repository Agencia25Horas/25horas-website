"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useLang } from "@/lib/language-context";
import { HeroMontage } from "./HeroMontage";

// Flag em memória (não persistida): o match-cut de abertura toca UMA vez por
// carregamento de página. F5 repõe o módulo → repete (bom p/ demos); navegar e
// voltar à home (client-side) não repete.
let montagePlayed = false;

// useLayoutEffect no cliente (decide antes do paint → sem flash do hero normal),
// useEffect no servidor (evita o warning de SSR).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

declare global {
  interface Window {
    /** Accionado pelo clone do SeamlessLoop p/ replicar o hover no hero real. */
    __heroHover?: (active: boolean) => void;
    /** true ENQUANTO o match-cut de abertura toca. O SeamlessLoop ignora os
     *  teleportes do scroll infinito enquanto isto for true → sem quebras/saltos
     *  durante a abertura. O clone do loop é criado normalmente (no arranque). */
    __montageActive?: boolean;
  }
}

// shiftY: desloca o vídeo verticalmente (px). NOTA: por causa do overscan
// (camada mais alta que 16:9), object-cover corta os LADOS e a altura total do
// vídeo cabe na caixa → object-position vertical é INERTE neste hero. Para
// baixar/subir o enquadramento usa-se translateY (shiftY). +N = baixa (revela
// mais topo do vídeo), -N = sobe.
const VIDEOS: {
  src: string;
  poster: string;
  objectPosition?: string;
  shiftY?: number;
}[] = [
  { src: "/hero/1corp.mp4", poster: "/hero/1corp.jpg" },
  { src: "/hero/1nig.mp4", poster: "/hero/1nig.jpg", shiftY: 120 },
  { src: "/hero/1desporto.mp4", poster: "/hero/1desporto.jpg" },
  { src: "/hero/1educ.mp4", poster: "/hero/1educ.jpg" },
];
const N = VIDEOS.length;
const FADE_MS = 600; // fade de grayscale
const XFADE_MS = 500; // crossfade entre vídeos
const VIDEO_PARALLAX = 0.12; // depth do vídeo (fundo, move devagar)
const OVERSCAN = 24; // % que a camada de vídeo estica além do hero (sem gap)

export function HeroReel({
  logoSrc = "/media/logos/b25agency.webp",
}: {
  logoSrc?: string;
  /** Mantido por compat com HomeView — já não é renderizado (cliente: sem texto). */
  heroLines?: string[];
}) {
  const { lang } = useLang();
  const en = lang === "en";

  const v0 = useRef<HTMLVideoElement>(null);
  const v1 = useRef<HTMLVideoElement>(null);
  const refOf = useCallback(
    (slot: 0 | 1) => (slot === 0 ? v0.current : v1.current),
    [],
  );
  const parallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const [slots, setSlots] = useState<[number, number]>([0, 1]);
  const [front, setFront] = useState<0 | 1>(0);
  const [hovering, setHovering] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [fbIdx, setFbIdx] = useState(0);
  // Match-cut de abertura: 1.º "vídeo" do hero. Decidido no mount.
  const [playMontage, setPlayMontage] = useState(false);
  // Relógio 25:00:SS do REC bug (canto inf. direito).
  const [clock, setClock] = useState("25:00:00");

  // espelhos para os handlers (evita closures obsoletos)
  const hoveringRef = useRef(hovering);
  hoveringRef.current = hovering;
  const frontRef = useRef(front);
  frontRef.current = front;
  const hasHoverRef = useRef(hasHover);
  hasHoverRef.current = hasHover;
  const transitioning = useRef(false);
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  // SEMPRE a cores (pedido do cliente: "o vídeo deve vir a cores"). Mantemos o
  // tracking de hover para o áudio/clone, mas a cor já não depende dele.
  const colorOn = true;

  // ── arranque robusto do vídeo da frente ─────────────────────────
  // O vídeo tem `autoPlay muted` NATIVO (o `muted` vai no SSR, confirmado). Como
  // alguns browsers adiam o autoplay, voltamos a tocar quando o hero fica
  // VISÍVEL (IntersectionObserver), ao voltar à tab, e à 1.ª interação. Tudo só
  // age se estiver `paused` → nunca há dois play() a competir (era isso que
  // fazia o vídeo "crashar/bloquear") nem se mexe no áudio do hover.
  const kickFront = useCallback(() => {
    const fv = refOf(frontRef.current);
    if (!fv || !fv.paused) return;
    fv.muted = true; // garante que o play (mudo) é sempre permitido
    const p = fv.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [refOf]);

  // Toca quando o hero entra no ecrã — cobre o autoplay adiado, sem spam.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      kickFront();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) kickFront();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [kickFront]);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") kickFront();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [kickFront]);

  // Fallback final: alguns browsers bloqueiam o autoplay MESMO mudo até haver
  // uma interação. Aqui o vídeo arranca à 1.ª interação do utilizador (scroll,
  // toque, clique ou tecla) em qualquer ponto da página. {once} auto-remove.
  useEffect(() => {
    const kick = () => kickFront();
    const evs: (keyof WindowEventMap)[] = [
      "pointerdown",
      "touchstart",
      "keydown",
      "wheel",
      "scroll",
    ];
    const opts = { once: true, passive: true, capture: true } as const;
    evs.forEach((e) => window.addEventListener(e, kick, opts));
    return () => evs.forEach((e) => window.removeEventListener(e, kick, opts));
  }, [kickFront]);

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
    // vídeos do hero são SEMPRE mudos — o site não tem som de forma alguma
    const fv = refOf(0);
    if (fv) {
      fv.muted = true;
      // reflecte o atributo `muted` no DOM (o React não o emite no SSR) → ajuda
      // o autoplay a ser permitido logo no 1.º paint, antes de qualquer retry.
      fv.defaultMuted = true;
    }
  }, [refOf]);

  // ── decide o match-cut de abertura (uma vez por carregamento) ────
  // Antes do paint p/ não piscar o hero normal. Salta em reduced-motion /
  // ligação lenta (aí o hero já cai para posters).
  useIsoLayoutEffect(() => {
    if (montagePlayed) return;
    montagePlayed = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      !!conn &&
      (conn.saveData === true ||
        ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? ""));
    if (!reduce && !slow) {
      window.__montageActive = true; // desliga o teleporte do scroll já no arranque
      setPlayMontage(true);
    }
  }, []);

  // Durante o match-cut, os 2 vídeos do reel ficam PAUSADOS (a montagem tapa-os e
  // tem os seus próprios 4) e o teleporte do scroll fica desligado. Ao acabar,
  // arrancam e o scroll infinito volta ao normal.
  useEffect(() => {
    if (playMontage) {
      window.__montageActive = true;
      [v0.current, v1.current].forEach((v) => {
        if (v && !v.paused) v.pause();
      });
      return;
    }
    window.__montageActive = false;
    const id = window.setTimeout(() => kickFront(), 60);
    return () => clearTimeout(id);
  }, [playMontage, kickFront]);

  // Se o utilizador sair da home DURANTE o match-cut, garante que a flag não
  // fica presa em `true` (senão o scroll infinito ficava morto nas outras
  // páginas, porque o SeamlessLoop ignora teleportes enquanto for true).
  useEffect(() => {
    return () => {
      window.__montageActive = false;
    };
  }, []);

  // ── relógio 25:00:SS do REC bug ─────────────────────────────────
  useEffect(() => {
    const tick = () =>
      setClock("25:00:" + String(new Date().getSeconds()).padStart(2, "0"));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
        const vid = parallaxRef.current;
        if (vid) vid.style.transform = `translate3d(0,${y * VIDEO_PARALLAX}px,0)`;
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
    [refOf],
  );

  const currentIdx = useCallback(() => slotsRef.current[frontRef.current], []);
  const advance = useCallback(
    () => crossfadeTo((currentIdx() + 1) % N),
    [crossfadeTo, currentIdx],
  );
  const retreat = useCallback(
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

  // ── hover (desktop) — só muda cor, não afecta áudio ──────────────
  const onEnter = useCallback(() => {
    if (!hasHoverRef.current) return;
    setHovering(true);
    hoveringRef.current = true;
  }, []);

  const onLeave = useCallback(() => {
    if (!hasHoverRef.current) return;
    setHovering(false);
    hoveringRef.current = false;
  }, []);

  // ── API global: o CLONE do SeamlessLoop (scroll infinito) chama isto p/
  // accionar o MESMO hover no hero REAL — mesmo que o hero real esteja fora
  // do viewport (no topo). ──
  useEffect(() => {
    window.__heroHover = (active: boolean) => (active ? onEnter() : onLeave());
    return () => {
      delete window.__heroHover;
    };
  }, [onEnter, onLeave]);

  const videoStyle = (slot: 0 | 1): React.CSSProperties => {
    const v = VIDEOS[slotsRef.current[slot]];
    return {
      opacity: front === slot ? 1 : 0,
      filter: colorOn ? "grayscale(0)" : "grayscale(1)",
      objectPosition: v?.objectPosition ?? "center",
      transform: v?.shiftY
        ? `translate3d(0, ${v.shiftY}px, 0) scale(1.18)`
        : undefined,
      transitionProperty: "opacity, filter",
      transitionDuration: `${XFADE_MS}ms, ${FADE_MS}ms`,
      transitionTimingFunction: "ease",
    };
  };

  return (
    <section
      ref={heroRef}
      aria-label="25 Horas Agency"
      data-hero-reel="true"
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-canvas-black"
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
          className="object-cover transition-opacity duration-700"
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
          {/* Os vídeos do reel ficam SEMPRE montados (para o clone do scroll
              infinito os apanhar). Durante o match-cut são apenas PAUSADOS. */}
          <video
            ref={v0}
            src={VIDEOS[slots[0]].src}
            poster={VIDEOS[slots[0]].poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTimeUpdate}
            onEnded={onVideoEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={videoStyle(0)}
          />
          <video
            ref={v1}
            src={VIDEOS[slots[1]].src}
            poster={VIDEOS[slots[1]].poster}
            autoPlay
            muted
            playsInline
            preload="auto"
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

      {/* ── Match-cut de abertura (z-15): toca por baixo do logo e dissolve
            para o reel quando termina. O logo (z-20) fica fixo por cima. ── */}
      {playMontage && <HeroMontage onDone={() => setPlayMontage(false)} />}

      {/* ── REC + relógio 25:00:SS (z-40 — SEMPRE por CIMA do vídeo e da intro,
            canto inf. direito, acima do StickyCTA em mobile/tablet). ── */}
      {!fallback && (
        <div
          aria-hidden
          className="absolute z-40 bottom-[92px] right-5 lg:bottom-9 lg:right-10 flex items-center gap-2.5 font-mono tabular-nums text-[12px] md:text-[13px] tracking-[0.14em] text-canvas-white/90"
        >
          <span
            className="w-2 h-2 rounded-full bg-signal-live"
            style={{
              boxShadow: "0 0 10px var(--signal-live)",
              animation: "heroRecBlink 1.1s steps(2) infinite",
            }}
          />
          <span className="text-canvas-white/65">REC</span>
          <span className="text-accent-grade font-medium tracking-[0.06em]">
            {clock}
          </span>
        </div>
      )}

      {/* ── Setas prev/next (z-20) — saltar vídeos do hero ── */}
      {!fallback && (
        <>
          <button
            type="button"
            onClick={retreat}
            aria-label={
              lang === "es"
                ? "Vídeo anterior"
                : en
                  ? "Previous video"
                  : "Vídeo anterior"
            }
            className="absolute z-20 left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full border border-canvas-white/40 bg-canvas-black/40 backdrop-blur-sm text-canvas-white text-2xl leading-none hover:bg-canvas-black/70 transition-colors"
          >
            <span className="-mt-0.5">‹</span>
          </button>
          <button
            type="button"
            onClick={advance}
            aria-label={
              lang === "es"
                ? "Vídeo siguiente"
                : en
                  ? "Next video"
                  : "Próximo vídeo"
            }
            className="absolute z-20 right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full border border-canvas-white/40 bg-canvas-black/40 backdrop-blur-sm text-canvas-white text-2xl leading-none hover:bg-canvas-black/70 transition-colors"
          >
            <span className="-mt-0.5">›</span>
          </button>
        </>
      )}

    </section>
  );
}
