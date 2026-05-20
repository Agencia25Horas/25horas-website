"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "@/lib/audio-context";
import { useFirstVisit } from "@/lib/first-visit";

export function AudioToggle() {
  const { on, toggle } = useAudio();
  const { first, dismiss } = useFirstVisit("som");
  const hintTimer = useRef<number | null>(null);

  // Auto-dismiss the pulse hint after a window of attention.
  useEffect(() => {
    if (!first) return;
    hintTimer.current = window.setTimeout(() => dismiss(), 8000);
    return () => {
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, [first, dismiss]);

  const handleClick = async () => {
    dismiss();
    await toggle();
  };

  const showHint = first && !on;

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleClick}
        className="font-mono text-[11px] tracking-mono-wider text-type-neutral hover:text-canvas-white transition-colors duration-f-8 flex items-center gap-1.5"
        aria-pressed={on}
        aria-label={on ? "Desligar som" : "Ligar som"}
      >
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-f-8 ${
            on ? "bg-signal-live" : "bg-transparent border border-type-dim"
          } ${showHint ? "som-hint" : ""}`}
          aria-hidden
        />
        SOM
      </button>

      {showHint && (
        <span
          className="hint-fade absolute right-0 top-full mt-2 font-mono text-[9px] tracking-mono-wider text-type-dim whitespace-nowrap pointer-events-none"
          aria-hidden
        >
          ↑ PARA OUVIR
        </span>
      )}
    </div>
  );
}
