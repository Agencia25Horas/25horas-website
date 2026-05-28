import type { Config } from "tailwindcss";

// Mirrors lib/tokens.ts. Kept in sync by hand for now.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "canvas-black": "#0A0A0A",
        "canvas-white": "#FFFFFF",
        "canvas-cream": "#F5F0E8",
        // Accent grade — Tomatino-tomate (warm vermelho/laranja). Used for
        // CTAs, links em estado activo, e qualquer destaque pontual.
        "accent-grade": "#E85D3A",
        "signal-live": "#4F9D58",
        "type-neutral": "#4A4A4A",
        "type-dim": "#8A8A8A",
        "chrome-line": "#E5E5E5",
      },
      fontFamily: {
        // Anton 400 = heavy condensed display. Tomatino-Heavy stand-in.
        // Source Serif 4 = editorial body serif.
        // `serif` alias mapped a `display` para que legacy `font-serif`
        // continue a renderizar como heavy display (consistente com a home).
        display: ["var(--font-display)", "Anton", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Source Serif 4", "Georgia", "serif"],
        serif: ["var(--font-display)", "Anton", "Impact", "sans-serif"],
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
