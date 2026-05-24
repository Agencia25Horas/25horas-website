import type { Config } from "tailwindcss";

// Mirrors lib/tokens.ts. Kept in sync by hand for now.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "canvas-black": "#0A0A0A",
        "canvas-white": "#F5F0E8",
        "accent-grade": "#C7572B",
        "signal-live": "#4F9D58",
        "type-neutral": "#B7B0A4",
        "type-dim": "#66615A",
        "chrome-line": "#1F1D1A",
      },
      fontFamily: {
        // wired in app/layout.tsx via next/font CSS variables
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        "mono-wide": "0.06em",
        "mono-wider": "0.08em",
      },
      // 25fps timing tokens — durations in seconds (1 frame = 0.04s)
      transitionDuration: {
        "f-4": "160ms",
        "f-8": "320ms",
        "f-12": "480ms",
        "f-25": "1000ms",
        "f-50": "2000ms",
      },
      transitionTimingFunction: {
        "shutter": "steps(1, end)",
        "cinema": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      aspectRatio: {
        scope: "2.39 / 1",
      },
    },
  },
  plugins: [],
};

export default config;
