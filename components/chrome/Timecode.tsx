"use client";

import { useTimecode } from "@/lib/timecode";

export function Timecode() {
  const tc = useTimecode();
  return (
    <span
      className="font-mono text-[11px] tracking-mono-wide text-type-neutral tabular-nums"
      aria-label="Timecode"
    >
      {tc}
    </span>
  );
}
