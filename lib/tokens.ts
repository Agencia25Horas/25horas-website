// Single source of truth for design tokens. Tailwind config mirrors a subset.

export const colors = {
  canvasBlack: "#0A0A0A",
  canvasWhite: "#F4F0E8",
  accentGrade: "#C7572B",
  signalLive: "#4F9D58",
  typeNeutral: "#B7B0A4",
  typeDim: "#66615A",
  chromeLine: "#1F1D1A",
} as const;

// All durations in frames at 25fps. 1 frame = 40ms.
export const FPS = 25;
export const FRAME_MS = 1000 / FPS;

export const frames = {
  shutter: 4,
  quick: 8,
  hold: 25,
  standard: 12,
  slow: 50,
  pause: 12,
} as const;

export const f = (n: number) => (n * FRAME_MS) / 1000; // seconds — for GSAP

export const audio = {
  bedDb: -24,
  shutterDb: -18,
  clapDb: -12,
  hoverDb: -28,
  duckDb: -6,
} as const;

// Hero sequence timing (seconds from page-ready)
export const heroSequence = {
  projectorAt: 0.3,
  slateInAt: 0.6,
  slateOutAt: 1.5,
  reelInAt: 2.2,
  cueInAt: 3.0,
} as const;
