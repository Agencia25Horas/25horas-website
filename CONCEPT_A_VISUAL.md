# Concept A — "25 Frames" · Visual Structure

A visual companion to `MANUAL.md`. Wireframes, frame-by-frame timing, chrome anatomy, type & color specimens, page layouts. Built so you can walk a client through the experience without writing a line of code.

All diagrams are ASCII. Treat box widths as proportional, not pixel-accurate.

---

## 1. The visual grammar (one-page primer)

The whole site obeys five rules. If a design choice doesn't follow one of these, it doesn't ship.

```
┌────────────────────────────────────────────────────────────────────────┐
│  1. EVERYTHING IS IN A FRAME.       2.39:1 letterbox, always.          │
│  2. EVERYTHING RUNS AT 25fps.       Cuts on the 25th frame. No 60fps   │
│                                     mograph smoothness.                │
│  3. EVERYTHING IS GRADED.           One house LUT on every frame,      │
│                                     every UI accent.                   │
│  4. EVERYTHING SOUNDS.              Room tone bed, real slate claps,   │
│                                     subtle hover ticks. Toggled.       │
│  5. EVERYTHING IS A SLATE.          Sections, cases, transitions —     │
│                                     all introduced by a mono slate.    │
└────────────────────────────────────────────────────────────────────────┘
```

Negative-space rules (what the site explicitly is *not*):

```
✗ no cursor-following gradient blobs
✗ no marquee text tickers
✗ no default Lenis lazy ease
✗ no word-by-word scroll reveals
✗ no card-grid portfolios
✗ no stock B-roll of teams high-fiving
✗ no 45-second intros
✗ no third-party video chrome (no Vimeo / YouTube embeds)
```

---

## 2. The opening 3 seconds — frame by frame

The make-or-break moment. Each frame below = ~12 frames at 25fps (about half a second). Read top-to-bottom as a storyboard.

### Frame 00:00:00 — t = 0.0s
*Pure black. Full screen. Nothing else. Browser tab favicon = a tiny mono "25:" lockup. Page weight before this paint: ~20kb.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                       ·                                          │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Frame 00:00:08 — t = 0.3s
*A single soft mechanical sound — a projector start / shutter click. Room tone fades in beneath at -24dB. Still black.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                       ·                                          │
│                                       │  ◀── single faint cursor pulse           │
│                                       ·                                          │
│                                                                                  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
                                  ♪ projector tick · room tone -24dB
```

### Frame 00:00:15 — t = 0.6s
*Slate enters. Mono type, lower-left. Real shutter click on entry. Top-right counter reads `01:00:00:00`.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                     01:00:00:00 │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│  ┌────────────────────────────────┐                                              │
│  │ PROD.   25 HORAS               │                                              │
│  │ ROLO    01                     │                                              │
│  │ CENA    01    TAKE  01         │                                              │
│  │ DIR.    ____________________   │                                              │
│  │ DATA    2026.05.20             │                                              │
│  └────────────────────────────────┘                                              │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Frame 00:00:37 — t = 1.5s
*Slate snaps off-screen on a real recorded slate-clap. Black holds for one beat (12 frames). This is the editor's pause — the most expensive 0.5s on the site.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘
                                  CLACK ♪  ·   ··· hold ···
```

### Frame 00:00:55 — t = 2.2s
*First frame of the hero reel rolls in 2.39:1. Letterbox bars are now the UI chrome. Timecode in the corner starts advancing at 25fps. Reel is graded with the house LUT.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │  ← top bar = chrome
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│             ░░░░░░░░░░░░░ HERO REEL · 2.39:1 · 25p ░░░░░░░░░░░░░░░░               │
│             ░░░░░░░░░░░░░ graded · diegetic muted ░░░░░░░░░░░░░░░░░               │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:00:02:05                                                              ↓      │  ← bottom bar = chrome
└──────────────────────────────────────────────────────────────────────────────────┘
                                  ♪ room tone -18dB · reel muted
```

### Frame 00:01:15 — t = 3.0s
*Scroll cue resolves under the timecode. No animation on the cue itself — it just *is*. A single mono "↓ ROLAR" with a thin underline. User now knows what to do.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│             ░░░░░░░░░░░░░ HERO REEL · cont. ░░░░░░░░░░░░░░░░░░░░░░               │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:00:03:00                       ↓ ROLAR                                       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Letterbox chrome anatomy

The bars aren't dead space. They're the entire navigation surface.

### Desktop chrome

```
                                                Y-zones (top → bottom)
