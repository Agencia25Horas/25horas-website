"use client";

import { useTimecode } from "@/lib/timecode";
import { useChromeTheme } from "@/lib/chrome-theme";

export function Timecode() {
  const tc = useTimecode();
  const theme = useChromeTheme();
  const color = theme === "light" ? "text-canvas-black/70" : "text-type-neutral";
  return (
    <span
      className={`font-mono text-[11px] tracking-mono-wide ${color} tabular-nums`}
      aria-label="Timecode"
    >
      {tc}
    </span>
  );
}
