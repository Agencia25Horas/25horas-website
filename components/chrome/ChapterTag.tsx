"use client";

import { useChromeTheme } from "@/lib/chrome-theme";

export function ChapterTag({ current, total }: { current: number; total: number }) {
  const c = current.toString().padStart(2, "0");
  const t = total.toString().padStart(2, "0");
  const theme = useChromeTheme();
  const color = theme === "light" ? "text-canvas-black/50" : "text-type-dim";
  return (
    <span className={`font-mono text-[11px] tracking-mono-wide ${color}`}>
      {c} / {t}
    </span>
  );
}
