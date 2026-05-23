"use client";

import Link from "next/link";
import { useChromeTheme } from "@/lib/chrome-theme";

export function Wordmark() {
  const theme = useChromeTheme();
  const primary = theme === "light" ? "text-canvas-black" : "text-canvas-white";

  return (
    <Link
      href="/"
      className={`font-mono text-[12px] tracking-mono-wider ${primary} hover:text-accent-grade transition-colors duration-f-8`}
      aria-label="25 Horas — home"
    >
      <span>25</span>
      <span className="wordmark-colon mx-[0.18em] text-type-dim">:</span>
      <span>HORAS</span>
    </Link>
  );
}
