"use client";

import { useNav } from "@/lib/nav-context";
import { useAudio } from "@/lib/audio-context";
import { useChromeTheme } from "@/lib/chrome-theme";
import { playShutter } from "@/lib/audio";

export function NavOpener() {
  const { openNav } = useNav();
  const { on } = useAudio();
  const theme = useChromeTheme();
  const color = theme === "light" ? "text-canvas-black" : "text-canvas-white";

  return (
    <button
      onClick={() => {
        if (on) playShutter();
        openNav();
      }}
      className={`font-mono text-[14px] ${color} opacity-70 hover:opacity-100 transition-opacity duration-f-8`}
      aria-label="Abrir navegação"
    >
      ☰
    </button>
  );
}
