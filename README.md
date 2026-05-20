# 25 Horas — Landing Page

> *"Não fazemos vídeos. Fazemos filmes para marcas."*

Cinematic landing page for **Agência 25 Horas** ([@25horas.agency](https://instagram.com/25horas.agency)) — a Portuguese audiovisual studio working across hospitality, real estate, sports, institutional, music and events.

Concept locked: **"25 Frames"** — the number in the name is the design system. 2.39:1 anamorphic, 25fps cadence, slate typography, ambient room tone, one house LUT graded across every frame. Full strategy + visuals in the docs at repo root.

## Docs

- [`MANUAL.md`](MANUAL.md) — strategy bible: market study, competitive analysis, three concept directions, recommended architecture, build roadmap, risks.
- [`CONCEPT_A_VISUAL.md`](CONCEPT_A_VISUAL.md) — visual structure for the chosen concept: frame-by-frame storyboard, chrome anatomy, page wireframes, motion timing, sound layer, design tokens.

Read both before touching code. The visual grammar is the brand.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000 (3001 if 3000 is busy)
```

If `pnpm dev` complains about ignored build scripts (sharp), it's a pnpm v11 thing — already handled in `pnpm-workspace.yaml`. Worst case: `./node_modules/.bin/next dev` bypasses pnpm's wrapper.

## What you should see

Open the URL. The opening 3 seconds:

1. **t = 0** — pure black, chrome bars top + bottom, SOM toggle pulsing softly in the top-right
2. **t = 0.6s** — slate snaps in with corner notches and a pulsing REC dot
3. **t = 1.5s** — slate snaps out (slate clap if SOM is on)
4. **t = 2.2s** — hero reel fades in, graded live through the Atlântico WebGL shader
5. **t = 3.0s** — `↓ ROLAR` scroll cue appears

Click `SOM` to enable audio (room tone, projector tick, shutter, slate clap — all synthesized via Web Audio, no sound files). Scroll: the section pins for 600px and the reel scrubs the first 2 seconds.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (app router) + React 19 |
| Styling | Tailwind 3 + design tokens in `lib/tokens.ts` |
| Animation | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis (tuned fast — not the lazy default ease) |
| 3D / shaders | Vanilla WebGL (Atlântico grade in `lib/grade-shader.ts`) |
| Audio | Web Audio synthesis (`lib/audio.ts`) |
| Video | HTML5 `<video>` with HLS planned for production |
| Fonts | Cormorant Garamond / Inter / JetBrains Mono — all placeholders, see *Swap-in points* below |

## Structure

```
.
├── MANUAL.md · CONCEPT_A_VISUAL.md           strategy + visuals
├── app/
│   ├── layout.tsx                            fonts, providers
│   ├── globals.css                           tokens, slate frame, keyframes
│   └── page.tsx                              the hero
├── components/
│   ├── chrome/                               persistent UI (letterbox, timecode, etc.)
│   ├── primitives/Slate.tsx                  the one component everything reuses
│   ├── effects/GradedVideo.tsx               <video> → WebGL grade pipeline
│   └── reels/                                HeroReel, HeroSequence, NextReelTeaser
├── lib/
│   ├── tokens.ts                             colors, 25fps frame math, sequence timing
│   ├── timecode.ts                           useTimecode hook (live 25fps counter)
│   ├── audio.ts                              Web Audio synthesis primitives
│   ├── audio-context.tsx                     AudioProvider, useAudio()
│   ├── lenis-provider.tsx                    smooth scroll + GSAP/ScrollTrigger sync
│   ├── grade-shader.ts                       Atlântico WebGL fragment shader
│   └── first-visit.ts                        useFirstVisit("som") for the SOM hint
└── public/media/
    ├── hero.mp4                              placeholder, replace with real reel
    └── hero-poster.jpg                       auto-generated from frame 75 of hero
```

## Swap-in points (what to replace before launch)

| File / asset | Currently | Replace with |
|---|---|---|
| `public/media/hero.mp4` | Mixkit CC0 14.5s clip (1920×802 @ 25fps) | 25Horas's real showreel, ProRes → encoded via same ffmpeg pipeline |
| `public/media/hero-poster.jpg` | Auto-extracted from hero.mp4 | Auto-regenerates from any hero.mp4 swap |
| Serif font (Cormorant Garamond) | Google Fonts placeholder | **PP Editorial New** or **Söhne Breit** (licensed). Edit `app/layout.tsx`. |
| Body font (Inter) | Google Fonts | Söhne or ABC Diatype (licensed) if budget allows; Inter is fine for v1 |
| Mono font (JetBrains Mono) | Google Fonts | Söhne Mono or IBM Plex Mono — JetBrains is also fine |
| Atlântico grade | Tuned in `lib/grade-shader.ts` | Final pass with a colorist before launch — export a real `.cube` and apply via LUT texture |

## Performance budget (contractual — see MANUAL.md §6.3)

| Metric | Budget |
|---|---|
| LCP | < 1.8s |
| INP | < 200ms |
| CLS | < 0.05 |
| JS bundle (initial, gzipped) | < 180kb |
| First reel TTFF | < 800ms on 4G |
| Scroll FPS | 60fps M1 / 30fps mid-Android |
| Lighthouse Perf (mobile) | ≥ 95 |
| Lighthouse A11y | = 100 |

Verify before any commit that claims a feature is done.

## Phase 1 prototype scope

Only `/` (the hero reel) ships in Phase 1. The opening 3s, the audio synthesis, the live grade, the scroll-as-playhead. Everything else (`/manifesto`, `/programa`, `/caso/*`, etc.) is stubbed by `NextReelTeaser` until later phases. Roadmap in `MANUAL.md` §9.

## License

Closed source. © 25 Horas, all rights reserved.
