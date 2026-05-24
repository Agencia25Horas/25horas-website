"use client";

import { useEffect, useState } from "react";
import { FPS } from "./tokens";

// Returns a string `HH:MM:SS:FF` advancing at FPS from a base offset.
// Default offset is 25 hours (25:00:00:00) — the brand counter convention.
export function useTimecode(baseFrames = FPS * 60 * 60 * 25) {
  const [tc, setTc] = useState(() => formatFrames(baseFrames));

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let lastFrame = -1;

    const tick = (now: number) => {
      const elapsedFrames = Math.floor(((now - start) / 1000) * FPS);
      if (elapsedFrames !== lastFrame) {
        lastFrame = elapsedFrames;
        setTc(formatFrames(baseFrames + elapsedFrames));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseFrames]);

  return tc;
}

function formatFrames(totalFrames: number): string {
  const ff = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

const pad = (n: number) => n.toString().padStart(2, "0");
