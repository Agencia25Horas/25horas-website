"use client";

import { useState } from "react";
import { useChromeTheme } from "@/lib/chrome-theme";

type Lang = "pt" | "en";

export function LangToggle() {
  const [lang, setLang] = useState<Lang>("pt");
  const theme = useChromeTheme();
  const active = theme === "light" ? "text-canvas-black" : "text-canvas-white";
  const inactive =
    theme === "light"
      ? "text-canvas-black/40 hover:text-canvas-black"
      : "text-type-dim hover:text-type-neutral";

  return (
    <div className="font-mono text-[11px] tracking-mono-wide flex items-center gap-1.5">
      <button
        onClick={() => setLang("pt")}
        className={lang === "pt" ? active : `${inactive} transition-colors duration-f-8`}
        aria-pressed={lang === "pt"}
        aria-label="Português"
      >
        PT
      </button>
      <span className="text-type-dim">·</span>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? active : `${inactive} transition-colors duration-f-8`}
        aria-pressed={lang === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
