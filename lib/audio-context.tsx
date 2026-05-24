"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { disableAudio, enableAudio } from "./audio";

type AudioCtx = {
  on: boolean;
  blocked: boolean;
  toggle: () => Promise<void>;
};

const Ctx = createContext<AudioCtx | null>(null);

const LS_KEY = "25h.audio";
const TRACK_SRC = "/media/audio/vintecinco.mp3";
const TRACK_VOLUME = 0.5;

/**
 * Background track stays silent (no autoplay) until the user clicks SOM.
 * First click = play; subsequent clicks toggle play/pause. The first click
 * counts as the user gesture, so all browsers accept audio.play().
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio(TRACK_SRC);
    audio.loop = true;
    audio.volume = TRACK_VOLUME;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (on) {
      audio.pause();
      disableAudio();
      setOn(false);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "off");
      return;
    }

    try {
      // Click is the user gesture — safe to start playback + resume the
      // Web Audio context used by the SFX layer (shutter/clap/tick).
      await enableAudio();
      await audio.play();
      setOn(true);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "on");
    } catch {
      setBlocked(true);
    }
  };

  return <Ctx.Provider value={{ on, blocked, toggle }}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used inside <AudioProvider>");
  return v;
}