┌────────────────────────────────────────────────────────────────────────┐  ▲
│ ① WORDMARK         ② LANG   ③ NAV   ④ AUDIO     │ TOP BAR · 11vh / dark │  │ 0–11vh
├────────────────────────────────────────────────────────────────────────┤  │
│                                                                        │  │
│                                                                        │  │
│                   ⑤ STAGE — 2.39:1 video / content                     │  │ 11–89vh
│                                                                        │  │
│                                                                        │  │
├────────────────────────────────────────────────────────────────────────┤  │
│ ⑥ TIMECODE             ⑦ SCROLL/STATE              ⑧ CHAPTER   │ BOTTOM │ 89–100vh
└────────────────────────────────────────────────────────────────────────┘  ▼
                                                                  X-zones (left → right)
```

**Top bar** (11vh, near-black `#0A0A0A`, 12px inner padding):
- ① `25 : HORAS` wordmark, mono, 14px tracking +60. Left-aligned. Click → home.
- ② Language toggle `PT · EN`. The non-active one is `#666`. Tap to swap.
- ③ Nav opener `☰` — opens the programme overlay (see §6).
- ④ Audio toggle `◉ SOM` (Active) / `○ SOM` (Muted). Color: live signal indicator dot (green when sound bed playing).

**Bottom bar** (11vh):
- ⑥ Live timecode `HH:MM:SS:FF` at 25fps, mono, left.
- ⑦ Centre: scroll cue (`↓ ROLAR`) on hero; chapter title on inner pages; slate `CENA / TAKE` on cases.
- ⑧ Chapter index right (`02 / 09`) — where in the film you are.

### Mobile chrome (≤ 640px)

Smaller, but the 2.39:1 frame holds. Vertical real-estate above/below is generous because portrait phones have it to spare.

```
┌────────────────────────────────┐  ▲
│ 25:HORAS           PT  ☰  ◉   │  │ TOP    14vh
├────────────────────────────────┤  │
│                                │  │
│                                │  │
│         ⑤ STAGE 2.39:1         │  │ STAGE  72vh
│                                │  │
│                                │  │
├────────────────────────────────┤  │
│ 01:00:03:00          02 / 09   │  │ BOTTOM 14vh
│             ↓ ROLAR             │  ▼
└────────────────────────────────┘
```

---

## 4. The slate — the one component that ties everything together

Every section, every case, every transition begins with a slate. It's the most reused component on the site. Design it once, deploy everywhere.

```
┌───────────────────────────────────────────┐
│  PROD.     25 HORAS                       │   ← all-caps mono, 12px, tracking +60
│  ROLO      03 · PROGRAMA HOSPITALIDADE    │
│  CENA      02       TAKE   01             │
│  CLIENTE   VILA GALÉ                      │
│  DIR.      ANA P. SANTOS                  │
│  DATA      2026.05.20                     │
│  DURAÇÃO   00:01:32:14                    │
├───────────────────────────────────────────┤
│                                           │   ← thin divider, 1px, accent color
│  ▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮  │   ← color bars (SMPTE-style, optional)
└───────────────────────────────────────────┘
```

**Variants:**
- **Hero slate** (long, ceremonial — used in opening 3s only).
- **Case slate** (above each case film — full credit set).
- **Section slate** (lighter — just PROD/ROLO/CENA).
- **Transition slate** (between sections — minimal, just CENA + TAKE, snaps in/out).

**Motion rules:**
- Enters with a recorded shutter click (12 frames).
- Holds for at least 25 frames (1 second at 25fps).
- Exits with a slate-clap (8 frames).
- If `prefers-reduced-motion`: appears in 1 frame, holds, disappears in 1 frame. No sound unless audio toggle is on.

---

## 5. Type system

