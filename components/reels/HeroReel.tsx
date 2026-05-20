"use client";

import { forwardRef, type Ref } from "react";
import { GradedVideo } from "@/components/effects/GradedVideo";

type Props = {
  src?: string;
  poster?: string;
  videoRef?: Ref<HTMLVideoElement>;
  /** Toggle the Atlântico shader off — useful for A/B perf comparison. */
  graded?: boolean;
};

// The full-bleed hero film. Plays muted, runs through the Atlântico grade
// shader. Room tone lives on the global audio layer, not here.
export const HeroReel = forwardRef<HTMLDivElement, Props>(function HeroReel(
  { src, poster, videoRef, graded = true },
  wrapperRef,
) {
  if (!src) {
    return (
      <div ref={wrapperRef} className="absolute inset-0 flex items-center justify-center">
        <Standin />
      </div>
    );
  }

  return (
    <GradedVideo
      ref={wrapperRef}
      src={src}
      poster={poster}
      videoRef={videoRef}
      graded={graded}
    />
  );
});

function Standin() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, #1a1410 0%, #0a0a0a 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10px] tracking-mono-wider text-type-dim">
          ░░ SEM ROLO ·  AGUARDAR FILME ░░
        </span>
      </div>
    </div>
  );
}
