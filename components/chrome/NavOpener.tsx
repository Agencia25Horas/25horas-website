"use client";

import { useNav } from "@/lib/nav-context";
import { useAudio } from "@/lib/audio-context";
import { playShutter } from "@/lib/audio";

export function NavOpener() {
  const { openNav } = useNav();
  const { on } = useAudio();
  return (
    <button
      onClick={() => {
        if (on) playShutter();
        openNav();
      }}
      className="font-mono text-[14px] text-canvas-white opacity-70 hover:opacity-100 transition-opacity duration-f-8"
      aria-label="Abrir navegação"
    >
      ☰
    </button>
  );
}
