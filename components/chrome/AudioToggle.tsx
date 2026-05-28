"use client";

import { useAudio } from "@/lib/audio-context";
import { useLang } from "@/lib/language-context";

/**
 * Botão "SOM" — toggle de vintecinco.mp3.
 * Bolinha verde acesa quando playing, círculo vazio quando off.
 */
export function AudioToggle() {
  const { on, toggle } = useAudio();
  const { t } = useLang();

  return (
    <button
      onClick={() => void toggle()}
      className="font-mono text-[11px] uppercase tracking-[0.15em] text-canvas-white/70 hover:text-canvas-white transition-colors flex items-center gap-1.5"
      aria-pressed={on}
      aria-label={t("chrome.som")}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full transition-colors ${
          on ? "bg-signal-live" : "bg-transparent border border-canvas-white/40"
        }`}
        aria-hidden
      />
      {t("chrome.som")}
    </button>
  );
}
