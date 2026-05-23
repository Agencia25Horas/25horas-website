"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap-setup";
import { HeroReel } from "@/components/reels/HeroReel";
import { Viewfinder } from "@/components/effects/Viewfinder";
import { useAudio } from "@/lib/audio-context";
import { playShutter, playSlateClap } from "@/lib/audio";

const HERO_VIDEO_SRC = "/media/hero.mp4";
const HERO_VIDEO_POSTER = "/media/hero-poster.jpg";

// Atlântico grade is baked into the source mp4 via the ffmpeg pipeline.
// The live WebGL shader (lib/grade-shader.ts) is left in place but disabled
// here for playback perf. Flip on with NEXT_PUBLIC_GRADED=true for an A/B.
const GRADED = process.env.NEXT_PUBLIC_GRADED === "true";

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audio = useAudio();
  const audioRef = useRef(audio);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    audioRef.current = audio;
  }, [audio]);

  // Scroll cue reveals after lock. No pin, no scrub — the video just
  // plays through and the section scrolls past normally.
  useEffect(() => {
    if (!locked) return;
    const cue = cueRef.current;
    if (cue) {
      gsap.fromTo(
        cue,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: 0.6 },
      );
    }
  }, [locked]);

  const handleLock = () => {
    setLocked(true);
    if (audioRef.current.on) {
      playShutter();
      window.setTimeout(() => {
        if (audioRef.current.on) playSlateClap();
      }, 200);
    }
  };

  return (
    <section
      ref={sectionRef}
      data-reel="1"
      className="relative h-[100svh] overflow-hidden bg-canvas-black"
      aria-label="Rolo 01 — Hero"
    >
      <Viewfinder onLock={handleLock} hint="MOVA PARA ENQUADRAR">
        <HeroReel
          videoRef={videoRef}
          src={HERO_VIDEO_SRC}
          poster={HERO_VIDEO_POSTER}
          graded={GRADED}
        />
      </Viewfinder>

      {/* Scroll cue — only appears after lock */}
      <div
        ref={cueRef}
        className="absolute inset-x-0 bottom-[calc(var(--chrome-h-mobile)+1.5rem)] md:bottom-[calc(var(--chrome-h)+1.5rem)] flex justify-center pointer-events-none opacity-0"
      >
        <span className="font-mono text-[11px] tracking-mono-wider text-type-neutral">
          ↓&nbsp;
          <span className="underline underline-offset-4 decoration-type-dim">
            ROLAR
          </span>
        </span>
      </div>
    </section>
  );
}
