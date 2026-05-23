"use client";

import { useChromeTheme } from "@/lib/chrome-theme";

export function ScrollCue({ label = "ROLAR" }: { label?: string }) {
  const theme = useChromeTheme();
  const color = theme === "light" ? "text-canvas-black/70" : "text-type-neutral";
  const accent = theme === "light" ? "decoration-canvas-black/40" : "decoration-type-dim";
  return (
    <span className={`font-mono text-[11px] tracking-mono-wider ${color}`}>
      ↓&nbsp;<span className={`underline underline-offset-4 ${accent}`}>{label}</span>
    </span>
  );
}
