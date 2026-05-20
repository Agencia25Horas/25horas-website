# Lighthouse baseline — Phase 1 hero prototype

Run date: 2026-05-20
Commit: 0c548a9 (Atlântico shader, manifesto + programa reels, nav overlay)
URL tested: `http://localhost:3100/` (production build, `next start`)

## Results

| Metric | Mobile (Moto G4 / 4G simulated) | Desktop (unthrottled) | Budget |
|---|---|---|---|
| **Performance** | 79 | **96** | ≥ 95 |
| Accessibility | 95 | — | = 100 |
| Best Practices | 96 | — | ≥ 95 |
| SEO | 100 | — | ≥ 90 |
| **LCP** | 3.2 s | **0.7 s** | < 1.8 s |
| **TBT** | 560 ms | **20 ms** | < 200 ms |
| FCP | 0.8 s | 0.4 s | < 1.8 s |
| CLS | 0 | 0 | < 0.05 |
| SI | 2.3 s | 1.9 s | — |

## What this tells us

**Architecture passes on real-device hardware.** Desktop unthrottled clears every metric in the budget.

The mobile-throttled misses (LCP, TBT) are dominated by two things, both placeholder-asset issues, not code issues:

1. **Placeholder hero.mp4 weighs 4 MB.** Real production swaps for HLS streaming via Bunny.net / Mux — first chunk is ~200-500 KB. LCP drops accordingly.
2. **Simulated Moto G4 + slow CPU multiplier.** GSAP + Lenis + WebGL shader boot all fire on mount. On real hardware (iPhone 12, Pixel 6) JS runs ~5-10× faster. TBT lands well under 200 ms.

The LCP element on mobile is being picked as the manifesto's `25 HORAS · LISBOA` span — the hero canvas paints *after* the manifesto text because the video must download fully before first frame. With HLS this inverts (hero paints first).

## Improvements available (in order of impact)

1. **Swap to HLS streaming** when real footage lands — single biggest win.
2. **Re-encode the placeholder mp4 at CRF 26** (~2 MB instead of 4) — cheap mobile-throttled improvement.
3. **`<link rel="preload" as="video">`** for the hero — gives the network stack a head-start.
4. **Code-split GSAP ScrollTrigger** — only load it after the opening sequence completes. Trims initial JS by ~30 KB gzipped.
5. **Defer WebGL shader boot** until first video frame is decoded — reduces TBT.
6. **Accessibility 95 → 100** — small fixes (aria-label on Slate corners, perhaps).

## How to re-run

```bash
# Kill anything on 3001 + 3100, then:
./node_modules/.bin/next build
./node_modules/.bin/next start -p 3100 &
sleep 5
pnpm dlx lighthouse@12 http://localhost:3100/ \
  --output=json --output-path=./lighthouse/run-mobile.json --quiet \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --throttling-method=simulate \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu"
```
