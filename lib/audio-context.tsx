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
import { useLang } from "./language-context";

type AudioCtx = {
  on: boolean;
  blocked: boolean;
  toggle: () => Promise<void>;
  /** Baixa (true) / repõe (false) o volume da faixa ATIVA — o vídeo do hero
   *  usa isto para deixar a música de fundo, sem a cortar. */
  duck: (active: boolean) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

const LS_KEY = "25h.audio";
// Duas faixas que tocam EM SINCRONIA: só se ouve a da língua ativa.
const TRACKS = {
  pt: "/media/audio/25pt.mp3",
  en: "/media/audio/25en.mp3",
} as const;
const TRACK_VOLUME = 0.5;
const DUCK_VOLUME = 0.1; // ~20% — fica de fundo quando o vídeo tem som

/**
 * Música de fundo bilingue. Ao clicar SOM, as DUAS faixas arrancam ao mesmo
 * tempo, do início; só a da língua ativa é que tem volume (a outra toca muda,
 * em sincronia). Mudar de língua troca qual se ouve — sem cortar.
 *
 * As faixas NÃO fazem loop e têm durações diferentes. Se mudares para uma
 * língua cuja faixa já TERMINOU, ela recomeça do início.
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const ptRef = useRef<HTMLAudioElement | null>(null);
  const enRef = useRef<HTMLAudioElement | null>(null);
  const duckedRef = useRef(false);
  const fadeRaf = useRef<number | null>(null);
  const onRef = useRef(on);
  onRef.current = on;
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pt = new Audio(TRACKS.pt);
    const en = new Audio(TRACKS.en);
    pt.preload = "auto";
    en.preload = "auto";
    // `muted` (não `volume`) é o que silencia de forma fiável — no iOS o
    // volume é read-only/ignorado, por isso só com muted é que a faixa
    // inativa fica mesmo calada.
    pt.volume = 0;
    en.volume = 0;
    pt.muted = true;
    en.muted = true;
    ptRef.current = pt;
    enRef.current = en;
    return () => {
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      pt.pause();
      en.pause();
      pt.src = "";
      en.src = "";
      ptRef.current = null;
      enRef.current = null;
    };
  }, []);

  const activeAudio = useCallback(
    () => (langRef.current === "en" ? enRef.current : ptRef.current),
    [],
  );
  const inactiveAudio = useCallback(
    () => (langRef.current === "en" ? ptRef.current : enRef.current),
    [],
  );
  const targetVolume = useCallback(
    () => (duckedRef.current ? DUCK_VOLUME : TRACK_VOLUME),
    [],
  );

  const fadeVolumeTo = useCallback(
    (el: HTMLAudioElement | null, target: number) => {
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
    },
    [],
  );

  // ── troca de língua: muda qual a faixa audível ───────────────────
  useEffect(() => {
    if (!onRef.current) return; // só faz sentido com a música ligada
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    const act = activeAudio();
    const ina = inactiveAudio();
    if (ina) {
      ina.muted = true; // a anterior fica muda (continua em sincronia)
      ina.volume = 0;
    }
    if (act) {
      // se a nova faixa já tinha acabado, recomeça do início
      if (act.ended) act.currentTime = 0;
      if (act.paused) act.play().catch(() => {});
      act.muted = false;
      act.volume = targetVolume();
    }
  }, [lang, activeAudio, inactiveAudio, targetVolume]);

  const duck = useCallback(
    (active: boolean) => {
      duckedRef.current = active;
      fadeVolumeTo(activeAudio(), active ? DUCK_VOLUME : TRACK_VOLUME);
    },
    [activeAudio, fadeVolumeTo],
  );

  const toggle = async () => {
    const pt = ptRef.current;
    const en = enRef.current;
    if (!pt || !en) return;

    if (onRef.current) {
      pt.pause();
      en.pause();
      disableAudio();
      setOn(false);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "off");
      return;
    }

    try {
      // Click = gesto do utilizador → áudio permitido em todos os browsers.
      await enableAudio();
      // ARRANCAM ao mesmo tempo, do início — é isto que garante a sincronia.
      pt.currentTime = 0;
      en.currentTime = 0;
      const act = activeAudio();
      const ina = inactiveAudio();
      if (ina) {
        ina.muted = true;
        ina.volume = 0;
      }
      if (act) {
        act.muted = false;
        act.volume = targetVolume();
      }
      await Promise.all([pt.play(), en.play()]);
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
