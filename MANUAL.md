# 25Horas Landing Page — The Holy Grail Manual

**A strategy & build bible for the pitch and the prototype.**
Phase 1 deliverable. Author: this is the briefing I wish someone had written for me before the first meeting.

---

## TL;DR — read this first

1. **Who 25Horas actually is (today):** a small Portuguese audiovisual/marketing agency — `@25horas.agency`, ~1.9k Instagram followers, 65 posts, six verticals (hospitality, real estate, sports, institutional, music, events). Phone +351 963 869 519, email `Atendimento@25horasagency.com`. Current site `25horasagency.com` is a WordPress "coming soon" placeholder. **This will be their first real website.** That's the moment.
2. **What they want to be:** internationally credible, cinematic, unforgettable. They've rejected developers for being boring. They want a landing page that closes briefs in seconds.
3. **The strategic gap:** every world-class agency landing (Locomotive, Immersive Garden, Active Theory, Resn) is fundamentally a *software studio that happens to make video*. 25Horas can claim the inverse — **a cinema studio that happens to ship the web**. Cinema-language (anamorphic, frame-counts, color grade, room tone, slates, timecode) is genuinely unowned by the WebGL-studio crowd.
4. **The single best concept (recommended): "25 Frames."** The number in the name is a gift. Run the entire UX at cinema cadence — 2.39:1 letterbox opening, slate typography, scroll-as-timeline, ambient room tone, a single house LUT that grades every frame of every project. It's ownable, it's achievable solo, and it doesn't try to out-WebGL studios with 40-person dev teams.
5. **The build:** Next.js + React Three Fiber (used surgically, not as the headline) + GSAP + Lenis (tuned, not default) + HLS adaptive video + a real audio layer. ~10 weeks from concept lock to launch for a disciplined solo dev. Awwwards-submittable.
6. **The pitch one-liner for the meeting:** *"Every other top agency is a software studio that happens to make video. 25Horas is a cinema studio that happens to ship the web."*

---

## 0. Honest research caveats

Two research streams informed this document. Both noted that not every URL was view-source-verified due to fetch limits — tech-stack claims marked **likely:** in section 3 are educated inference from studio lineage and case-study writeups, not from inspecting the network tab. Three reference URLs are flagged `[double-check]` and should be smoke-tested by you before being quoted to the client. These are pointed-out where they appear. The strategic conclusions hold regardless of stack quibbles.

---

## 1. Who 25Horas actually is — baseline brief