Three families. No more.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  EDITORIAL SERIF        SUGGESTED: PP Editorial New, or Söhne Breit       │
│  ───────────────                                                          │
│  Aa Bb 25 Horas         Used for: case titles, manifesto, programme       │
│  Rr Ss Tt 0123          headings. Where the site needs to feel like A24. │
│  size 64 / 96 / 144     Restraint: only 3 weights. No italics.            │
│                                                                          │
│  GROTESK BODY           SUGGESTED: Söhne, ABC Diatype, or Inter           │
│  ─────────────                                                            │
│  Aa Bb 25 Horas         Used for: paragraph copy, case credits, CTAs.    │
│  Rr Ss Tt 0123          Variable weight 400–700. Tracking 0 to -2.       │
│  size 14 / 16 / 18                                                       │
│                                                                          │
│  MONO TECHNICAL         SUGGESTED: JetBrains Mono, IBM Plex Mono         │
│  ──────────────                                                          │
│  Aa Bb 25:HORAS         Used for: slates, timecodes, chrome, nav,        │
│  Rr Ss Tt 0123          form labels. THE FILM-LANGUAGE TYPE.             │
│  size 11 / 12 / 14      Always uppercase. Tracking +40 to +80.           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Scale (concrete tokens — paste into Figma / Tailwind)

| Token | Size (rem) | Px (16px base) | Use |
|---|---|---|---|
| `t-mono-xs` | 0.6875 | 11 | Timecode, chrome labels |
| `t-mono-sm` | 0.75 | 12 | Slate body |
| `t-mono-md` | 0.875 | 14 | Wordmark, nav |
| `t-body-sm` | 0.875 | 14 | Captions |
| `t-body-md` | 1.0 | 16 | Paragraph |
| `t-body-lg` | 1.125 | 18 | Manifesto body |
| `t-serif-md` | 2.0 | 32 | Case caption |
| `t-serif-lg` | 4.0 | 64 | Programme heading |
| `t-serif-xl` | 6.0 | 96 | Manifesto headline |
| `t-serif-display` | 9.0 | 144 | Hero text (rare — currently unused; reserved) |

---

## 6. Color & grade

Three-color system. No gradients, no blobs. The fourth "color" is the LUT.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  CANVAS BLACK    #0A0A0A    ████████████████  the void. 95% of surfaces.│
│  CANVAS WHITE    #F4F0E8    ████████████████  warm off-white. Manifesto.│
│  ACCENT GRADE    #C7572B    ████████████████  terracotta. LUT-pulled.    │
│  SIGNAL LIVE     #4F9D58    ████████████████  audio "on" dot. SMPTE green│
│                                                                          │
│  TYPE NEUTRAL    #B7B0A4    ████████████████  body on black              │
│  TYPE DIM        #66615A    ████████████████  inactive nav, chrome        │
│  CHROME LINE     #1F1D1A    ████████████████  letterbox bar fill          │
└──────────────────────────────────────────────────────────────────────────┘
```

### The house LUT (the brand)

The single most distinctive design asset on the site. Designed once (Lightroom or DaVinci), exported as a `.cube`, applied as a fragment shader on top of every video frame. Specifications:

```
HOUSE LUT — "Atlântico"
───────────────────────
Shadows:    lifted +0.04, cool-shifted (cyan in blacks, ~5%)
Midtones:   warm-shifted, slight magenta pull
Highlights: rolled-off, slight warm halation
Saturation: -10% global, then +15% on warm channel (orange/yellow)
Contrast:   medium-low, S-curve avoided
Grain:      optional overlay, 35mm tight grain, 6% opacity

Reference look: A24 + Hou Hsiao-hsien late-afternoon
                + a touch of Portuguese Atlantic haze
```

Applied as a `ShaderMaterial` on the video element. Performance cost: ~0.4ms per frame on M1, ~1.2ms on iPhone 12. Within budget.

---

## 7. Page-by-page wireframes

### 7.1 `/` Hero — already shown in §2. Final state, scrolled position 0.

### 7.2 `/manifesto` — Reel 02

*The confidence flex. No animation. Static. Looks like a publication, not a website.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│                                                                                  │
│            ROLO 02 — MANIFESTO                                                   │
│            ──────────────────────                                                │
│                                                                                  │
│                                                                                  │
│            Não fazemos vídeos.                                                  │
│            Fazemos filmes para marcas.                                          │
│                                                                                  │
│            Cada projeto começa no slate                                         │
│            e termina no genérico final.                                         │
│                                                                                  │
│            25 frames por segundo.                                               │
│            25 horas por dia.                                                    │
│                                                                                  │
│            ────────────────                                                      │
│            25 HORAS · LISBOA                                                    │
│                                                                                  │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:00:34:00                       MANIFESTO                              02/09 │
└──────────────────────────────────────────────────────────────────────────────────┘
```

The above sets in: editorial serif (the four PT lines), mono (label "ROLO 02" and footer), with a single hairline divider. Canvas is `CANVAS WHITE`. *Cinema is also stillness.*

