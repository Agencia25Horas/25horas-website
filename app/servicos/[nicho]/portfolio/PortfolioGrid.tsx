"use client";

import { useEffect } from "react";
import { useAudio } from "@/lib/audio-context";
import {
  PLATFORM_ASPECT,
  type PortfolioItem,
} from "@/lib/portfolio";

/**
 * Renders the portfolio grid for a niche and arbitrates audio focus:
 * when the user clicks into any iframe (about to play a video), the
 * background music auto-pauses so it doesn't compete with the video.
 * Resume requires an explicit click on the SOM toggle.
 */
export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const { on, toggle } = useAudio();

  useEffect(() => {
    if (!on) return;
    const onBlur = () => {
      // Defer one tick so document.activeElement reflects the new focus.
      setTimeout(() => {
        const el = document.activeElement;
        if (el && el.tagName === "IFRAME") {
          void toggle();
        }
      }, 0);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [on, toggle]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, i) => (
        <figure key={`${item.platform}-${i}`} className="space-y-3">
          <div
            className="relative w-full overflow-hidden bg-chrome-line/30"
            style={{ aspectRatio: PLATFORM_ASPECT[item.platform] }}
          >
            <iframe
              src={item.embed}
              title={item.caption ?? `${item.platform} post`}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
          {item.caption && (
            <figcaption className="font-body text-[13px] leading-snug text-type-neutral/85">
              {item.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
