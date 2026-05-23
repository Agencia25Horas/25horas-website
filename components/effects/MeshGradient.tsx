"use client";

import { useEffect, useRef } from "react";

type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

type Props = {
  className?: string;
  /** Background colour painted on every frame before blobs are layered. */
  baseColor?: string;
  /** Soft cream/sand blob colours. Use rgba with low alpha. */
  colors?: string[];
  /** Animation speed multiplier. Lower = more ambient. */
  speed?: number;
};

const DEFAULT_COLORS = [
  "rgba(255, 250, 240, 0.85)",  // warm ivory
  "rgba(248, 240, 222, 0.7)",   // soft sand
  "rgba(252, 245, 232, 0.6)",   // pale cream
  "rgba(244, 232, 218, 0.55)",  // muted clay
];

// Lava-lamp mesh gradient — animated radial blobs blended with 'lighter'
// composite for organic, additive cream tones. Adapted from
// items/mesh-gradient.html. GPU-friendly: pure 2D canvas, ~25fps draw.
export function MeshGradient({
  className = "",
  baseColor = "rgba(244, 240, 232, 1)",
  colors = DEFAULT_COLORS,
  speed = 0.35,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const blobs: Blob[] = colors.map((c) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      r: 0.3 + Math.random() * 0.2,
      color: c,
    }));

    let rafId = 0;
    let paused = false;

    const resize = () => {
      // 2x DPR for crispness on Retina without crushing perf.
      // Defensive: parent may have zero size during initial mount; we'll
      // try again when ResizeObserver fires with real dimensions.
      const ow = canvas.offsetWidth;
      const oh = canvas.offsetHeight;
      if (ow > 0 && oh > 0) {
        canvas.width = ow * 2;
        canvas.height = oh * 2;
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onVis = () => {
      paused = document.visibilityState === "hidden";
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (paused) return;
      const w = canvas.width;
      const h = canvas.height;
      // Skip if canvas not yet sized — createRadialGradient with r === 0
      // throws InvalidStateError. ResizeObserver will trigger another draw
      // once the canvas has real dimensions.
      if (w < 4 || h < 4) return;

      try {
        ctx.fillStyle = baseColor;
        ctx.fillRect(0, 0, w, h);
        const maxDim = Math.max(w, h);
        blobs.forEach((b) => {
          b.x += b.vx / w;
          b.y += b.vy / h;
          if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
          if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;
          const radius = Math.max(1, b.r * maxDim);
          const grd = ctx.createRadialGradient(
            b.x * w,
            b.y * h,
            0,
            b.x * w,
            b.y * h,
            radius,
          );
          grd.addColorStop(0, b.color);
          grd.addColorStop(1, "rgba(0,0,0,0)");
          ctx.globalCompositeOperation = "lighter";
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, w, h);
          ctx.globalCompositeOperation = "source-over";
        });
      } catch (err) {
        // Swallow transient canvas errors during layout/resize so they
        // don't spam the console. The next frame will retry.
        console.warn("[MeshGradient] draw skipped:", err);
      }
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [colors, speed, baseColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`block absolute inset-0 pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
