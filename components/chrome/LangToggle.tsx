"use client";

import { useLang } from "@/lib/language-context";

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.15em] flex items-center gap-1.5">
      <button
        onClick={() => setLang("pt")}
        className={
          lang === "pt"
            ? "text-canvas-white"
            : "text-canvas-white/70 hover:text-canvas-white transition-colors"
        }
        aria-pressed={lang === "pt"}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-canvas-white/55" aria-hidden>·</span>
      <button
        onClick={() => setLang("en")}
        className={
          lang === "en"
            ? "text-canvas-white"
            : "text-canvas-white/70 hover:text-canvas-white transition-colors"
        }
        aria-pressed={lang === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