### 7.3 `/programa` — Reel 03 (the programme index)

*Verticals as a film-festival lineup. Scroll-snap between each programme.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│       ░░░░░░░░░░░ FULL-BLEED STILL (current programme) ░░░░░░░░░░░░░░             │
│       ░░░░░░░░░ hover → still becomes muted reel loop ░░░░░░░░░░░░░░░             │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│                                                                                  │
│                                                                                  │
│  PROGRAMA 01                                                                     │
│  ──────────                                                                      │
│                                                                                  │
│  HOSPITALIDADE                                                                   │
│  12 filmes · 2022–2026                                                          │
│                                                                                  │
│                                                       VER PROGRAMA →             │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:01:14:00                  PROGRAMA · HOSPITALIDADE                    03/09 │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Six programmes, one per scroll-snap:**

```
        ┌──┐
        │01│  HOSPITALIDADE     12 filmes
        ├──┤
        │02│  MÚSICA             8 filmes
        ├──┤
        │03│  DESPORTO           6 filmes
        ├──┤
        │04│  INSTITUCIONAL      9 filmes
        ├──┤
        │05│  IMOBILIÁRIO        7 filmes
        ├──┤
        │06│  EVENTOS           11 filmes
        └──┘
```

The chapter index `03/09` ticks `04/09 · 05/09 …` as the user scroll-snaps through.

### 7.4 `/programa/{vertical}` — Reel 04 (programme detail)

*The case list for one vertical. Reads like a festival schedule, not a portfolio grid.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PROGRAMA · HOSPITALIDADE                                                        │
│  ───────────────────────                                                         │
│  12 filmes · 2022 — 2026                                                        │
│                                                                                  │
│                                                                                  │
│  19:30 — 19:55      Vila Galé Coleção                          2026   →         │
│  ────────────────────────────────────────────────────────────────────────        │
│  20:00 — 20:32      Tivoli Carvoeiro · A Casa                  2025   →         │
│  ────────────────────────────────────────────────────────────────────────        │
│  20:40 — 21:02      Pestana CR7 · Madeira                      2025   →         │
│  ────────────────────────────────────────────────────────────────────────        │
│  21:10 — 21:38      The Yeatman · Vintage Tasting              2024   →         │
│  ────────────────────────────────────────────────────────────────────────        │
│  21:45 — 22:09      Memmo Príncipe Real                        2024   →         │
│  ────────────────────────────────────────────────────────────────────────        │
│  …                                                                               │
│                                                                                  │
│  ┌─────────────────────────────────────┐                                         │
│  │ inline preview (5s teaser, muted)   │ ← appears on hover of any row, lower-  │
│  │ 320×136                             │   right floating panel                  │
│  └─────────────────────────────────────┘                                         │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:02:08:00                  HOSPITALIDADE · 12 FILMES                   04/09 │
└──────────────────────────────────────────────────────────────────────────────────┘
```

**Interaction:** `j/k` arrows navigate rows. Click → case page. Inline preview is a 5s pre-encoded teaser, not the full case film (cheap on bandwidth).

### 7.5 `/caso/{slug}` — Reel 05 (case study, scroll-driven)

*The case told as a short film. Five chapters, linear scroll.*

```
SCROLL POSITION 0% — SLATE
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│                                                                                  │
│            ┌─────────────────────────────────────────┐                           │
│            │ PROD.     25 HORAS                      │                           │
│            │ CLIENTE   VILA GALÉ                     │                           │
│            │ ANO       2026                          │                           │
│            │ ROLO      03 · HOSPITALIDADE            │                           │
│            │ CENA      02       TAKE   01            │                           │
│            │ DIR.      ANA P. SANTOS                 │                           │
│            │ DOP       JOÃO MENDES                   │                           │
│            │ DURAÇÃO   00:01:32:14                   │                           │
│            └─────────────────────────────────────────┘                           │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:02:42:00       CASO 02 — VILA GALÉ COLEÇÃO            ↓ ROLAR        05/09 │
└──────────────────────────────────────────────────────────────────────────────────┘

SCROLL POSITION 20% — HERO FILM
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│             ░░░░░░░░░░░░░ CASE FILM · 2.39:1 ░░░░░░░░░░░░░░░░░░░░░░               │
│             ░░░░░░░░░░░░░  diegetic audio   ░░░░░░░░░░░░░░░░░░░░░░░               │
│             ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:02:54:00              VILA GALÉ COLEÇÃO · 00:00:32        ▶            │
└──────────────────────────────────────────────────────────────────────────────────┘

