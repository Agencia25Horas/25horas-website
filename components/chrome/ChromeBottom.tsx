"use client";

import { useEffect, useState } from "react";
import { Timecode } from "./Timecode";
import { ChapterTag } from "./ChapterTag";
import { ScrollCue } from "./ScrollCue";
import { ChromeThemeProvider, type ChromeTheme } from "@/lib/chrome-theme";

type Props = {
  /** Hard-code the chapter (e.g. on a single-reel route). Omit to auto-track. */
  chapter?: number;
  total?: number;
  showCue?: boolean;
  theme?: ChromeTheme;
};

export function ChromeBottom({
  chapter,
  total = 9,
  showCue = true,
  theme = "dark",
}: Props) {
  const [active, setActive] = useState(chapter ?? 1);

  useEffect(() => {
    if (chapter !== undefined) {
      setActive(chapter);
      return;
    }

    const sections =
      document.querySelectorAll<HTMLElement>("[data-reel]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!top) return;
        const n = Number(top.target.getAttribute("data-reel"));
        if (Number.isFinite(n) && n > 0) setActive(n);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapter]);

  const surface =
    theme === "light"
      ? "bg-canvas-white border-t border-black/10"
      : "bg-canvas-black border-t border-chrome-line";

  return (
    <ChromeThemeProvider theme={theme}>
      <footer
        className={`fixed bottom-0 inset-x-0 z-50 h-[var(--chrome-h-mobile)] md:h-[var(--chrome-h)] ${surface} flex items-center justify-between px-4 md:px-6`}
        role="contentinfo"
      >
        <Timecode />
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          {showCue && <ScrollCue />}
        </div>
        <ChapterTag current={active} total={total} />
      </footer>
    </ChromeThemeProvider>
  );
}
