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
  /** Muta (true) / repõe (false) a música de fundo. O vídeo do hero usa isto
   *  para silenciar TOTALMENTE o site enquanto tem som (mute, não ducking). */
  duck: (active: boolean) => void;
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
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Hover do hero pede mute total da música; guardamos para reaplicar mesmo que
  // o som seja ligado já durante um hover.
  const duckedRef = useRef(false);
  const fadeRaf = useRef<number | null>(null);
  const onRef = useRef(on);
  onRef.current = on;

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
      if (onRef.current) return; // já está a tocar
      a.muted = duckedRef.current; // respeita o hero se já tiver som
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

  // ── mute total quando o vídeo do hero tem som (não ducking) ─────
  // `muted` é o único caminho fiável no iOS (lá o `volume` é ignorado).
  const duck = useCallback(
    (active: boolean) => {
      duckedRef.current = active;
      const el = audioRef.current;
      if (!el) return;
      if (active) {
        el.muted = true; // silêncio total enquanto o hero toca
      } else {
        el.muted = false;
        el.volume = 0;
        fadeVolumeTo(TRACK_VOLUME); // repõe com fade suave
      }
    },
    [fadeVolumeTo],
  );

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (onRef.current) {
      el.pause();
      disableAudio();
      setOn(false);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "off");
      return;
    }

    try {
      // Click = gesto do utilizador → áudio permitido em todos os browsers.
      await enableAudio();
      el.currentTime = 0;
      el.muted = duckedRef.current; // respeita um hover em curso
      el.volume = TRACK_VOLUME;
      await el.play();
      setOn(true);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "on");
    } catch {
      setBlocked(true);
    }
  };

  return (
    <Ctx.Provider value={{ on, blocked, toggle, duck }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used inside <AudioProvider>");
  return v;
}