SCROLL POSITION 55% — CREDIT ROLL
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│            DIR.                       ANA P. SANTOS                              │
│            DIRECTOR OF PHOTOGRAPHY    JOÃO MENDES                                │
│            PRODUTOR                   MIGUEL ROCHA                               │
│            MONTAGEM                   25 HORAS · POST                            │
│            COR                        ESTÚDIO ATLÂNTICO                          │
│            MÚSICA                     CARMINHO                                   │
│            CLIENTE                    VILA GALÉ · MARKETING                      │
│            LOCAL                      ALGARVE · 2026.03                          │
│                                                                                  │
│            ────────────────                                                      │
│            UMA PRODUÇÃO 25 HORAS                                                │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:03:21:00              CRÉDITOS                                       05/09  │
└──────────────────────────────────────────────────────────────────────────────────┘

SCROLL POSITION 75% — BEHIND THE SCENES (3 stills with one-line captions)
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐      │
│  │  ░░ STILL 01 ░░     │  │  ░░ STILL 02 ░░     │  │  ░░ STILL 03 ░░     │      │
│  │  in house LUT       │  │  in house LUT       │  │  in house LUT       │      │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘      │
│  Dia 1 · 04:14          Set · Sala dos Tetos      Última take, 22:30           │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:03:48:00              BASTIDORES                                     05/09  │
└──────────────────────────────────────────────────────────────────────────────────┘

SCROLL POSITION 100% — NEXT IN PROGRAMME (poster-style "now showing")
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│       ░░░░░░ FULL-BLEED STILL · TIVOLI CARVOEIRO · A CASA ░░░░░░░░░░             │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│                                                                                  │
│  A SEGUIR                                                                        │
│  ─────────                                                                       │
│  TIVOLI CARVOEIRO · A CASA                                                       │
│  PROGRAMA · HOSPITALIDADE                                                        │
│                                                                                  │
│                                                       VER CASO →                 │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:04:11:00              A SEGUIR                                       05/09  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.6 `/estudio` — Reel 06 (about)

*Four short sections, mono headings + serif body. One studio photo, full-bleed, graded.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ESTÚDIO                                                                         │
│  ───────                                                                         │
│                                                                                  │
│  QUEM SOMOS                                                                      │
│  ─────────────                                                                   │
│  Um colectivo de realização e produção, com base em Lisboa.                     │
│  Fazemos filmes curtos para marcas que sabem que duram.                         │
│                                                                                  │
│  EQUIPA                                                                          │
│  ──────                                                                          │
│  ANA P. SANTOS         Realização                                                │
│  JOÃO MENDES           Direcção de Fotografia                                    │
│  MIGUEL ROCHA          Produção                                                  │
│  RITA AMORIM           Pós-produção                                              │
│  …                                                                               │
│                                                                                  │
│  ONDE ESTAMOS                                                                    │
│  ────────────                                                                    │
│  Rua ____ 25, 1100-000 Lisboa  ·  +351 963 869 519                              │
│                                                                                  │
│  COMO TRABALHAMOS                                                                │
│  ───────────────                                                                 │
│  Cada projecto começa numa conversa. Trabalhamos em PT e EN,                    │
│  no Algarve, em Lisboa, no Porto, e onde for preciso.                           │
│                                                                                  │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│       ░░░░░░░░░ FULL-BLEED STUDIO/TEAM PHOTO · graded ░░░░░░░░░░░░░░             │
│       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░             │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:05:02:00              ESTÚDIO · LISBOA                               06/09  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.7 `/orcamento` — Reel 07 (4-step form, each step is a slate)

*Conversational. Slate-styled. One question at a time.*

