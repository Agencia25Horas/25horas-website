"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { disableAudio, enableAudio, startRoomTone, stopRoomTone } from "./audio";

type AudioCtx = {
  on: boolean;
  blocked: boolean;
  toggle: () => Promise<void>;
};

const Ctx = createContext<AudioCtx | null>(null);

const LS_KEY = "25h.audio";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Restore persisted preference, but never auto-start audio without a gesture.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(LS_KEY) === "on") {
      // Mark intent. Toggle is still gated by next gesture.
      setBlocked(true);
    }
  }, []);

  const toggle = async () => {
    if (on) {
      stopRoomTone();
      disableAudio();
      setOn(false);
      setBlocked(false);
      window.localStorage.setItem(LS_KEY, "off");
      return;
    }
    try {
      await enableAudio();
      startRoomTone();
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
