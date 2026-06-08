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
 * Música de fundo bilingue + LOOP sincronizado.
 *
 * As duas faixas (25pt + 25en) arrancam ao mesmo tempo, do início; só a da
 * língua ativa tem som (a outra toca muda, em sincronia, via `muted` —
 * iOS-safe). Mudar de língua troca qual se ouve, sem cortar.
 *
 * As faixas têm durações diferentes (a PT é um pouco mais longa). Para nunca
 * haver silêncio e poder mudar de língua a qualquer momento:
 *   • o LOOP é comandado pela faixa ATIVA — quando ela acaba, AS DUAS
 *     recomeçam juntas do início (a mais curta, que acabou antes, espera);
 *   • mudar para uma língua cuja faixa já tinha acabado → recomeça AS DUAS.
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

  // Só a faixa da língua ativa se ouve (muted, não volume → fiável no iOS).
  const applyMutes = useCallback(() => {
    const a = activeAudio();
    const i = inactiveAudio();
    if (i) {
      i.muted = true;
      i.volume = 0;
    }
    if (a) {
      a.muted = false;
      a.volume = targetVolume();
    }
  }, [activeAudio, inactiveAudio, targetVolume]);

  // Recomeça AS DUAS faixas do início (mantém sincronia) e toca.
  const restartBoth = useCallback(() => {
    const pt = ptRef.current;
    const en = enRef.current;
    if (!pt || !en) return;
    pt.currentTime = 0;
    en.currentTime = 0;
    applyMutes();
    pt.play().catch(() => {});
    en.play().catch(() => {});
  }, [applyMutes]);
  const restartBothRef = useRef(restartBoth);
  restartBothRef.current = restartBoth;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pt = new Audio(TRACKS.pt);
    const en = new Audio(TRACKS.en);
    pt.preload = "auto";
    en.preload = "auto";
    pt.volume = 0;
    en.volume = 0;
    pt.muted = true;
    en.muted = true;
    ptRef.current = pt;
    enRef.current = en;
    // LOOP sincronizado: quando a faixa ATIVA acaba, recomeçam AS DUAS. A
    // inativa (mais curta) que acabe antes fica à espera. NÃO usamos o atributo
    // `loop` — cada uma a fazer loop sozinha desincronizava-as.
    const onEnded = (e: Event) => {
      if (!onRef.current) return;
      const active = langRef.current === "en" ? enRef.current : ptRef.current;
      if (e.target === active) restartBothRef.current();
    };
    pt.addEventListener("ended", onEnded);
    en.addEventListener("ended", onEnded);
    return () => {
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      pt.removeEventListener("ended", onEnded);
      en.removeEventListener("ended", onEnded);
      pt.pause();
      en.pause();
      pt.src = "";
      en.src = "";
      ptRef.current = null;
      enRef.current = null;
    };
  }, []);

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

  // ── troca de língua ──────────────────────────────────────────────
  useEffect(() => {
    if (!onRef.current) return;
    if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    const a = activeAudio();
    // se a nova faixa já tinha ACABADO → recomeça AS DUAS (loop sincronizado).
    if (a && a.ended) {
      restartBoth();
      return;
    }
    // senão, está a tocar em sincronia → só troca qual se ouve.
    applyMutes();
    if (a && a.paused) a.play().catch(() => {});
  }, [lang, activeAudio, applyMutes, restartBoth]);

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
      onRef.current = true; // para o onEnded (loop) já funcionar
      restartBoth(); // arrancam ao mesmo tempo, do início
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