```
STEP 1 OF 4
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PEDIR ORÇAMENTO                                                                 │
│  ─────────────────                                                               │
│  CENA 01 · TAKE 01                          PASSO 1 DE 4                        │
│                                                                                  │
│                                                                                  │
│  Que tipo de projeto?                                                            │
│                                                                                  │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                │
│   │ HOSPITALIDADE    │ │ MÚSICA           │ │ DESPORTO         │                │
│   └──────────────────┘ └──────────────────┘ └──────────────────┘                │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐                │
│   │ INSTITUCIONAL    │ │ IMOBILIÁRIO      │ │ EVENTOS          │                │
│   └──────────────────┘ └──────────────────┘ └──────────────────┘                │
│                                                                                  │
│                                                                                  │
│                                                       CONTINUAR →                │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:05:30:00              ORÇAMENTO · PASSO 1                            07/09  │
└──────────────────────────────────────────────────────────────────────────────────┘

STEP 4 (FINAL)
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  PEDIR ORÇAMENTO                                                                 │
│  ─────────────────                                                               │
│  CENA 01 · TAKE 04                          PASSO 4 DE 4                        │
│                                                                                  │
│  Como vos contactamos?                                                           │
│                                                                                  │
│  NOME       ________________________________________________________            │
│                                                                                  │
│  EMAIL      ________________________________________________________            │
│                                                                                  │
│  TELEFONE   ________________________________________________________            │
│                                                                                  │
│  EMPRESA    ________________________________________________________ (opc.)     │
│                                                                                  │
│                                                                                  │
│  ← VOLTAR                                             ENVIAR PEDIDO →            │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:06:14:00              ORÇAMENTO · PASSO 4                            07/09  │
└──────────────────────────────────────────────────────────────────────────────────┘

CONFIRMATION (after submit)
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│            ┌─────────────────────────────────────────┐                           │
│            │ CENA 01 · TAKE 04 · EM ESPERA           │                           │
│            │                                         │                           │
│            │ Obrigado. Vamos rever o pedido e        │                           │
│            │ responder em 24h, em PT ou EN.          │                           │
│            │                                         │                           │
│            │ Para algo urgente:                      │                           │
│            │   atendimento@25horasagency.com         │                           │
│            │   +351 963 869 519                      │                           │
│            │                                         │                           │
│            └─────────────────────────────────────────┘                           │
│                                                                                  │
│                                            MARCAR REUNIÃO DIRECTA →              │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:06:38:00              EM ESPERA                                      07/09  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.8 `/marcar` — Reel 08 (book a call)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  MARCAR REUNIÃO                                                                  │
│  ───────────────                                                                 │
│  REUNIÃO · 30 MIN · ONLINE                                                       │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐    │
│  │                                                                          │    │
│  │   ░░░░░░ CAL.COM EMBED (themed: black canvas, mono labels) ░░░░░░       │    │
│  │   ░░░░░░ date picker · time picker · confirmation         ░░░░░░       │    │
│  │                                                                          │    │
│  └──────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:07:12:00              MARCAR REUNIÃO                                 08/09  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.9 `/contacto` — Reel 09

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN    ☰    ◉ SOM   │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  CONTACTO                                                                        │
│  ────────                                                                        │
│  Por filme, por proposta, por café.                                             │
│                                                                                  │
│                                                                                  │
│  ATENDIMENTO                                                                     │
│  ───────────                                                                     │
│  atendimento@25horasagency.com                                                  │
│  +351 963 869 519                                                                │
│                                                                                  │
│  IMPRENSA                                                                        │
│  ────────                                                                        │
│  imprensa@25horasagency.com                                                     │
│                                                                                  │
│  TALENTO · COLABORAÇÕES                                                          │
│  ───────────────────────                                                         │
│  ola@25horasagency.com                                                          │
│                                                                                  │
│  MORADA                                                                          │
│  ──────                                                                          │
│  Lisboa, Portugal                                                                │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:07:58:00              CONTACTO                                       09/09  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 7.10 The nav overlay (triggered by `☰`)

*Opens as a full-screen black slate. Real shutter sound on open. Snaps closed.*

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ 25 : HORAS                                              PT · EN         ✕      │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   PROGRAMA                                          ESTÚDIO                     │
│   ─────────                                         ───────                     │
│   01  HOSPITALIDADE     →                           MANIFESTO     →             │
│   02  MÚSICA            →                           SOBRE         →             │
│   03  DESPORTO          →                           CONTACTO      →             │
│   04  INSTITUCIONAL     →                                                        │
│   05  IMOBILIÁRIO       →                           ATENDIMENTO                 │
│   06  EVENTOS           →                           ──────────                  │
│                                                     PEDIR ORÇAMENTO →            │
│                                                     MARCAR REUNIÃO  →            │
│                                                                                  │
│                                                                                  │
├──────────────────────────────────────────────────────────────────────────────────┤
│ 01:00:00:00                          25:HORAS                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Motion principles — visualised

Every animation duration expressed in **frames at 25fps**. Code comment style:

```
/* 12f @ 25fps = 0.48s */
duration: 0.48
```

### Standard durations

```
INSTANT CUT          0  frames    0.00s   reel scene change, slate snap
SHUTTER              4  frames    0.16s   slate appears
QUICK FADE           8  frames    0.32s   nav overlay open
SLATE HOLD          25  frames    1.00s   minimum slate visibility
STANDARD MOVE       12  frames    0.48s   page transition, scroll-snap
SLOW DISSOLVE       50  frames    2.00s   programme change, hero entry
EDITOR'S PAUSE      12  frames    0.48s   the silence between cuts
```

### Easing rules

```
SHUTTER MOVES      step-end       (no ease — it just snaps)
PAGE MOVES         expo-out       (sharp start, gentle settle)
SCROLL SCRUB       linear         (the scroll IS the playhead)
HOVER FEEDBACK     ease-out 200ms
REDUCED MOTION     0ms across the board, no sound
```

### Timing diagram — page transition (slate-clap)

```
0f      ────────────────────────────────────────────────────────────────────
        |                |                |                |                |
