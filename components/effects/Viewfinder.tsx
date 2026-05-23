"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "@/lib/gsap-setup";

type Phase = "idle" | "viewing" | "locked";

type Props = {
  /** The reel (or anything) rendered behind the mask. */
  children: ReactNode;
  /** Called once when the user locks the viewfinder (click / tap / Enter). */
  onLock?: () => void;
  /** Hint copy shown before the user has moved the cursor. */
  hint?: string;
};

// Cinema viewfinder — masks the children to a 2.39:1 window tracked to the
// cursor. Click anywhere to expand the window to full bleed and lock.
// Built with four absolutely-positioned black panels that surround the
// viewfinder rectangle — cheaper to animate than clip-path or CSS masks
// and reliably 60fps on every browser we care about.
export function Viewfinder({ children, onLock, hint = "MOVA PARA ENQUADRAR" }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  phaseRef.current = phase;

  // Sizing for the viewfinder rectangle. The defaults below are the "viewing"
  // state. We animate to viewport dimensions for the locked state.
  const SIZE = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Compute the viewfinder dimensions based on stage size.
    // Desktop ~ 36vw width clamped to a sensible range. Mobile gets a chunkier
    // share since touch targets are bigger.
    const computeSize = () => {
      const rect = stage.getBoundingClientRect();
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const w = isTouch
        ? Math.min(rect.width * 0.78, 540)
        : Math.max(360, Math.min(rect.width * 0.36, 640));
      const h = w / 2.39;
      SIZE.current = { w, h };
      stage.style.setProperty("--vw", `${w}px`);
      stage.style.setProperty("--vh", `${h}px`);
    };
    computeSize();
    const ro = new ResizeObserver(computeSize);
    ro.observe(stage);

    // Initial cursor position — center of stage. Until the user moves,
    // we render in the "idle" state (no mask, just black overlay).
    const initialRect = stage.getBoundingClientRect();
    stage.style.setProperty("--vx", `${initialRect.width / 2}px`);
    stage.style.setProperty("--vy", `${initialRect.height / 2}px`);

    if (prefersReduced) {
      // Skip viewfinder entirely. Lock immediately, full bleed.
      setPhase("locked");
      stage.style.setProperty("--vw", `${initialRect.width}px`);
      stage.style.setProperty("--vh", `${initialRect.height}px`);
      onLock?.();
      return () => ro.disconnect();
    }

    // Smoothed cursor follow — GSAP quickTo gives a tactile ~250ms lag
    // without per-frame React state churn.
    const xTo = gsap.quickTo(stage, "--vx", {
      duration: 0.28,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(stage, "--vy", {
      duration: 0.28,
      ease: "power3.out",
    });

    const handlePoint = (clientX: number, clientY: number) => {
      const rect = stage.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      // Constrain so the viewfinder doesn't bleed past the stage edges.
      const { w, h } = SIZE.current;
      const cx = Math.max(w / 2, Math.min(rect.width - w / 2, x));
      const cy = Math.max(h / 2, Math.min(rect.height - h / 2, y));
      xTo(cx);
      yTo(cy);
      if (phaseRef.current === "idle") setPhase("viewing");
    };

    const onMouseMove = (e: MouseEvent) => {
      if (phaseRef.current === "locked") return;
      handlePoint(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current === "locked") return;
      const t = e.touches[0];
      if (!t) return;
      handlePoint(t.clientX, t.clientY);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (phaseRef.current === "locked") return;
      const t = e.touches[0];
      if (!t) return;
      handlePoint(t.clientX, t.clientY);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      ro.disconnect();
    };
  }, [onLock]);

  // Lock: expand viewfinder to full bleed, fade out the corner brackets,
  // signal the parent so it can reveal chrome / start the scroll story.
  const lock = () => {
    if (phaseRef.current !== "viewing") return;
    const stage = stageRef.current;
    const corners = cornersRef.current;
    if (!stage) return;

    setPhase("locked");

    const rect = stage.getBoundingClientRect();

    gsap.to(stage, {
      "--vw": `${rect.width}px`,
      "--vh": `${rect.height}px`,
      "--vx": `${rect.width / 2}px`,
      "--vy": `${rect.height / 2}px`,
      duration: 0.8,
      ease: "expo.inOut",
    });

    if (corners) {
      gsap.to(corners, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    onLock?.();
  };

  return (
    <div
      ref={stageRef}
      onClick={lock}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          lock();
        }
      }}
      tabIndex={0}
      role="region"
      aria-label="Visor da câmara"
      className="absolute inset-0 cursor-none focus:outline-none select-none"
      style={
        {
          // these initialise to avoid a flash before useEffect computes them
          "--vx": "50%",
          "--vy": "50%",
          "--vw": "0px",
          "--vh": "0px",
        } as React.CSSProperties
      }
    >
      {/* The content (reel) — sits at full bleed underneath everything. */}
      <div className="absolute inset-0">{children}</div>

      {/* SINGLE backdrop-blur overlay with a polygon clip-path that punches
          a rectangular hole at the viewfinder. Replaces the previous 4-panel
          approach (which caused stacked backdrop-filter artefacts where the
          panels met at the corners — visible as an "extra blur rectangle"
          over the cursor). One element, one blur pass, clean edges. */}
      <div
        className="absolute inset-0 pointer-events-none vf-mask"
        style={{
          background: "rgba(10, 10, 10, 0.32)",
          backdropFilter: "blur(22px) saturate(0.85)",
          WebkitBackdropFilter: "blur(22px) saturate(0.85)",
          // Outer rectangle clockwise, bridge from outer to inner via the
          // left edge at the viewfinder's vertical centre, then trace the
          // inner counter-clockwise to create a hole.
          clipPath: `polygon(
            0% 0%,
            100% 0%,
            100% 100%,
            0% 100%,
            0% calc(var(--vy) + var(--vh) / 2),
            calc(var(--vx) - var(--vw) / 2) calc(var(--vy) + var(--vh) / 2),
            calc(var(--vx) + var(--vw) / 2) calc(var(--vy) + var(--vh) / 2),
            calc(var(--vx) + var(--vw) / 2) calc(var(--vy) - var(--vh) / 2),
            calc(var(--vx) - var(--vw) / 2) calc(var(--vy) - var(--vh) / 2),
            calc(var(--vx) - var(--vw) / 2) calc(var(--vy) + var(--vh) / 2),
            0% calc(var(--vy) + var(--vh) / 2),
            0% 0%
          )`,
        }}
        aria-hidden
      />

      {/* Viewfinder corner brackets — cinema EVF style. */}
      <div
        ref={cornersRef}
        className="absolute pointer-events-none transition-opacity duration-f-12"
        style={{
          left: "calc(var(--vx) - var(--vw) / 2)",
          top: "calc(var(--vy) - var(--vh) / 2)",
          width: "var(--vw)",
          height: "var(--vh)",
          opacity: phase === "idle" ? 0 : 1,
        }}
        aria-hidden
      >
        <Corner pos="tl" />
        <Corner pos="tr" />
        <Corner pos="bl" />
        <Corner pos="br" />

        {/* Center reticle — tiny + crosshair */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden
        >
          <div className="relative w-3 h-3">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-canvas-white/50" />
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-canvas-white/50" />
          </div>
        </div>

        {/* Frame info — top-right edge */}
        <div className="absolute top-2 right-2 font-mono text-[9px] tracking-mono-wider text-canvas-white/70">
          2.39 : 1
        </div>
        <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-mono-wider text-canvas-white/70">
          ● REC
        </div>
      </div>

      {/* Idle hint — fades out on first cursor movement */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-f-12"
        style={{ opacity: phase === "idle" ? 1 : 0 }}
        aria-live="polite"
      >
        <span className="font-mono text-[11px] tracking-mono-wider text-type-neutral">
          ↕ {hint}
        </span>
      </div>

      {/* Lock hint — appears once user is viewing */}
      <div
        className="absolute inset-x-0 bottom-[calc(var(--chrome-h-mobile)+1rem)] md:bottom-[calc(var(--chrome-h)+1rem)] pointer-events-none flex justify-center transition-opacity duration-f-12"
        style={{ opacity: phase === "viewing" ? 1 : 0 }}
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-mono-wider text-type-dim">
          CLIQUE PARA FIXAR
        </span>
      </div>
    </div>
  );
}

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  // L-bracket built from two thin lines. 14px arms, 1px thick.
  const isTop = pos === "tl" || pos === "tr";
  const isLeft = pos === "tl" || pos === "bl";
  return (
    <div
      className="absolute w-3.5 h-3.5"
      style={{
        top: isTop ? -1 : "auto",
        bottom: isTop ? "auto" : -1,
        left: isLeft ? -1 : "auto",
        right: isLeft ? "auto" : -1,
      }}
    >
      <div
        className="absolute bg-canvas-white"
        style={{
          width: "100%",
          height: 1,
          top: isTop ? 0 : "auto",
          bottom: isTop ? "auto" : 0,
        }}
      />
      <div
        className="absolute bg-canvas-white"
        style={{
          width: 1,
          height: "100%",
          left: isLeft ? 0 : "auto",
          right: isLeft ? "auto" : 0,
        }}
      />
    </div>
  );
}
