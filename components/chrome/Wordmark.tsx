"use client";

import Link from "next/link";
import { useTimecode } from "@/lib/timecode";
import { useChromeTheme } from "@/lib/chrome-theme";

/**
 * Top-left brand slot — instead of the static "25:HORAS" wordmark, this now
 * renders the running timecode (HH:MM:SS:FF, starting at 25:00:00:00). Still
 * wrapped in a Link to "/" so it remains the home anchor.
 */
export function Wordmark() {
  const theme = useChromeTheme();
  const tc = useTimecode();
  const primary = theme === "light" ? "text-canvas-black" : "text-canvas-white";

  return (
    <Link
      href="/"
      className={`font-mono text-[12px] tracking-mono-wider ${primary} hover:text-accent-grade transition-colors duration-f-8 tabular-nums`}
      aria-label="25 Horas — home"
    >
      {tc}
    </Link>
  );
}