4f      ▓▓▓▓▓▓▓ slate enters (4f shutter)
8f                  ▓▓▓▓▓▓▓ slate text settles
16f                                     ▓▓▓▓▓▓▓ HOLD (slate visible)
40f                                                            ▓▓▓▓▓▓▓ slate exits (slate-clap)
44f                                                                ▓▓▓▓▓▓▓ next page renders
52f                                                                    ▓▓▓▓▓▓▓ chrome timecode resumes

audio:  · · · · · · · · CLICK · · · · · · · · · · · CLACK · · · · · · ·
                        (shutter, t=0.16s)          (slate-clap, t=1.6s)
```

---

## 9. Sound layer — what plays when

```
LAYER             SOURCE                  LEVEL    GATED BY          NOTES
─────────────────────────────────────────────────────────────────────────────────
Room tone bed     30s loop, designed      -24dB    first gesture     seamless loop
Slate shutters    real recording, 3x var. -18dB    audio toggle      randomised
Slate claps       real recording, 3x var. -12dB    audio toggle      transitions only
Hover ticks       projector tick           -28dB    audio toggle      nav hover
Case film audio   from the film file       0dB     user pressed ▶    bed ducks -6dB
Original score    commissioned 60–90s     -16dB    enters at /caso   v2 — scroll-driven
─────────────────────────────────────────────────────────────────────────────────
```

**The audio toggle is the most important UI element on the site.** Always visible. Three states:

```
○ SOM        muted (default on first visit)
◉ SOM        on (green dot = SMPTE signal indicator)
◉ SOM ⚠     blocked by browser (rare — needs explicit gesture)
```

`prefers-reduced-motion` does NOT mute sound (sound ≠ motion). Sound is muted by default on first visit regardless, by browser rule.

---

## 10. Interaction & navigation flow

The site is **one continuous film cut into 9 reels.** Reels are URLs for SEO, but the user moves through them like scenes.

```
                    ┌──────────────────┐
                    │  /  HERO          │  reel 01
                    │  opening 3s       │
                    └────────┬─────────┘
                             │ scroll ↓ or nav
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
   ┌───────────────┐  ┌─────────────┐  ┌─────────────┐
   │ /manifesto    │  │ /programa   │  │ /estudio    │
   │   reel 02     │  │   reel 03   │  │   reel 06   │
   └───────┬───────┘  └──────┬──────┘  └──────┬──────┘
           │                 │ vertical       │
           │                 ▼                │
           │      ┌─────────────────┐         │
           │      │ /programa/...   │         │
           │      │   reel 04       │         │
           │      └────────┬────────┘         │
           │               │ project          │
           │               ▼                  │
           │      ┌─────────────────┐         │
           │      │ /caso/...       │         │
           │      │   reel 05       │         │
           │      └────────┬────────┘         │
           │               │ next case        │
           │               ▼                  │
           │      ┌─────────────────┐         │
           │      │ /caso/{next}    │         │
           │      └─────────────────┘         │
           ▼                                  ▼
   ┌─────────────────────────────────────────────────┐
   │  /orcamento (07)  →  /marcar (08)  →  /contacto │
   │                                          (09)   │
   └─────────────────────────────────────────────────┘
