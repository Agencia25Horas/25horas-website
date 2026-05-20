"use client";

import { forwardRef, useEffect, type Ref } from "react";

type Props = {
  src?: string;
  poster?: string;
  videoRef?: Ref<HTMLVideoElement>;
};

// The full-bleed hero film. Plays muted. Real audio (room tone) lives on
// the global audio layer, not here.
export const HeroReel = forwardRef<HTMLDivElement, Props>(function HeroReel(
  { src, poster, videoRef },
  wrapperRef,
) {
  useEffect(() => {
    if (!videoRef || typeof videoRef === "function") return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        // ignored — poster covers the silent gap
      }
    };
    void tryPlay();
  }, [src, videoRef]);

  return (
    <div ref={wrapperRef} className="absolute inset-0 flex items-center justify-center">
      {src ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <Standin />
      )}
    </div>
  );
});

// Placeholder when no source has been wired yet. Doesn't ship to production —
// the real reel always lands before launch.
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
