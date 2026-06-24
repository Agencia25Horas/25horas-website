"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { disableAudio, enableAudio } from "./audio";

type AudioCtx = {
  on: boolean;
  blocked: boolean;
  toggle: () => Promise<void>;
  /** Pausa (true) / retoma (false) a música de fundo. Um vídeo (hero/portfólio)
   *  chama isto quando passa a ter som: a música FAZ PAUSE (mantém a posição) e
   *  o botão SOM reflecte que deixou de se ouvir — som do site e som de vídeo
   *  são mutuamente exclusivos. */
  duck: (active: boolean) => void;
  /** Um vídeo regista aqui como SILENCIAR-SE. Quando o utilizador liga a música
   *  pelo botão SOM enquanto um vídeo toca com som, mandamos parar esse vídeo
   *  (em vez de sobreporem-se duas faixas). Devolve a função de remoção. */
  registerDucker: (silence: () => void) => () => void;
};

const Ctx = createContext<AudioCtx | null>(null);

const LS_KEY = "25h.audio";
// Faixa de fundo ÚNICA: toca a mesma versão (PT) em qualquer língua do site.
// A antiga versão EN (25en.mp3) deixou de ser usada — música é só ambiente.
const TRACK = "/media/audio/25pt.mp3";
const TRACK_VOLUME = 0.5;

/**
 * Música de fundo — faixa única em loop nativo.
 *
 * Antes existiam duas faixas (PT/EN) sincronizadas e a língua trocava qual se
 * ouvia. Por decisão de produto passou a tocar SEMPRE a mesma faixa (PT),
 * independentemente da língua — por isso esta camada deixou de depender de
 * `lang` e o loop é simplesmente o `loop` nativo do <audio>.
 *
 * Estado:
 *  - `wantedRef`  → INTENÇÃO do utilizador (ligou/desligou no botão; persistida).
 *  - `duckedRef`  → há um vídeo a tocar com som AGORA (exige silêncio da música).
 *  - `on`         → música AUDÍVEL agora = wanted && !ducked. É o que o botão
 *                   SOM mostra (bolinha verde). Assim o botão nunca "mente".
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Um vídeo pediu silêncio (mute total do site enquanto tem som).
  const duckedRef = useRef(false);
  // Intenção do utilizador: quer música? (independente do duck) — persistida.
  const wantedRef = useRef(false);
  const fadeRaf = useRef<number | null>(null);
  const onRef = useRef(on);
  onRef.current = on;
  // Vídeos que sabem silenciar-se (ver registerDucker).
  const silencersRef = useRef<Set<() => void>>(new Set());

  // ── cria o elemento de áudio (uma vez) + AUTOPLAY ───────────────
  // A música arranca sozinha ao entrar no site (a menos que o utilizador a
  // tenha desligado numa visita anterior — localStorage "off"). Os browsers
  // bloqueiam autoplay com som antes do 1.º gesto, por isso: tenta já, e se
  // falhar volta a tentar ao 1.º clique/tecla/toque na página.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const a = new Audio(TRACK);
    a.preload = "auto";
    a.loop = true; // loop nativo — faixa única, sem sincronização
    a.volume = TRACK_VOLUME;
    audioRef.current = a;

    const evs: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
    ];
    const opts = { passive: true, capture: true } as const;
    const removeGestureListeners = () =>
      evs.forEach((e) => window.removeEventListener(e, onGesture, opts));
    const tryStart = () => {
      if (onRef.current || duckedRef.current) return; // já toca / vídeo manda
      a.muted = false;
      a.play()
        .then(() => {
          setOn(true);
          setBlocked(false);
          removeGestureListeners();
        })
        .catch(() => {
          /* bloqueado — fica à espera do 1.º gesto */
        });
    };
    function onGesture() {
      tryStart();
    }

    if (window.localStorage.getItem(LS_KEY) !== "off") {
      wantedRef.current = true; // intenção: tocar (será retomado após qualquer duck)
      tryStart();
      evs.forEach((e) => window.addEventListener(e, onGesture, opts));
    }

    return () => {
      removeGestureListeners();
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      a.pause();
      a.src = "";
      audioRef.current = null;
    };
  }, []);

  // Fade de volume (suave no desktop; no iOS o volume é ignorado mas o
  // `muted`/play continua a comandar).
  const fadeVolumeTo = useCallback((target: number) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    const start = el.volume;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 400);
      el.volume = start + (target - start) * t;
      if (t < 1) fadeRaf.current = requestAnimationFrame(tick);
      else fadeRaf.current = null;
    };
    fadeRaf.current = requestAnimationFrame(tick);
  }, []);

  // ── PAUSE/RESUME quando um vídeo tem som ────────────────────────
  // Faz PAUSE (mantém a posição da faixa — não reinicia) e reflecte no botão.
  // Ao terminar o som do vídeo, RETOMA de onde estava — mas só se o utilizador
  // quiser música (`wantedRef`); se ele a tinha desligado, fica desligada.
  const duck = useCallback(
    (active: boolean) => {
      duckedRef.current = active;
      const el = audioRef.current;
      if (!el) return;
      if (active) {
        if (!el.paused) el.pause(); // PAUSE (posição mantida), não mute
        if (onRef.current) setOn(false); // botão deixa de estar verde
      } else if (wantedRef.current) {
        el.muted = false;
        el.volume = 0;
        const p = el.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
        fadeVolumeTo(TRACK_VOLUME); // retoma da posição, com fade suave
        setOn(true);
      }
    },
    [fadeVolumeTo],
  );

  const registerDucker = useCallback((silence: () => void) => {
    silencersRef.current.add(silence);
    return () => {
      silencersRef.current.delete(silence);
    };
  }, []);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;

    // Música audível → DESLIGAR (pausa; mantém posição, não reinicia).
    if (onRef.current) {
      el.pause();
      disableAudio();
      wantedRef.current = false;
      setOn(false);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "off");
      return;
    }

    // Inaudível (desligada OU pausada por um vídeo) → LIGAR música.
    try {
      // Click = gesto do utilizador → áudio permitido em todos os browsers.
      await enableAudio();
      wantedRef.current = true;
      window.localStorage.setItem(LS_KEY, "on");
      // Mutuamente exclusivo: se um vídeo está a tocar com som, manda-o parar
      // (em vez de sobrepor música + vídeo). Cada vídeo ao silenciar-se chama
      // duck(false), mas retomamos a música já aqui para resposta imediata.
      if (duckedRef.current) silencersRef.current.forEach((fn) => fn());
      duckedRef.current = false;
      el.muted = false;
      el.volume = TRACK_VOLUME; // sem currentTime=0 → retoma de onde estava
      await el.play();
      setOn(true);
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  };

  return (
    <Ctx.Provider value={{ on, blocked, toggle, duck, registerDucker }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used inside <AudioProvider>");
  return v;
}