```

**Keyboard shortcuts** (published on the `/estudio` page, mono, like a manual):

```
J / K      previous / next chapter
SPACE      pause/play hero or case film
M          toggle sound
ESC        close nav overlay
1–6        jump to programme N
G          go to /manifesto
?          show shortcuts
```

---

## 11. Component inventory (what we actually build)

The atomic library. Build each once.

```
PRIMITIVES                          CHROME                    REELS (compositions)
──────────                          ──────                    ────────────────────
<Slate variant="hero|case|       <Letterbox top/bottom>    <Reel name="hero">
        section|transition" />    <Wordmark />              <Reel name="manifesto">
<Timecode running={true} />       <LangToggle />            <Reel name="programa">
<ChapterIndex current=N total=9>  <NavOpener />             <Reel name="programa-detail">
<AudioToggle state="on|off|blk"/> <AudioToggle />           <Reel name="case">
<MonoLabel children />             <ScrollCue />            <Reel name="estudio">
<SerifHeading size />              <ChapterTag />           <Reel name="orcamento" step=N>
<BodyParagraph />                  <NavOverlay />           <Reel name="marcar">
<ReelPlayer src loop muted />                                <Reel name="contacto">
<CaseGrid stills />
<TeaserPanel preview />
<Form step current next />
```

**Total: ~17 primitives + 4 chrome bits + 9 reel compositions.** A solo dev can ship this discipline in 10 weeks.

---

## 12. The prototype — what to build in week 2

Build only this in the hero-prototype phase. Everything else waits.

```
SHIP THIS FIRST                                  DON'T BUILD YET
────────────────                                 ───────────────
✓ Hero with the first 3-second sequence          ✗ Programa pages
✓ Letterbox chrome (top + bottom bars)           ✗ Case study template
✓ <Slate> primitive (hero variant)               ✗ Form
✓ Live <Timecode> (real 25fps counter)           ✗ Cal.com integration
✓ <AudioToggle> with room tone + slate clap      ✗ CMS
✓ House LUT shader on hero reel                  ✗ Mobile nav overlay
✓ Scroll-as-playhead on the hero reel            ✗ Newsletter
✓ Mobile-tier rendering (KTX2, 720p25)           ✗ Anything below hero scroll position
✓ Lighthouse score ≥ 95 on hero                  ✗ Sanity schema
```

**Goal:** a 20-second screen recording of the opening that you can put on a phone and hand to the client. If they don't say "yes" after that 20 seconds, the concept is wrong and we revisit before building anything else.

---

## 13. Quick reference — the design tokens (paste into Figma / Tailwind)

```ts
// tokens.ts
export const colors = {
  canvasBlack:   '#0A0A0A',
  canvasWhite:   '#F4F0E8',
  accentGrade:   '#C7572B',
  signalLive:    '#4F9D58',
  typeNeutral:   '#B7B0A4',
  typeDim:       '#66615A',
  chromeLine:    '#1F1D1A',
}

export const type = {
  serif:  'PP Editorial New, Söhne Breit, serif',
  body:   'Söhne, ABC Diatype, Inter, sans-serif',
  mono:   'JetBrains Mono, IBM Plex Mono, monospace',
}

export const frame = {  // all durations in frames @ 25fps
  shutter:  4,
  quick:    8,
  hold:    25,
  standard:12,
  slow:    50,
  pause:   12,
  fps:     25,
  frameMs: 40,   // 1000 / 25
}

export const motion = {
  shutter: { duration: frame.shutter * frame.frameMs, ease: 'steps(1, end)' },
  page:    { duration: frame.standard * frame.frameMs, ease: 'expo.out' },
  hold:    { duration: frame.hold * frame.frameMs },
}

export const audio = {
  bedDb:    -24,
  shutterDb:-18,
  clapDb:   -12,
  hoverDb:  -28,
  duckDb:    -6,
}

export const layout = {
  aspectRatio: '2.39 / 1',
  chromeTop:    '11vh',
  chromeBottom: '11vh',
  chromeTopMobile:    '14vh',
  chromeBottomMobile: '14vh',
}
```

---

## 14. What this looks like to the client (the 60-second walkthrough)

When you show them this doc plus the hero prototype, the meeting goes like this:

```
00:00  "This is the visual grammar. Five rules. Every choice obeys one."
00:10  "Watch the first three seconds. Black → slate → reel. That's the brand."
00:30  "The bars aren't dead space. They're the navigation. Timecode lives there."
00:45  "Every section gets a slate. Every transition is a real cut. No mograph."
01:00  "One LUT grades every frame on the site. Yours. Owned. Repeatable."
```

If they nod through that minute, you're building the rest.

---

*End of visual structure doc.*
