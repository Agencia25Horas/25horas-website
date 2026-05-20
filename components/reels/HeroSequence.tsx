"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { Slate } from "@/components/primitives/Slate";
import { HeroReel } from "@/components/reels/HeroReel";
import { useAudio } from "@/lib/audio-context";
import { playProjectorTick, playShutter, playSlateClap } from "@/lib/audio";
import { heroSequence } from "@/lib/tokens";

const HERO_VIDEO_SRC = "/media/hero.mp4";
const HERO_VIDEO_POSTER = "/media/hero-poster.jpg";

// Flip to false for an instant A/B against the Atlântico shader. Useful for
// diagnosing playback issues. Set via env at build time for a permanent off.
const GRADED = process.env.NEXT_PUBLIC_GRADED !== "false";

// Scroll-as-playhead config. 600px of pinned scroll maps to SCRUB_SECONDS of
// reel time, per the cinema-cadence spec.
const SCRUB_DISTANCE_PX = 600;
const SCRUB_SECONDS = 2;

const today = () =>
  new Date().toISOString().slice(0, 10).replaceAll("-", ".");

export function HeroSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const slateRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audio = useAudio();
  const audioRef = useRef(audio);

  const [date, setDate] = useState("·  ·  ·  ·  ·  ·  ·  ·  ·  ·");
  useEffect(() => {
    setDate(today());
  }, []);

  useEffect(() => {
    audioRef.current = audio;
  }, [audio]);

  // The opening 0–3s timeline.
  useEffect(() => {
    const slate = slateRef.current;
    const reel = reelRef.current;
    const cue = cueRef.current;
    if (!slate || !reel || !cue) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    gsap.set([slate, reel, cue], { opacity: 0 });

    if (prefersReduced) {
      gsap.set([reel, cue], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ paused: true });
    tl.call(
      () => {
        if (audioRef.current.on) playProjectorTick();
      },
      undefined,
      heroSequence.projectorAt,
    );
    tl.fromTo(
      slate,
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.16, ease: "steps(1, end)" },
      heroSequence.slateInAt,
    );
    tl.call(
      () => {
        if (audioRef.current.on) playShutter();
      },
      undefined,
      heroSequence.slateInAt,
    );
    tl.to(
      slate,
      { opacity: 0, duration: 0.16, ease: "steps(1, end)" },
      heroSequence.slateOutAt,
    );
    tl.call(
      () => {
        if (audioRef.current.on) playSlateClap();
      },
      undefined,
      heroSequence.slateOutAt,
    );
    tl.fromTo(
      reel,
      { opacity: 0 },
      { opacity: 1, duration: 0.7, ease: "power2.out" },
      heroSequence.reelInAt,
    );
    tl.fromTo(
      cue,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power1.out" },
      heroSequence.cueInAt,
    );
    tl.play();

    return () => {
      tl.kill();
    };
  }, []);

  // Scroll-as-playhead: pin the section, scrub the reel's currentTime.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    // Scrubbing engages only after the user has actually scrolled.
    // Before that, the video autoplays freely. Without this guard,
    // pin's onEnter would fire on mount (since start: "top top" matches
    // the initial scroll position) and freeze the video at frame 0.
    let scrubbing = false;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${SCRUB_DISTANCE_PX}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const p = self.progress;

        if (p > 0 && !scrubbing) {
          scrubbing = true;
          video.pause();
        }

        if (p === 0 && scrubbing) {
          scrubbing = false;
          void video.play().catch(() => {
            // muted autoplay should always succeed; ignore otherwise
          });
          return;
        }

        if (scrubbing) {
          const t = p * SCRUB_SECONDS;
          if (Number.isFinite(t)) {
            try {
              video.currentTime = t;
            } catch {
              // ignore transient seek errors
            }
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-reel="1"
      className="relative h-[100svh] overflow-hidden bg-canvas-black"
      aria-label="Rolo 01 — Hero"
    >
      <HeroReel
        ref={reelRef}
        videoRef={videoRef}
        src={HERO_VIDEO_SRC}
        poster={HERO_VIDEO_POSTER}
        graded={GRADED}
      />

      <div
        ref={slateRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none bg-canvas-black"
      >
        <div className="px-6 max-w-md w-full">
          <Slate
            variant="hero"
            rows={[
              ["ROLO", "01"],
              ["CENA", "01     TAKE  01"],
              ["DIR.", "————————————————"],
              ["LOC.", "LISBOA · PORTUGAL"],
              ["DATA", date],
            ]}
          />
        </div>
      </div>

      <div
        ref={cueRef}
        className="absolute inset-x-0 bottom-[calc(var(--chrome-h-mobile)+1.5rem)] md:bottom-[calc(var(--chrome-h)+1.5rem)] flex justify-center pointer-events-none"
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
