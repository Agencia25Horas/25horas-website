"use client";

import { useLang } from "@/lib/language-context";
import type { Lang } from "@/lib/i18n";

const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: "pt", label: "PT", aria: "Português" },
  { code: "en", label: "EN", aria: "English" },
  { code: "es", label: "ES", aria: "Español" },
];

export function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="font-mono text-[11px] uppercase tracking-[0.15em] flex items-center gap-1.5">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1.5">
          {i > 0 && (
            <span className="text-canvas-white/55" aria-hidden>
              ·
            </span>
          )}
          <button
            onClick={() => setLang(l.code)}
            className={
              lang === l.code
                ? "text-canvas-white"
                : "text-canvas-white/70 hover:text-canvas-white transition-colors"
            }
            aria-pressed={lang === l.code}
            aria-label={l.aria}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
