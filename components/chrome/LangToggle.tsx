"use client";

import { useState } from "react";

type Lang = "pt" | "en";

export function LangToggle() {
  const [lang, setLang] = useState<Lang>("pt");

  return (
    <div className="font-mono text-[11px] tracking-mono-wide flex items-center gap-1.5">
      <button
        onClick={() => setLang("pt")}
        className={lang === "pt" ? "text-canvas-white" : "text-type-dim hover:text-type-neutral transition-colors duration-f-8"}
        aria-pressed={lang === "pt"}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-type-dim">·</span>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-canvas-white" : "text-type-dim hover:text-type-neutral transition-colors duration-f-8"}
        aria-pressed={lang === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