| Field | Finding | Source |
|---|---|---|
| Trading name | **Agência 25 Horas** | [Instagram bio](https://www.instagram.com/25horas.agency/) |
| Instagram | `@25horas.agency` — 1,917 followers / 1,304 following / 65 posts | IG profile metadata |
| Bio verticals | Restauração · Real Estate · Desporto · Institucional · Música · Eventos | IG bio |
| Primary email | `Atendimento@25horasagency.com` | IG link-in-bio |
| Phone | +351 963 869 519 (Portugal mobile) | [Facebook page](https://www.facebook.com/25horasaudiovisuais/posts/somos-a-25horas-digital-marketing-agency-especializados-em-fotografia-v%C3%ADdeo-e-ge/1312866443204280/) |
| Related FB | `25Horas Audiovisuais` — describes services as fotografia / vídeo / gestão | Facebook |
| Current site | `25horasagency.com` — WordPress "coming soon" placeholder. Logo, rainbow gradient, nothing else. | direct fetch |
| Vimeo / Behance / LinkedIn presence | Not surfaced in search. Footprint = Instagram + Facebook + parked domain. | search |
| Portugal video-agency directory listing | Listed regionally on Sortlist (Portuguese video production) — among many; no notable distinction in the listing | [Sortlist PT](https://www.sortlist.com/video/portugal-pt) |

### What this means strategically

- **They are not Active Theory.** Don't pitch a 3D world that requires a 6-person WebGL team to maintain. The honest scope is one disciplined developer/designer (you) shipping a single, ownable signature.
- **Clean slate.** Zero existing web brand to protect, contradict, or apologise for. You define the digital identity from frame one.
- **Portugal is a feature, not a deficit.** Their regional baseline (Filmesdamente, Escama Films, Unbelievable Productions) is template-heavy and aesthetically conservative. Looking world-class *in Portugal* is a much lower bar than looking world-class globally — but pitching against the global ceiling is what justifies your fee.
- **Vertical breadth = positioning risk.** Six verticals from hospitality to sports is wide. The landing must make breadth feel like *range* (a director who shoots across genres), not *generalism* (a vendor who'll do whatever pays).

### What's still unknown — ask in the kickoff

- Team size, founders, year founded
- Lisbon vs. Porto vs. other base
- Best 3–5 client logos to lead with
- Existing brand assets (logo source files, fonts, colors)
- Showreel — do they have one cut, or do we cut from raw cases?
- Bilingual scope (PT only, or PT + EN, or PT + EN + ES?)
- Where leads currently land (inbox? CRM? WhatsApp?)

---

## 2. The 2026 standard — what world-class agency landings actually do now

A digest from the reference audit and competitive analysis (sources in section 3 and the agency table below). The bar a 25Horas landing must clear:

1. **Identity in under 800ms.** Name, posture, mood lock before any heavy chrome. Locomotive and Immersive Garden's 2025 wins both front-load this.
2. **One signature device — not five.** Active Theory's 3D office. Locomotive's smooth-scroll editorial. Immersive Garden's sculpted CGI transitions. Sennep's yellow. Buck's color-bursts. Siena Film's filmstrip. Pick one ownable thing and repeat it everywhere.
3. **Work as theatre, not gallery.** Full-bleed case film auto-plays muted in 80% of recent SOTDs. Thumbnail grids are now the marker of a *template* site, not a craft site.
4. **Editorial typography.** Large display type, restrained scale system (3–4 sizes), tight tracking, one mono accent. A single editorial serif somewhere — almost nobody at this tier uses one.
5. **Sound-design ready.** Even when muted by default, a visible audio toggle that, when activated, plays real designed audio (not just the case's diegetic track). Hatom commissioning Ben Lukas Boysen for an original score is the new ceiling.
6. **Performance promise as brand promise.** 60fps.fr literally bakes the KPI into the URL. Pierre.io publishes its LCP. Performance numbers are now legitimate marketing.
7. **Mobile parity that respects bandwidth.** 60fps on mid-tier Android, or a *graceful* 24fps cinematic fallback. No "view on desktop" excuses.
8. **An "about" that's a manifesto, not a bio.** Hi-ReS!'s 25-year-old line — *"If you know what you're doing, you end up doing only what you know"* — still beats most current taglines. The flex is in plain text, not WebGL.

### The clichés to refuse on sight (over-fished, 2025–2026)

These are now the visual fingerprint of a *template* site. Their absence is positioning.

- Default cursor-following gradient blobs.
- Lenis with the default lazy easing (the marker of a site that downloaded Lenis without configuring it).
- Generic GSAP scroll-pin reveal of a giant headline word-by-word.
- Marquee text tickers across the hero.
- The default ASCII shader filter as hero.
- Hero stock video of a creative team high-fiving.
- "We are X. We do Y." three-card service grid.
- Lottie-stuffed hero competing with the headline.
- 45-second intro animations the user can't skip.

### The white space — what a film-first agency can own that nobody else does

The WebGL-studio crowd speaks *interactive* fluently. They're weak on cinema language. 25Horas can claim:

- **Aspect ratio as identity.** Default hero to 2.39:1 anamorphic with the letterbox bars as the UI chrome (nav lives in the upper bar, audio toggle in the lower). Most agencies live in 16:9 or full-bleed. Nobody owns 'scope.
- **Frame-count fidelity.** Hero reel at 24p or 25p — *not* the 60fps motion-graphics smoothness everyone else has. The micro-difference reads "film people" instantly to anyone in the industry.
- **Color grade as signature.** One house LUT applied across every case still, every project card, every UI accent. Subtle halation, optional fine grain. Locomotive owns smooth; 25Horas owns *graded*.
- **Sound as default.** Diegetic room-tone bed under the hero. One tasteful audio icon. Almost universally absent in the studios audited.
- **Editorial rhythm.** Cuts on the beat. Black frames between sections (a real editor's pause), not crossfades. The scroll is a timeline.
- **Anamorphic lens artifacts as language.** Horizontal blue flares on focus states. Oval bokeh in backgrounds. Used as *language*, not gimmick — sparingly.
- **Chromatic aberration on type — only on transitions, never static.** A cinema-color tell.
- **Slates and timecode as design.** Real clapperboard slates as case dividers. MM:SS:FF timecode in the corner of case films. Unmistakably film.
- **A serif somewhere.** Every agency in the audit uses sans-only. A single editorial serif (A24 / Criterion register) for case titles is a one-asset land-grab.
- **Portuguese first.** PT/EN toggle prominent, hero copy in PT. Locomotive owns French-Canadian; 25Horas can own *Atlântico*.

---

## 3. Reference library — 22 awarded landings, distilled

Use this as the inspiration cabinet. Each entry includes one transferable steal for 25Horas. Sources are linked; the cross-cutting takeaways at the end are the operating principles.

### 3.1 Lando Norris — Official
- **URL:** https://landonorris.com/ · [Awwwards](https://www.awwwards.com/sites/lando-norris)
- **Concept:** Driver site as telemetry overlay; fan platform structured like a race weekend (On-Track / Off-Track).
- **Opening 3s:** Lando into the lens, papaya wash, helmet 3D primitive resolves as type locks.
- **Metaphor:** Scroll-as-throttle; transitions feel like gear changes.
- **Tech:** Webflow + Rive + GSAP ScrollTrigger; likely: Three.js on the helmet rotation.
- **Steal:** A dual-track IA — *"On Set / Off Set"* — institutional/client work vs. behind-the-scenes culture reels. One site speaks to a CMO and a director simultaneously.

### 3.2 Igloo Inc.
- **URL:** https://igloo.inc/ · [Awwwards](https://www.awwwards.com/sites/igloo-inc)
- **Concept:** Whole brand universe as one navigable 3D igloo.
- **Opening 3s:** Snow-globe pull-back; ambient wind; cursor becomes soft light.
- **Metaphor:** Scroll-as-camera-dolly through a continuous 3D world (no page reloads).
- **Tech:** Three.js + GLSL; likely: R3F, Draco-compressed GLTF, LOD switching, Howler audio.
- **Steal:** One continuous world (a hotel corridor → ballroom → rooftop). Verticals become spatial zones, not nav items.

### 3.3 Immersive Garden — Studio site (Awwwards Studio of the Year 2024)
- **URL:** https://immersive-g.com/ · [case study](https://www.awwwards.com/case-study-immersive-gardens-new-website.html)
- **Concept:** Decade of work crystallised into a tactile gallery.
- **Opening 3s:** Logotype assembles from fragments; warm bloom; physical-feeling page weight.
- **Metaphor:** Cursor-as-light — hovers reveal hidden chrome.
- **Tech (confirmed):** Three.js, server-side KTX2 texture compression, channel-packed PBR, Houdini→Blender pipeline.
- **Steal:** KTX2 + channel-packing is the only way to ship cinematic 3D on mobile without jank. **Build this into 25Horas' pipeline once, reuse forever.**

### 3.4 Montfort (by Immersive Garden) `[double-check URL]`
- **URL:** https://montfort.com/ · [Awwwards](https://www.awwwards.com/sites/montfort)
- **Concept:** Holding-group rebrand around "clarity" — quiet monochrome WebGL film.
- **Opening 3s:** Two-color palette, slow type, soft volumetric shape breathing.
- **Metaphor:** Scroll-as-fade-to-black; transitions are cinema cuts.
- **Steal:** For real-estate and institutional clients, restraint outsells fireworks. Two-tone palette + one motion idea wins the brief.

### 3.5 Hatom (by Immersive Garden)
- **URL:** https://hatom.com/ · [case study](https://www.awwwards.com/case-study-hatom-brand-new-experience.html)
- **Concept:** 5-chapter griffin-mythology scroll narrative around brand pillars.
- **Tech (confirmed):** Three.js, progressive asset loading, original score by Ben Lukas Boysen.
- **Steal:** **Commission a custom 60–90s score from a Portuguese composer.** Drive the playhead with scroll position. €2–4k that puts you in the top 10% of agency sites instantly. Cheap moat.

### 3.6 Locomotive — Agency site (Awwwards AOTY 2025, 7th consecutive)
- **URL:** https://locomotive.ca/en
- **Concept:** Editorial-meets-engineering; every case reads as a print spread.
- **Opening 3s:** Heavyweight serif lockup, single hero loop, deliberate silence.
- **Tech (confirmed):** Locomotive Scroll (their own lib) + GSAP + Three.js; in-house Charcoal CMS.
- **Steal:** Each case = one signature interaction. **Don't replicate the whole system on every project page** — vary the chrome.

### 3.7 Active Theory v5
- **URL:** https://activetheory.net/ · [Awwwards](https://www.awwwards.com/sites/active-theory-v5)
- **Concept:** Portfolio as toggle-able real-time environments (Venice Beach ↔ Amsterdam).
- **Tech:** Custom WebGL toolchain + GLSL.
- **Steal:** Offer a *"Lisbon at golden hour / Porto at blue hour"* toggle on the home reel. Same footage, two LUT pipelines. One moment of user-as-author.

### 3.8 Studio Freight — Hyperbolic `[double-check URL]`
- **URL:** https://hyperbolic.xyz/ · [Awwwards](https://www.awwwards.com/sites/hyperbolic-site)
- **Concept:** A compute marketplace expressed as one dense typographic system.
- **Tech (confirmed):** Lenis + Tempus + Hamo + GSAP + Next.js.
- **Steal:** Refusal aesthetic — when everyone does WebGL, *no* WebGL on the index becomes the bold move. Reserve cinematics for the case sub-pages.

### 3.9 Lusion
- **URL:** https://lusion.co/ · [case study](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)
- **Concept:** Physically-simulated 3D playground that doubles as portfolio.
- **Tech:** Three.js + custom physics, FBO particle sim, GLSL.
- **Steal:** One physics-driven element (logo as soft-body cloth, or reel cards as a draggable stack) is the cheap press-and-hold dopamine hit.

### 3.10 Resn — Studio + Black Friday Sale
- **URL:** https://resn.co.nz/ · [profile](https://www.awwwards.com/resn/)
- **Concept:** Anti-corporate weirdness as house style.
- **Steal:** One *deliberately broken* interaction (glitch logo on hover, intentionally misaligned section) signals personality without redesigning everything. Use sparingly — wrong tonal fit for hospitality clients.

### 3.11 Bonhomme — Studio site
- **URL:** https://bonhommeparis.com/en · [profile](https://www.awwwards.com/BONHOMME/)
- **Concept:** Luxury-maison branding rendered with editorial restraint.
- **Steal:** For Vila Galé / Tivoli / Pestana-tier hospitality briefs: *paper textures, generous margins, slow timing.* Cinema is also stillness.

### 3.12 Bonhomme — Duroc 2025
- **URL:** https://bonhommeparis.com/en/projects/duroc-2025
- **Concept:** Cherry-tomato producer reimagined as an amusement park.
- **Steal:** For sports / institutional briefs, invent a metaphor world (a stadium-as-cathedral, a port-as-orchestra). Shoot pre-production assets through that lens.

### 3.13 Siena Film Foundation
- **URL:** https://www.siena.film/ · [case study](https://www.awwwards.com/siena-film-foundation-case-study.html)
- **Concept:** Tuscan film foundation via WebGL filmstrips and neo-romanesque type.
- **Tech (confirmed):** Webflow + GLSL + OSL + Three.js + GSAP + Lenis.
- **Steal:** **The filmstrip-as-scroller is the single most transferable metaphor for an audiovisual agency.** Build one custom shader, reuse across every project page.

### 3.14 Working Stiff Films
- **URL:** https://www.workingstifffilms.com/ · [case study](https://www.awwwards.com/working-stiff-films-case-study.html)
- **Concept:** Production house framed as a guided cinematic journey.
- **Steal:** **Storyboard the home page like a 90-second trailer.** Each scroll segment is a beat: hook → tension → reveal → CTA. Write it on paper before code.

### 3.15 Furrow Studio
- **URL:** https://www.furrowstudio.com/ · [Awwwards](https://www.awwwards.com/sites/furrow-studio)
- **Concept:** Integrated video/creative/post studio — minimal, video-first.
- **Steal:** **80% client footage, 20% chrome.** Resist over-designing on top of a great reel.

### 3.16 BADASS Films
- **URL:** https://badassfilms.tv/ · [Awwwards](https://www.awwwards.com/sites/badass-films)
- **Concept:** French commercials/music-video shop; type as graphic punch.
- **Steal:** A custom display typeface (or one variable font used at five extreme weights) is the cheapest brand-asset to commission and pays back on every page.

### 3.17 Unseen Studio
- **URL:** https://unseen.co/ + https://2025.unseen.co/ · [profile](https://www.awwwards.com/unseenstudio/)
- **Concept:** Brand + digital + motion under one shifting worldview.
- **Steal:** **Ship `25horas.com/2026` year-in-review microsite each January.** New launch + new SOTD bid + new sales asset + recruitment magnet in one move.

### 3.18 Pierre.io
- **URL:** https://pierre.io/ · [Awwwards](https://www.awwwards.com/sites/pierre-io)
- **Concept:** Solo dev/designer portfolio — disciplined, fast, opinionated.
- **Steal:** **Publish the performance budget on the about page.** "LCP < 1.8s. INP < 200ms. 60fps on a three-year-old phone." Brag in numbers.

### 3.19 Bruno Simon — Portfolio v2
- **URL:** https://bruno-simon.com/ · [Awwwards](https://www.awwwards.com/sites/bruno-simon-portfolio)
- **Concept:** Driveable 3D vehicle exploring the portfolio as a literal world.
- **Steal:** **Build one gamified easter egg** — a hidden mini-scene the user discovers. Don't gamify the whole site; gamify a moment. Press / social shareability.

### 3.20 Antinomy Studio `[double-check URL]`
- **URL:** https://antinomy.studio/ · [submissions](https://www.awwwards.com/antinomy/submissions)
- **Concept:** Amsterdam type-led brand-building.
- **Steal:** 12-column editorial grid + oversized H1s + one signature transition = credible portfolio without engine-level engineering.

### 3.21 Tendril / FutureDeluxe / Forever
- **URLs:** https://tendril.studio/ · https://futuredeluxe.com/ · https://www.thinkforever.com/
- **Concept:** Motion-studio sites where the page is a frame for moving image.
- **Steal:** **Triple-encode reels** (AV1 / HEVC / H.264) with quality ladders. Cinematic site = no buffering, ever. Bunny.net or Mux as CDN.

### 3.22 60fps — Creative-dev partner
- **URL:** https://60fps.fr/ · [profile](https://www.awwwards.com/weare60fps/)
- **Concept:** Studio that other agencies (Immersive Garden, Bonhomme) hire as the WebGL hands.
- **Steal:** Pick **one** measurable promise (e.g. *"Every project ships at 60fps on a 3-year-old phone"*) — make it the meta description, the footer, and a line in the pitch deck.

### Cross-cutting principles for the 25Horas build

1. **Build a real WebGL pipeline once.** KTX2, channel-packed PBR, Draco-compressed GLTF, HLS video atlas. Amortise across every project page.
2. **One signature interaction beats five.** Montfort = soft cuts. Igloo = continuous world. Siena = filmstrip. Pick yours; perfect it; repeat.
3. **Sound is the cheapest moat.** A €3k original score from a Lisbon composer + scroll-synced playback = a tier nobody in PT is touching.
4. **Yearly "wrapped" microsite.** Every January, a fresh SOTD bid.
5. **For hospitality / real-estate clients:** study Bonhomme, Montfort, Siena. Avoid the Resn/Igloo chaotic register — wrong tonal fit.

---

## 4. Competitive map — where 25Horas needs to sit

### 4.1 The global tier (the visual ceiling)
| Studio | The one thing they own |
|---|---|
| **Active Theory** | The portfolio *is* a 3D office. Hydra engine R&D moat. |
| **Resn** | Internet weirdness as craft. 2× Awwwards AOTY, FWA HoF. |
| **Locomotive** | Smooth scroll + editorial restraint. 7× Awwwards AOTY. |
| **Immersive Garden** | Hand-sculpted CGI passed into WebGL. AOTY 2025. |
| **Buck** | Charm at enterprise scale. Made the Alegria style. |
| **ManvsMachine** | Products as moving sculpture. |
| **FutureDeluxe** | "New aesthetics" R&D positioning. Research-led 3D. |
| **Tendril** | Materials porn — surfaces you want to touch. |
| **Hello Monday** | Craft + magic narrative scaffolding. |
| **DEPT** | Corporate scale signal. Lovies AOTY 2025. |
| **Bonhomme** | Luxury-maison editorial restraint. |
| **Sennep** | A *color* — mustard yellow as memorable handle. |
| **Studio Freight** | Refusal aesthetic + open-source toolchain (Lenis). |
| **60fps.fr** | Performance as brand promise. |

### 4.2 The Portuguese floor (the regional reality)
- **Filmesdamente** (filmesdamente.com) — competent, festival-awarded film studio; site is case-led but conservative. The honest local ceiling.
- **Twentyfour Seven** (twentyfourseven.xyz) — cleanest of the PT-active set, but really a Madrid agency with a Lisbon office.
- **Escama Films** (escamafilms.com) — service + portfolio pattern, WordPress-feeling. Representative baseline.
- **Unbelievable Productions** (unbelievable-productions.pt) — template-feeling, SEO-led. Floor reference.

The bar to look world-class in Portugal is much lower than the bar to look world-class globally. But the *only* bar that matters when pitching is the global ceiling, because that's what makes the international hospitality / institutional clients trust you.

### 4.3 The visual gap
- 25Horas's current Instagram feed is a competent regional video-agency feed — service-mix posts, partnership announcements, vertical thumbnails. **It has no signature look.**
- The global ceiling owns a single, repeatable visual device that you can identify in three seconds with the logo cropped out.
- **The landing's first job is to give 25Horas that signature.** The Instagram should then start following the landing's design language, not the reverse.

### 4.4 The opportunity gap — the position to claim
The WebGL-studio crowd doesn't natively speak cinema. The film-studio sites that try to bridge into web (Furrow, BADASS, Working Stiff, Siena Film) are good but each owns only one of the cinema-language tools (filmstrip, type punch, trailer pacing). **Nobody owns the full cinema-language stack — anamorphic + frame-count + grade + sound + slates + timecode + serif — as one coherent system.** That's 25Horas's lane.

---

## 5. Three concept directions

Each is distinct, fits the cinema/film space, and is buildable within scope. After the three, I recommend one for prototype.

### Concept A — **"25 Frames" — The Cinema Studio** ★ recommended
> *"Every other top agency is a software studio that happens to make video. 25Horas is a cinema studio that happens to ship the web."*

- **The hook.** The number in the name *is* the design system. 25fps cinema cadence. 2.39:1 anamorphic. Slate typography. Scroll-as-timeline. Ambient room tone. One house LUT grading every frame across the site.
- **Opening 3 seconds.**
  - 0.0s — Black frame. Pure black, full screen, no chrome.
  - 0.3s — Single soft mechanical sound — a projector start, a shutter click. Room tone fades in beneath.
  - 0.6s — Slate appears: *"25 HORAS / ROLO 01 / TAKE 01"* in mono type, lower-left. Top-right counter: `01:00:00:00`.
  - 1.5s — Slate snaps away with a real slate clap (sound). Black frame holds for one beat (the editor's pause).
  - 2.2s — First frame of the hero reel rolls in 2.39:1, with letterbox bars as UI chrome (nav top, audio toggle bottom). Timecode in the corner advances.
  - 3.0s — Scroll cue appears: a single arrow, mono, no animation. The user knows what to do.
- **Core interaction metaphor.** Scroll *is* the timeline. The site is one continuous edit cut into reels (sections). Each reel is a chapter slate + a single signature interaction + footage. Transitions are real cuts (instant) or real fades (with timing — 12 frames). No crossfades.
- **Verticals as a festival programme.** Hospitality / Music / Sports / Institutional / Real Estate / Events become "programmes" in a festival lineup. The nav reads like a Cannes schedule, not a SaaS menu.
- **Tech stack.** Next.js (app router) on Vercel · React Three Fiber used surgically (the slate clap, the letterbox transitions, the audio visualizer — *not* a full 3D world) · GSAP + ScrollTrigger · Lenis tuned fast (not the cliché lazy default) · Howler.js for the room-tone layer · HLS.js with Bunny.net for adaptive video · Sanity for CMS · Cal.com embed for booking.
- **Why this fits a cinema/video agency.**
  - The "25 = 25fps" reading is too perfect to leave on the table. It's free brand equity.
  - Cinema language is the genuine white space — no global agency owns the full stack.
  - It's *honest* about who 25Horas is (a film agency), not pretending they're a software studio.
  - It scales: every new case fits the template without re-design.
  - It's solo-buildable. No 6-person WebGL team required.
- **Complexity:** **Medium.** The video pipeline (HLS + posters + grade + frame-rate fidelity) is the real engineering. The 3D is one shader + a few transitions. Achievable in ~10 weeks solo.

### Concept B — **"Hora Mágica" / The Magic Hour**
> The site is one continuous light cycle — golden hour into blue hour into night, driven by your scroll position. Time as navigation.

- **The hook.** *Hora mágica* is the cinematographer's term (English: "magic hour"). Owns the DP/photographer discipline. The whole site lives in one volumetric light environment that shifts as you scroll. The grade of every project thumbnail responds to the current time-of-day.
- **Opening 3 seconds.** User lands; the page opens in the time-of-day that matches their actual local time (golden if it's 18:30 in Lisbon, blue if it's 21:00, night if it's 02:00). One single horizontal beam of light moves across the dark canvas, sweeping a serif logo into existence as it passes. Wind / cicadas / nightroom underneath.
- **Core interaction metaphor.** Scroll = time. As you descend, the site's volumetric lighting and LUT shift continuously. Project cards are silhouetted against the current sky; on hover, the project reel plays in the current grade.
- **Tech stack.** R3F + custom GLSL for the volumetric light pass + Three.js post-processing for the LUT pipeline + GSAP + Lenis + HLS for project reels + Howler for ambient layers (separate beds per time-of-day).
- **Why this fits.** Cinematographers will weep. DPs and directors will share this. Owns a Portuguese light identity (the actual Iberian Atlantic light is a documented thing).
- **Complexity:** **High.** A real-time volumetric light + dynamic-LUT system at 60fps on mobile is non-trivial. KTX2 textures + careful shader budgets mandatory. Adds 4–6 weeks vs. Concept A.

### Concept C — **"Sala 25" / Hall 25** — The Screening Room
> The site is a virtual film festival venue. You're seated. Each project is now showing in a hall named for its vertical.

- **The hook.** Inverts the Active Theory move (their office becomes the portfolio): here a *cinema venue* becomes the portfolio. Six halls = six verticals. Cinema as venue, not service.
- **Opening 3 seconds.** Camera dolly forward through a dark corridor; programme posters on the walls (the current projects); doors part; seats visible; screen lights up; first frame of a reel rolls. The site loads inside *Hall 1* (the most recent project) by default.
- **Core interaction metaphor.** Drag = camera pan inside the venue. Click a door = teleport into that hall. Inside each hall, the project plays full screen; scroll reveals credits, behind-the-scenes, contact-this-team CTA.
- **Tech stack.** R3F + Three.js + Cannon.js (light physics for doors) + Houdini/Blender baked assets, exported as Draco-compressed GLTF + KTX2 textures + GSAP + a real ambient audio layer with spatial Howler.
- **Why this fits.** Most ambitious, most impressive on the first viewing, most quotable in press. *"Visit our cinema."*
- **Complexity:** **High → very high.** Real 3D environment + LOD + spatial audio + content management for the "now showing" posters. Comparable engineering to Igloo Inc. Realistic only with 14–16 weeks and a willingness to absorb a 3D-asset pipeline. Right move *only* if the budget supports it or if you want to bet bigger.

### The recommendation

**Ship Concept A. Hold B and C as v2 / showcase microsites.**

- A is ownable, achievable, and Awwwards-submittable.
- A's "25 = 25fps" reading is irrefutable — it'll close the pitch.
- B is the natural year-2 microsite (a Magic Hour case-study site for a single hospitality client).
- C is the long-bet — pitch as the "wrapped 2027" or a Cannes-week stunt.

The rest of this manual specs Concept A.

---

## 6. Recommended technical architecture (Concept A)

### 6.1 Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 15 (app router)** | Streaming SSR, edge-friendly, Vercel-native, mature ecosystem. |
| Hosting | **Vercel (Pro)** | Edge functions, image optimisation, preview deploys for client review. |
| 3D | **Three.js + React Three Fiber** (surgical use) | One shader (letterbox transition), one audio-visualizer, no full 3D world. Cheap to ship, high return. |
| Animation | **GSAP 3 + ScrollTrigger** | The non-negotiable. Don't fight it. |
| Smooth scroll | **Lenis**, configured fast (duration ~0.8, easing closer to linear than the default 1.2) | The default ease is the cliché. Tune it to *feel* like a film cut, not a syrup pour. |
| Audio | **Howler.js** for the ambient bed; Web Audio API for the scroll-driven score in v2 | Howler handles browser-autoplay edge cases. |
| Video | **HLS.js + Bunny.net** (or Mux) with **AV1 / HEVC / H.264** ladder | No buffering ever. Per-bitrate posters. |
| Image | **Next/Image** with KTX2 for any 3D textures | KTX2 + channel-packed PBR for the few 3D assets. |
| CMS | **Sanity** | Gives 25Horas content control after launch without dev intervention. Structured content for "case as chapter." |
| Forms | **react-hook-form** + **Resend** for transactional email; persisted to **Sanity** | Simple, owned, no third-party form-builder lock-in. |
| Booking | **Cal.com** embed | Free tier acceptable; self-hosted fallback if 25Horas wants. |
| Auth (admin) | **NextAuth** if Sanity Studio is embedded | Likely unnecessary — Sanity has its own. |
| Analytics | **Plausible** (privacy-respecting) | Aesthetic + GDPR-clean for a Portuguese client. |
| Error tracking | **Sentry** (free tier) | Catch the prod regressions before the client emails you. |
| CI/CD | **GitHub Actions** → Vercel | Lint + typecheck + lighthouse-ci budget check on every PR. |
| DNS | Whoever they currently use (likely Cloudflare or registrar default) | Document the transfer plan. |

### 6.2 Asset pipeline

- **Video:** Source ProRes / DNxHR delivered by 25Horas → ffmpeg pipeline → AV1 (primary), HEVC (Apple), H.264 (fallback), each in 1080p / 720p / 540p / 360p ladders. Generated posters (frame 0 + frame at 25%) as AVIF/WebP. Hosted on Bunny.net, served by HLS.js with poster pre-loaded.
- **Images:** Source AVIF; fallback to WebP; JPEG only as last resort. Next/Image with `priority` only on the hero.
- **Fonts:** Subset to Portuguese + English glyphs (drop CJK), `font-display: swap`, self-hosted (no Google Fonts CDN call — also a privacy win).
- **3D assets (the few we need):** Draco-compressed GLTF, KTX2 textures with channel-packed PBR.

### 6.3 Performance budget — *published on the about page*

| Metric | Budget | Why |
|---|---|---|
| LCP | **< 1.8s** on 4G | Faster than 90% of Awwwards SOTDs. |
| INP | **< 200ms** | The new responsiveness metric. Cinema must feel instant. |
| CLS | **< 0.05** | Cinema doesn't shift. Reserve space for everything. |
| JS bundle (initial) | **< 180kb gzipped** | Hard ceiling. Lazy-load everything else. |
| First reel TTFF (time-to-first-frame) | **< 800ms** on 4G | The wow moment can't be a buffer wheel. |
| Scroll FPS | **60fps M1 desktop / 30fps mid-tier Android** | Mobile parity, honest fallback. |
| Lighthouse Perf | **≥ 95 mobile** | Submittable bar. |
| Lighthouse A11y | **= 100** | Cinema is for everyone; captions + audio toggle baseline. |

These numbers are not aspirational. They get enforced in CI with `@lhci/cli` — fail the build under threshold.

### 6.4 Mobile fallback strategy

- Letterbox bars *stay* on mobile — the 2.39:1 framing is the brand. Vertical screen real-estate above and below the bars holds the chrome.
- Hero reel: 720p at 25fps (not 24p — 25p is broadcast-PAL safe and matches the brand math).
- The audio toggle persists; tap-to-start (iOS Safari autoplay constraint).
- No 3D shader on mobile under the M-tier threshold; substitute a pre-rendered video of the same transition (one-time encode, reuse forever).
- Touch is "drag to scrub" on case films, not the WebGL hover-to-play.

### 6.5 Sound architecture

- **Hero bed:** 30s loop of room tone (cafeteria distant chatter + AC hum + a single church bell hit every ~20s). Loops seamlessly. Triggered by first user gesture. Audio toggle visible permanently.
- **Slate cuts:** real recorded slate-claps as section transitions (not synth). Three variants randomised so they don't feel mechanical.
- **Hover sound:** one subtle film-projector "tick" on nav hover. Volume -18dB. Killed if `prefers-reduced-motion`.
- **Case films:** play with their own diegetic audio when the user activates them. The ambient bed ducks -6dB while a case is active.
- **All sound respects `prefers-reduced-motion` and an explicit audio toggle stored in localStorage.**

### 6.6 Accessibility & internationalisation

- WCAG 2.2 AA. `prefers-reduced-motion` substitutes static frames for every motion (slate appears, doesn't snap; LUT applies, doesn't transition).
- All hero copy bilingual (PT primary, EN secondary). Stored in Sanity with locale field, not hard-coded.
- Captions on every case film (PT + EN VTT tracks). Toggle in the chrome.
- Keyboard navigation across the festival programme — arrow keys advance reels, space pauses, M mutes.
- Skip-to-content link as the first focusable element.

---

## 7. Required page sections — full spec

The site is a single edited piece with chapters, not a traditional page tree. Each chapter is its own URL for SEO and shareability, but reads as one continuous reel.

### 7.1 `/` — Hero / Entrance (Reel 01)

**Intent:** lock identity in <3 seconds. Make the first frame unforgettable.

**Layout:** 100vh, 2.39:1 letterbox. Top bar (letterbox): wordmark left, language toggle + nav-open + audio toggle right. Bottom bar (letterbox): live timecode counter (`HH:MM:SS:FF`, advancing in real time at 25fps), scroll cue centred. Centre: the hero reel.

**Behaviour:** Hero reel autoplays muted in 2.39:1 with the house LUT baked in. On first scroll, the reel scrubs (scroll-as-playhead) for 2 seconds, then locks and the next reel slides up.

**Content needs from client:** 60–90s showreel, ProRes 422 HQ, original audio stems separated.

### 7.2 `/manifesto` — Reel 02 — The Manifesto

**Intent:** the confidence flex. Anti-WebGL counter-punch. Plain text on a near-black canvas.

**Layout:** centred column, mono type, one short paragraph (3–5 sentences) in PT + EN. No animation. No images. Just words. Below the paragraph: a single horizontal line that runs the width of the column, then the signature mark.

**Behaviour:** static. The only motion: cursor changes to a vertical bar (a film cut) on hover over the paragraph.

**Content needs:** the manifesto copy. Draft for them if not provided. Sample:

> *Não fazemos vídeos. Fazemos filmes para marcas.*
> *Cada projeto começa no slate e termina no genérico final.*
> *25 frames por segundo. 25 horas por dia.*
> *— 25Horas*

### 7.3 `/programa` — Reel 03 — The Programme (work index)

**Intent:** verticals as a film festival lineup. Six "programmes" (one per vertical).

**Layout:** vertical scrolling list, one programme per scroll-snap section. Each programme is a single full-bleed still (the strongest project in that vertical), with the programme title in serif, the project count, and a *"Ver Programa →"* link. On hover, the still becomes the reel.

**Behaviour:** scroll-snap between programmes. The bottom letterbox shows the current programme name in mono.

**Content needs:** for each vertical, a hero still + the project list metadata (client, year, role).

### 7.4 `/programa/{vertical}` — Reel 04 — Programme detail

**Intent:** the case list for that vertical. Reads like a festival schedule.

**Layout:** typographic schedule. Each project = one row: time slot (a stylised showtime, e.g. `19:30 – 19:55`), project title in serif, client in mono, duration. Hover plays a 5s teaser inline (small player, lower-right).

**Behaviour:** click → individual case page. Keyboard `j/k` to navigate the list.

### 7.5 `/caso/{slug}` — Reel 05 — Case study

**Intent:** the single project told as a short film. The format Locomotive nails on every project.

**Layout (linear, scroll-driven):**
1. **Slate** — black canvas, mono slate (`PRODUÇÃO / CLIENTE / ANO / TAKE`). Hold 1 beat.
2. **Hero film** — full-bleed in 2.39:1, autoplay muted, audio toggle prominent. 30–90s.
3. **Credit roll** — director, DOP, producer, year, location. Mono, scrolling.
4. **Behind-the-scenes** — 3–5 stills with one-line captions, in the house LUT.
5. **Next programme** — link to the next case in this vertical. Full-bleed still. Mimics "now showing" cinema posters.

**Behaviour:** each section is a chapter; the timecode in the chrome reflects the scroll position as a film time.

**Content needs:** for each case, one master film file, 3–5 stills, credits, a one-line description (PT + EN).

### 7.6 `/estudio` — Reel 06 — Studio

**Intent:** about page. Team, location, philosophy. Built around the manifesto.

**Layout:** four short sections — *Quem somos / Onde estamos / O que fazemos / Como trabalhamos*. Mono headings, serif body, single accent color. One studio photo, full-bleed, in the house LUT.

**Content needs:** team list (name, role), one good studio/team photo, the philosophy paragraph.

### 7.7 `/orcamento` — Reel 07 — Request a budget

**Intent:** convert serious enquiries. Short, opinionated form. No "Tell us about your project" essay box.

**Layout:** a four-step conversational form, slate-styled.
1. *Que tipo de projeto?* (vertical select, 6 chips)
2. *Que tipo de entregável?* (commercial / case / documentary / event-cover / branded series — 5 chips)
3. *Que prazo?* (3 chips: < 1 mês / 1–3 meses / > 3 meses)
4. *Que orçamento?* (3 bands, defined ahead with 25Horas)
5. *Como vos contactamos?* (name, email, phone, optional company)

After submit: a slate confirmation ("CENA 01 / TAKE 01 / EM ESPERA") and a Cal.com booking link as the next step.

**Behaviour:** keyboard-first. Tab navigation. Single CTA per step. Each step is a chapter slate.

**Content needs from client:** their qualifying questions, their budget bands, lead-routing email, optional CRM (HubSpot / Pipedrive / sheet).

### 7.8 `/marcar` — Reel 08 — Book a call

**Intent:** the warm enquirer who's already convinced. Direct Cal.com / Calendly embed.

**Layout:** a slate header (*"REUNIÃO / 30 MIN / ON-LINE"*) above the embed. Embed themed to match (Cal.com supports CSS custom properties).

**Behaviour:** straight Cal.com embed. Pre-fills name/email if the user came via the budget form.

**Content needs:** which calendar account; meeting types; durations.

### 7.9 `/contacto` — Reel 09 — Contact

**Intent:** the human channel. For press, partners, talent.

**Layout:** four blocks of mono text: *Atendimento* (email + phone), *Imprensa* (separate email), *Talento / colaborações* (separate email), *Morada* (physical address if they want one). Single line above: *"Por filme, por proposta, por café."*

**Content needs:** the email matrix, phone, optional physical address.

### 7.10 Footer (persistent across all reels)
- Wordmark + tagline.
- Three columns: *Programa* (vertical links), *Estúdio* (manifesto / about / contact), *Atendimento* (email / phone / booking).
- Social: Instagram, Vimeo (push them to start one), LinkedIn (push them to start one).
- Newsletter signup: *"Recebe um filme nosso por mês"* — one email per month, one case study.
- Legal: Privacy + Cookies + CRC + NIF (Portuguese business identifiers — request from client).
- Build credit on the very bottom, mono, small: *"Desenhado e construído por [you]"*. This is your portfolio anchor.

---

## 8. Asset checklist — exactly what to request from 25Horas

Hand them this list verbatim in the kickoff. Everything not delivered by day 7 of Phase 0 holds the build.

### Brand
- [ ] Logo — vector source (`.ai` / `.svg`), all variants (full mark, simplified, monogram).
- [ ] Wordmark — vector source.
- [ ] Brand colors — hex codes (or willingness to define a Portuguese-light palette together).
- [ ] Brand typefaces — license files if they own any. Otherwise we propose.
- [ ] Brand guidelines PDF if it exists.
- [ ] Signature visual device (any recurring grading, framing, or graphic mark across their Instagram).

### Reel
- [ ] One master showreel, **60–90 seconds**, source format (ProRes 422 HQ or DNxHR HQX). If it doesn't exist, decide jointly: cut from existing cases (us) or commission a new edit (them).
- [ ] Audio stems (music, dialogue, SFX) separated. Critical for the sound architecture.

### Cases — for each project (minimum 6, ideal 10)
- [ ] Master video file (ProRes / DNxHR / high-bitrate H.265).
- [ ] Project metadata: client, year, role, deliverable type, vertical, duration.
- [ ] Credits: director, DOP, producer, editor, composer, post house.
- [ ] 3–5 stills per project (high-res, RAW or 16-bit TIFF preferred).
- [ ] One-line PT description + EN translation.
- [ ] Client logo (vector).
- [ ] Permission to publish (some clients NDA — we need to know which can show).

### Studio
- [ ] Team list — name, role, optional headshot.
- [ ] One studio / team photo, high-res, in their best light.
- [ ] Manifesto / about copy in PT (we'll translate, with their review).
- [ ] Service descriptions per vertical, short (one paragraph each).

### Operational
- [ ] Lead routing — which email should form submissions hit?
- [ ] CRM integration — if any (HubSpot, Pipedrive, sheet).
- [ ] Cal.com / Calendly account — or willingness to set one up.
- [ ] Domain ownership / DNS access at the registrar.
- [ ] Hosting preference (recommend Vercel Pro; their commit ~$20/mo).
- [ ] Email provider (Resend recommended for the transactional layer).
- [ ] Newsletter platform (Buttondown / Loops / native).

### Legal & compliance (Portugal-specific)
- [ ] NIF (Portuguese tax number) for the legal footer.
- [ ] Existing privacy policy + cookies policy, or willingness to draft from template.
- [ ] GDPR / RGPD posture — explicit consent for analytics (Plausible is cookieless so no consent banner needed; flag this as a feature).

### Sound (if they buy the score moat in section 9)
- [ ] Composer recommendation — propose 2–3 Lisbon-based composers.
- [ ] Budget approval for a custom 60–90s score (~€2–4k).

---

## 9. Build roadmap — 10 weeks, solo, realistic

A schedule that ships. Each phase has a hard exit gate; nothing slides without the client signing off.

### Phase 0 — Discovery & Kickoff (Week 1)
- Brand audit + competitive walk-through (this manual is the artifact).
- Asset request issued (section 8) with a 7-day deadline.
- Concept lock meeting: present the three concepts, defend Concept A, get explicit written buy-in.
- Performance budget contractually agreed.
- Scope contractually agreed (MVP = sections 7.1–7.10; everything else is paid v2).
- **Exit:** signed SOW, signed concept lock, asset deliveries scheduled.

### Phase 1 — Design & Hero Prototype (Weeks 2–3)
- Moodboard + visual system (type, color, grade LUT, motion principles) — Figma deliverable.
- House LUT designed (Lightroom or DaVinci) and exported as a `.cube` file we apply via shader.
- Hero motion prototype: shipped as a single Vercel preview URL. The opening 3 seconds + the first scroll-to-second-reel. Cinematic-quality, browser-tested.
- Type system in code (variable font loaded, scale committed).
- **Exit:** client sees the hero on a real device and says yes. **This is the make-or-break gate.** If we don't get the wow here, we revisit before building further.

### Phase 2 — Frame & Chrome (Weeks 4–5)
- Production-quality hero hardened with HLS + posters.
- Letterbox chrome system as reusable component.
- Slate component, timecode component, audio toggle, language toggle.
- Navigation system, page transition system (real cut, real fade).
- Performance pass on hero — LCP < 1.8s enforced.
- Sanity schema for Cases + Programmes + Manifesto + Studio.
- **Exit:** hero + chrome shipped to a staging URL, performance budget met.

### Phase 3 — Programa & Cases (Weeks 6–8)
- `/programa` (programme index) built and content-populated.
- `/programa/{vertical}` template + content populated.
- `/caso/{slug}` template + content populated (start with 3 hero cases; the others follow as content arrives).
- HLS encoding pipeline run on all delivered cases.
- Audio integration: room-tone bed, slate claps, hover ticks, all gated behind first gesture + toggle.
- Behind-the-scenes stills integrated.
- **Exit:** all delivered cases live on staging, audio working, no buffering on a 4G throttle test.

### Phase 4 — Conversion & Comms (Week 9)
- `/orcamento` budget form (4-step slate form) + Resend wiring.
- `/marcar` Cal.com embed themed.
- `/contacto`, `/manifesto`, `/estudio` final passes.
- Footer + newsletter wiring.
- Sanity Studio handed over to client with a 30-min Loom walkthrough.
- **Exit:** all routes live on staging, all form submissions land in the right inboxes, client can edit Cases in Sanity unsupervised.

### Phase 5 — Polish, Hardening, Launch (Week 10)
- Cross-browser pass (Safari iOS, Chrome Android, Edge — Safari is the one that breaks).
- Accessibility pass with axe-core + manual keyboard test.
- SEO baseline (sitemap, robots, structured data for Organization + VideoObject).
- OpenGraph + Twitter previews for every page (a custom slate for each).
- Lighthouse CI green on all routes.
- Plausible + Sentry wired.
- DNS cutover plan + rollback plan.
- 24-hour soft launch with monitoring.
- Public launch + Awwwards submission (Sunday Lisbon time = Monday US, maximises voting window).
- **Exit:** live site, submitted, monitored.

### Phase 6 — Post-launch (Week 11+, paid separately)
- Awwwards / FWA / CSS Design Awards submissions.
- Press kit + outreach to Awwwards / FWA writers, Designspiration, Godly.
- Social hand-off: how to keep Instagram visually consistent with the landing.
- Year-in-review microsite plan for January (the Unseen Studio move).

---

## 10. Risks & mitigations

The honest list. Every project that dies, dies on one of these.

### 10.1 Video weight kills mobile experience
- **Mitigation:** HLS adaptive + ABR ladder + KTX2 + lazy-load below fold. Mobile-specific 720p25 master with a smaller bitrate.
- **Tripwire:** Lighthouse mobile Perf score in CI. Fail under 95.

### 10.2 Client wants to add things (blog, services pages, multi-language, e-commerce)
- **Mitigation:** scope is contractually locked at MVP = sections 7.1–7.10. Anything else is a paid v2.
- **Tripwire:** if a feature request appears in week 6+, escalate, don't absorb.

### 10.3 Browser audio autoplay blocked → silent hero on iOS
- **Mitigation:** room tone behind first user gesture; *no* attempt to autoplay-with-sound on load. Audio toggle visible from frame one. A tiny visual cue (a pulsing waveform on the toggle) on first arrival.

### 10.4 Performance regression as cases are added
- **Mitigation:** every case must pass the LCP / INP budget on a CI lighthouse run before merging to main. Per-page asset weight ceiling published in the README.

### 10.5 Client cold-feet ("this is too different, can we add a services grid?")
- **Mitigation:** Phase 1 hero prototype is the gate. They see the wow on a real phone before we build the rest. If they cold-foot at gate 1, we revisit *before* building 9 more screens.
- **Mitigation:** the manifesto and the "25fps" line in the pitch make the radicalism *intellectually defensible* — they're not buying weird; they're buying ownable.

### 10.6 Awwwards submission timing / craft pass rate
- **Mitigation:** submit Sunday Lisbon time (Monday US morning). Cross-browser tested on real Safari iOS device. Lighthouse 95+. Audio toggle compliant. Reduce-motion respected. These are the SOTD pass-rate fundamentals.

### 10.7 Solo-dev burnout / single point of failure
- **Mitigation:** 10-week schedule has explicit phase gates. No surprise scope. Buffer week not shown (you're allowed to take week 11 to breathe before post-launch work).
- **Mitigation:** identify, on day 1, two trusted freelance subs (a colorist for the LUT, a composer for the score) — paid through 25Horas, not your fee.

### 10.8 GDPR / Portuguese legal exposure
- **Mitigation:** Plausible (cookieless analytics) → no consent banner. Forms collect only what's necessary, declared in the privacy policy. Sanity stores PII (form submissions) in EU regions. Client signs off on the privacy + cookies copy before launch.

### 10.9 The original score doesn't get commissioned (budget pushback)
- **Mitigation:** Fallback to a licensed bed from Musicbed / Marmoset (Portuguese license cleared). Half the moat, but the room-tone layer still does the cinematic heavy lifting.

### 10.10 25Horas's existing reel isn't strong enough to lead with
- **Mitigation:** flag in Phase 0. Two options: cut a new 60s reel from their best cases (~3 days of editor time, ~€800), or open the site on the strongest single case as the hero instead of a compilation reel. Either works.

### 10.11 The "coming soon" domain (`25horasagency.com`) has WordPress baggage
- **Mitigation:** clean install on a fresh Vercel deployment with a new repo. DNS cutover at launch. WordPress install can be killed the day we go live — but archive a copy first in case of legal/compliance traceback.

### 10.12 Vimeo / YouTube embed temptation
- **Mitigation:** **no.** Bunny.net HLS only. Vimeo and YouTube embed weight + their UI chrome would shatter the cinema illusion. Plus they introduce third-party tracking we don't want.

### 10.13 Search-engine traffic (low priority but worth handling)
- **Mitigation:** static-rendered pages for every case + every programme. Open Graph + Twitter cards for every URL. Structured data (Organization, VideoObject, Person for team). Sitemap auto-generated by Next.js.

---

## 11. The pitch — how to walk into the meeting

### The opening line (memorise)
> *"Every other top agency in your space is a software studio that happens to make video. 25Horas can be a cinema studio that happens to ship the web. That's a position no one currently owns, and you have the name to claim it. The 25 in your name is your frame rate."*

### The three slides (if they let you slide)
1. **The visual gap.** Three thumbnails: an Awwwards SOTD next to a strong Portuguese video-agency site next to 25Horas's current Instagram. Caption: *"This is the chasm between where you are and where you should be on the internet."*
2. **The white space.** One slide: the cinema-language stack (anamorphic / frame-count / grade / sound / slates / timecode / serif) with the heading *"Nobody owns this yet."*
3. **The hero prototype.** Either a still frame of what the hero looks like or — much better — a 20-second screen recording of the opening 3 seconds running for real. **This single artifact closes the meeting.**

### The closing question
> *"If we build the hero prototype first, and you see it on your own phone before we touch the rest of the site, are you in?"*

This pre-sells the Phase 1 gate. They have an off-ramp; you have a commitment.

### What not to say
- Don't promise Awwwards. Promise *the work that earns the submission*.
- Don't list ten technologies. Name two ("Next.js, Three.js — modern, fast, the stack the agencies you admire actually use") and stop.
- Don't quote the comparison studios by name in the pitch unless they ask. The point is to own the white space, not to position yourselves as a Locomotive clone.
- Don't talk pricing in the same meeting. Land the vision; pricing is meeting two.

---

## 12. Appendix A — moodboard sources to send the client

Curated subset of section 3 plus a few mood-only references. Use as a single PDF or Figma board for the kickoff. Pair each with one line:

- **Locomotive** (locomotive.ca/en) — *editorial restraint at scale*
- **Immersive Garden** (immersive-g.com) — *sculpted, physical-feeling 3D*
- **Bonhomme** (bonhommeparis.com/en) — *luxury-maison hospitality*
- **Siena Film Foundation** (siena.film) — *filmstrip as scroller*
- **Working Stiff Films** (workingstifffilms.com) — *trailer-paced scroll*
- **Furrow Studio** (furrowstudio.com) — *video-first restraint*
- **BADASS Films** (badassfilms.tv) — *type as graphic punch*
- **Studio Freight / Hyperbolic** (hyperbolic.xyz) — *refusal aesthetic*
- **60fps.fr** (60fps.fr) — *performance as brand promise*
- **A24** (a24films.com) — *serif + restraint + cinema codes*
- **Mubi** (mubi.com) — *editorial color + LUT discipline*
- **Criterion** (criterion.com) — *serif + film-poster grid + curation as voice*

The last three are not agency sites but are *the* tonal reference for "cinema studio for brands." Show them as the lighthouse.

---

## 13. Appendix B — the "25fps" idea, expanded

Quick reference card so the concept survives the meeting:

- **Reel timing.** Hero reel masters at 25fps. The chrome's timecode counter advances at 25fps.
- **Section transitions.** Hold durations in frames (24 frames = 0.96s at 25fps). All GSAP durations expressed and commented in frames.
- **Slates.** Every section / case / chapter introduced by a real slate, 30 frames hold, real recorded slate clap.
- **Letterbox.** 2.39:1 anamorphic at all times on hero and case films. Letterbox bars are *the chrome*, not dead space.
- **Color grade.** One LUT, designed once, applied via shader on top of every video frame and to UI accents. The site looks "graded," not "designed."
- **Sound bed.** Diegetic room tone, looping. First gesture starts it. Persistent audio toggle.
- **Serif somewhere.** Case titles in editorial serif (PP Editorial New / Söhne or similar). Body in restrained grotesk. Slates in mono.
- **The wordmark / lockup.** `25 HORAS` with a thin separator that could be misread as a colon — `25:HORAS` — a typographic micro-flex that reads like a timecode.

---

## 14. Honest things to confront before we build

- **Is the client emotionally ready for restraint?** Restraint is the whole game. If they really want "more 3D" and bigger animations, this concept won't survive contact. Find out at the concept-lock meeting, not in week 8.
- **Will their reel hold up?** The site is a vessel for the work. If the work isn't strong, the chrome amplifies that, not hides it. We need to see the showreel before week 1 ends.
- **Are they ready to be cited as the cinema studio?** If they aspire to *that* identity, then yes. If they think of themselves as a video / marketing agency that does whatever pays, the position won't hold and we should pitch a different concept (Concept B is the gentler alternative).
- **Will they actually feed the site?** A site this opinionated needs new cases regularly. Confirm a content cadence (one new case per quarter, minimum). Otherwise build a static fallback into the architecture.
- **Are we going to put your name in the footer?** This site is going to be one of your strongest portfolio anchors. Negotiate the build credit in the SOW.

---

## 15. Next step

Phase 2 starts the second they sign concept lock. Until then:

1. Send the client this manual (or a redacted client-facing version).
2. Schedule the concept-lock meeting. 60 minutes. In person if possible.
3. The day after concept lock, send the asset request list.
4. Block Weeks 2–3 for the hero prototype. Nothing else competes for those two weeks — the hero is the bet.

When the hero prototype lands, we move to Phase 2 and the rest of this manual becomes the build checklist.

---

*End of Phase 1 manual.*
