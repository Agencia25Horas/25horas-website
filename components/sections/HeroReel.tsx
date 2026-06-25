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
import { useAudio } from "@/lib/audio-context";
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
const FADE_MS = 600; // fade de áudio + grayscale
const XFADE_MS = 500; // crossfade entre vídeos
const VIDEO_PARALLAX = 0.12; // depth do vídeo (fundo, move devagar)
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
export function HeroReel({
  logoSrc = "/media/logos/b25agency.webp",
}: {
  logoSrc?: string;
  /** Mantido por compat com HomeView — já não é renderizado (cliente: sem texto). */
  heroLines?: string[];
}) {
  const { lang } = useLang();
  const en = lang === "en";
  const { duck, registerDucker } = useAudio();

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
  // `muted` = o botão de som está em mute. Começa SEMPRE mudo em qualquer
  // dispositivo — o vídeo só tem som depois de o utilizador tocar no botão.
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [hasHover, setHasHover] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [fbIdx, setFbIdx] = useState(0);
  // Match-cut de abertura: 1.º "vídeo" do hero. Decidido no mount.
  const [playMontage, setPlayMontage] = useState(false);
  // Relógio 25:00:SS do REC bug (canto inf. direito).
  const [clock, setClock] = useState("25:00:00");
  // Revelação one-time do logótipo central depois da intro → handoff p/ o header.
  const [reveal, setReveal] = useState<"off" | "hidden" | "in" | "out">("off");
  const montageDidPlay = useRef(false);

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
      // setInterval (não rAF) → o fade corre de forma fiável e suave em todo o
      // lado (o rAF pode ser estrangulado e parecer instantâneo).
      if (fadeTimer.current) clearInterval(fadeTimer.current);
      const start = el.volume;
      const t0 = performance.now();
      if (target > 0) {
        el.muted = false;
        // Chrome pausa o vídeo se for desmutado sem nenhum gesto do utilizador
        // (política de autoplay). Se isso acontecer, volta a mutar e retoma a
        // reprodução — o vídeo NUNCA pode ficar congelado por causa do som.
        window.setTimeout(() => {
          if (el.paused) {
            el.muted = true;
            const p = el.play();
            if (p && typeof p.catch === "function") p.catch(() => {});
          }
        }, 60);
      }
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / duration);
        el.volume = Math.max(0, Math.min(1, start + (target - start) * t));
        if (t >= 1) {
          if (fadeTimer.current) clearInterval(fadeTimer.current);
          fadeTimer.current = null;
          if (target === 0) el.muted = true; // só silencia DEPOIS do fade-out
        }
      };
      step(); // primeiro passo imediato
      fadeTimer.current = window.setInterval(step, 25); // ~40 fps
    },
    [],
  );

  // Caminho ÚNICO do áudio do vídeo da frente: começa SEMPRE em mute em
  // qualquer dispositivo, e o botão de som é o ÚNICO controlo. O hover só
  // muda a cor — nunca liga o áudio.
  const applyAudio = useCallback(() => {
    const fv = refOf(frontRef.current);
    if (!fv) return;
    const target = mutedRef.current ? 0 : 1;
    fadeAudio(fv, target, FADE_MS);
  }, [refOf, fadeAudio]);

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

  // ── mute da música de fundo: quando o vídeo do hero tem som, MUTA o site ──
  const videoAudible = !muted;
  useEffect(() => {
    duck(videoAudible);
  }, [videoAudible, duck]);
  useEffect(() => () => duck(false), [duck]); // repõe ao desmontar

  // ── mutuamente exclusivo: se o utilizador LIGA a música (botão SOM) enquanto
  // o vídeo toca com som, o contexto chama esta função para silenciar o vídeo
  // (em vez de ouvir-se música + vídeo ao mesmo tempo). Ao mutar, o efeito de
  // cima corre duck(false) e a música retoma de onde estava. ──────────────────
  useEffect(() => {
    return registerDucker(() => {
      if (mutedRef.current) return; // já está mudo → nada a fazer
      const fv = refOf(frontRef.current);
      if (fv) fv.muted = true; // corte imediato do som do vídeo
      if (fadeTimer.current) {
        clearInterval(fadeTimer.current);
        fadeTimer.current = null;
      }
      mutedRef.current = true;
      setMuted(true); // sincroniza o ícone do altifalante
    });
  }, [registerDucker, refOf]);

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
    // começa sempre mudo — o botão é o único controlo de áudio
    const fv = refOf(0);
    if (fv) {
      fv.muted = true;
      // reflecte o atributo `muted` no DOM (o React não o emite no SSR) → ajuda
      // o autoplay a ser permitido logo no 1.º paint, antes de qualquer retry.
      fv.defaultMuted = true;
    }
    return () => {
      if (fadeTimer.current) clearInterval(fadeTimer.current);
    };
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

  // ── revelação do logótipo central + HANDOFF para o header ────────
  // O logo do HEADER começa escondido (classe `hero-intro` posta antes do paint
  // pelo script em layout.tsx). Aqui removemo-la no instante em que o logótipo
  // central se dissolve → o do header faz fade-in (o "handoff" pedido).
  const revealHeaderLogo = useCallback(() => {
    if (typeof document !== "undefined")
      document.documentElement.classList.remove("hero-intro");
  }, []);

  useEffect(() => {
    if (playMontage) {
      montageDidPlay.current = true;
      return;
    }
    if (!montageDidPlay.current) {
      // intro não tocou (reduced-motion / ligação lenta / re-navegação) → mostra
      // já o logo do header, sem revelação central.
      revealHeaderLogo();
      return;
    }
    // a intro acabou agora → logótipo central entra e dissolve-se; ao sair, o
    // logótipo do header entra no canto sup. esquerdo (handoff).
    setReveal("hidden");
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setReveal("in")),
    );
    const tOut = window.setTimeout(() => {
      setReveal("out");
      revealHeaderLogo();
    }, 1800);
    const tDone = window.setTimeout(() => setReveal("off"), 1800 + 950);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(tOut);
      clearTimeout(tDone);
    };
  }, [playMontage, revealHeaderLogo]);

  // Sair da home a meio da intro não pode deixar o logo do header escondido.
  useEffect(() => () => revealHeaderLogo(), [revealHeaderLogo]);

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
  // accionar o MESMO hover no hero REAL — áudio + cor + ducking — mesmo que o
  // hero real esteja fora do viewport (no topo). O onEnter/onLeave já guardam
  // o estado 'muted' e o hasHover, por isso o botão de som continua a mandar. ──
  useEffect(() => {
    window.__heroHover = (active: boolean) => (active ? onEnter() : onLeave());
    return () => {
      delete window.__heroHover;
    };
  }, [onEnter, onLeave]);

  // ── botão de som: liga/desliga o áudio do vídeo (único controlo) ──
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      mutedRef.current = next;
      applyAudio();
      return next;
    });
  }, [applyAudio]);

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

      {/* ── Revelação one-time do logótipo (z-30, data-no-clone): aparece no
            centro depois da intro e DISSOLVE-SE; nesse instante o logótipo do
            HEADER entra no canto sup. esquerdo (handoff). Sem texto. ── */}
      {reveal !== "off" && (
        <div
          aria-hidden
          data-no-clone
          className="absolute inset-x-0 top-0 h-[100svh] z-30 flex items-center justify-center px-6 pointer-events-none"
        >
          <div
            className="relative w-[min(56vw,440px)] aspect-[3/2] will-change-transform"
            style={{
              opacity: reveal === "in" ? 1 : 0,
              transform: reveal === "out" ? "scale(1.12)" : "scale(1)",
              filter: reveal === "out" ? "blur(8px)" : "blur(0)",
              transition:
                "opacity 800ms ease, transform 900ms cubic-bezier(.7,0,.2,1), filter 900ms ease",
            }}
          >
            <Image
              src={logoSrc}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 440px, 56vw"
              quality={80}
              className="object-contain drop-shadow-[0_10px_34px_rgba(0,0,0,0.6)]"
            />
          </div>
        </div>
      )}

      {/* ── REC + relógio 25:00:SS (z-12, canto inf. direito). Fica por baixo da
            intro (z-15): aparece quando a intro se dissolve. No clone (intro
            removida) está sempre visível. ── */}
      {!fallback && (
        <div
          aria-hidden
          className="absolute z-[12] bottom-[16svh] right-6 md:bottom-[19svh] md:right-12 flex items-center gap-2.5 font-mono tabular-nums text-[12px] md:text-[13px] tracking-[0.14em] text-canvas-white/90"
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

      {/* ── Botão de som (z-20) — escondido no fallback ── */}
      {!fallback && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={
            muted
              ? lang === "es"
                ? "Activar sonido"
                : en
                  ? "Turn sound on"
                  : "Ligar som"
              : lang === "es"
                ? "Silenciar"
                : en
                  ? "Turn sound off"
                  : "Desligar som"
          }
          className="absolute z-20 bottom-[16svh] left-6 md:bottom-[19svh] md:left-12 w-11 h-11 inline-flex items-center justify-center rounded-full border border-canvas-white/40 bg-canvas-black/40 backdrop-blur-sm text-canvas-white hover:bg-canvas-black/70 transition-colors"
        >
          {muted ? <SpeakerOff /> : <SpeakerOn />}
        </button>
      )}
    </section>
  );
}
