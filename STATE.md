# 25 Horas — Manual de Execução

> **Snapshot:** 2026-05-24, checkpoint `a06483c`.
> Companheiro do [`MANUAL.md`](./MANUAL.md) (estratégia pré-build).
> Este ficheiro é o **manual operacional**: ordem certa de execução, do estado actual até site pronto para ir online.
>
> **Princípio:** corrigir tudo o que está partido / inconsistente / em falta no website **ANTES** de pensar em domínio, deploy ou hosting. Deploy é o **último** passo, não o primeiro.

---

## Como usar este manual

1. **Audit do estado** — fotografia detalhada por categoria.
2. **Os Prompts** — 110+ tarefas numeradas (`P-001`…`P-XXX`), cada uma com prioridade, esforço, ficheiros, critérios, snippets. Auto-contidas (copy-paste para outro agente funciona).
3. **Appendices** — runbooks, style guide, brand voice, gotchas.

### Convenções

- **Prioridade:** `P0` (blocker para considerar o site funcional), `P1` (alta — fix antes de launch), `P2` (média — fix em iterações), `P3` (long-term / nice-to-have).
- **Esforço:** `XS` (<30 min), `S` (~1h), `M` (~half day), `L` (~1 day), `XL` (~multi-day).
- **Fase:** 1 (audit) → 18 (deploy, último). Deploy só na Fase 18.
- **Estado:** ✓ feito, ⚠ parcial / questionável, ✗ não feito, ⏸ deferido.

### Ordem mental

```
Audit → Fix broken → Decide pending → Add missing → Polish → Test → Legal → Deploy
  1       2-5         6              7-11         12-14    15    16     17-18
```

---

## Índice

- [TL;DR — onde estamos](#tldr--onde-estamos)
- [Audit do estado actual](#audit-do-estado-actual)
- [Snapshot técnico](#snapshot-técnico)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Sistema visual](#sistema-visual)
- [Modelo de conteúdo](#modelo-de-conteúdo)
- [Rotas e sitemap](#rotas-e-sitemap)
- [Inventário de componentes](#inventário-de-componentes)
- [Sistema de áudio](#sistema-de-áudio)
- [Animação e scroll](#animação-e-scroll)
- [Matriz de prioridades](#matriz-de-prioridades)
- [Os Prompts](#os-prompts)
  - [Phase 1 — Audit & Discovery](#phase-1--audit--discovery)
  - [Phase 2 — Routes & broken links](#phase-2--routes--broken-links)
  - [Phase 3 — Visual / UI bugs](#phase-3--visual--ui-bugs)
  - [Phase 4 — Forms & functional fixes](#phase-4--forms--functional-fixes)
  - [Phase 5 — Decisões pendentes & dead code](#phase-5--decisões-pendentes--dead-code)
  - [Phase 6 — Conteúdo do cliente](#phase-6--conteúdo-do-cliente)
  - [Phase 7 — Mobile & responsive](#phase-7--mobile--responsive)
  - [Phase 8 — Accessibility](#phase-8--accessibility)
  - [Phase 9 — Error pages & loading states](#phase-9--error-pages--loading-states)
  - [Phase 10 — Component cleanup](#phase-10--component-cleanup)
  - [Phase 11 — SEO & metadata](#phase-11--seo--metadata)
  - [Phase 12 — i18n PT/EN](#phase-12--i18n-pten)
  - [Phase 13 — Performance](#phase-13--performance)
  - [Phase 14 — Tests](#phase-14--tests)
  - [Phase 15 — Features em falta](#phase-15--features-em-falta)
  - [Phase 16 — Legal & privacy](#phase-16--legal--privacy)
  - [Phase 17 — Analytics & monitoring](#phase-17--analytics--monitoring)
  - [Phase 18 — Deploy & launch](#phase-18--deploy--launch)
- [Appendix A — Style guide & brand voice](#appendix-a--style-guide--brand-voice)
- [Appendix B — Image / video / audio specs](#appendix-b--image--video--audio-specs)
- [Appendix C — Component reference](#appendix-c--component-reference)
- [Appendix D — Gotchas & tribal knowledge](#appendix-d--gotchas--tribal-knowledge)
- [Appendix E — Test matrix](#appendix-e--test-matrix)
- [Appendix F — Glossary](#appendix-f--glossary)

---

## TL;DR — onde estamos

- **Cliente:** 25 Horas Agency (Lisboa). Audiovisual + comunicação 360º.
- **Estado:** protótipo funcional em `localhost:3000`. Mecânica visual fechada (Phase 1). Conteúdo placeholder. Vários componentes legados ou em estado desconhecido. Forms não submetem. Várias decisões pendentes.
- **Para considerar o site PRONTO** (antes de deploy): **~70 prompts P0+P1** divididos em 17 fases de polish/fix/conteúdo.
- **Para ir ONLINE depois disso:** Phase 18 (~5 prompts: domínio, Vercel, DNS, SSL, smoke tests).
- **Estimativa total realista:** 12-20 dias de trabalho focado.

---

## Audit do estado actual

### O que funciona

| Área | Detalhe |
|---|---|
| Home `/` | AgencyIntro + SplitScrollReel + GaleriaReel renderizam |
| NavOverlay | Lista 6 nichos via NICHOS, ATENDIMENTO 4 atalhos |
| Áudio | Toggle SOM, persistência cross-nav, auto-pausa iframes |
| Wordmark | Timecode `25:00:00:00` running |
| Split BG | preto / cream + hairline central |
| Accordion | Hover-CSS + click-lock React, animação 0.5s ease-cinema |
| `/servicos` index | Cards cream com logos legíveis |
| `/servicos/[nicho]` | 6 páginas geradas estáticas |
| `/servicos/[nicho]/portfolio` | Renderiza, "EM CONSTRUÇÃO" se vazio |
| Tipografia | Fraunces + Nunito via next/font |
| `tsc --noEmit` | Limpo |

### O que está partido / inconsistente

| # | Issue | Prompt |
|---|---|---|
| 1 | Form `/orcamento` **não submete** | [P-020](#p-020) |
| 2 | Form `/marcar` em estado desconhecido | [P-021](#p-021), [P-022](#p-022) |
| 3 | `/contacto` referenciada mas **não existe** | [P-023](#p-023) |
| 4 | `/programa/[vertical]` tem verticais legados (hospitalidade, música…) **desalinhados** com 6 nichos novos | [P-040](#p-040) |
| 5 | `/caso/[slug]` esqueleto **sem conteúdo populado** | [P-041](#p-041) |
| 6 | `LangToggle` visível mas **sem i18n** | [P-014](#p-014) |
| 7 | 404 default Next.js (não customizado) | [P-080](#p-080) |
| 8 | 500 default Next.js (sem error boundary global) | [P-081](#p-081) |
| 9 | iOS Safari Mobile: `background-attachment: fixed` (em `.split-text`) **não funciona** | [P-036](#p-036) |
| 10 | `priority` em todas as `<Image>` do GaleriaReel — só above-the-fold devia ter | [P-130](#p-130) |
| 11 | `agency-bw.png` 5505×3072 (~700KB) sem optimização | [P-130](#p-130) |
| 12 | `howler` instalada e **não usada** | [P-100](#p-100) |
| 13 | `HeroSequence`, `AccordionReel`, `VisaoReel`, `HeroReel`, `ProgrammeBlock`, `CaseReel` — estado de uso **desconhecido** | [P-001](#p-001), [P-101](#p-101) |
| 14 | `MeshGradient`, `Viewfinder`, `GradedVideo` effects — uso a confirmar | [P-101](#p-101) |
| 15 | `agency.png`, `producoes.png` logos órfãos no `/media/logos/` | [P-046](#p-046) |
| 16 | `bts-1..3.jpg` não são usados | [P-047](#p-047) |
| 17 | `public/media/nichos/*.jpg` existem mas não usados | [P-048](#p-048) |
| 18 | `hero.mp4`, `25hh.mp4` removidos da home — destino indefinido | [P-049](#p-049) |
| 19 | `AgencyIntro` `transform: translateX(-2px)` hardcoded — pode não escalar | [P-031](#p-031) |
| 20 | Posters GaleriaReel cruzam divisor — apesar de `.split-text` ajudar, falta confirmar em todas as resoluções | [P-032](#p-032) |
| 21 | Hover veil em GaleriaReel sobre imagem (`bg-canvas-black/0 → /10`) — confirmar tinte certo | [P-033](#p-033) |
| 22 | SOM toggle: dot indicator pode ficar fora de sync com `audio.muted` em casos edge (recarregar página, navegar de aba) | [P-024](#p-024) |
| 23 | Auto-pause em iframes via `window.blur` + `activeElement` — não funciona em todos os browsers / scenarios | [P-025](#p-025) |
| 24 | Wordmark Link `/` em produção: confirmar navegação client-side mantém timecode running | [P-026](#p-026) |
| 25 | NavOpener focus state — verificar acessibilidade | [P-072](#p-072) |
| 26 | Hairline divider `z-index: 1` vs conteúdo `z-10` — auditar **todas** as páginas, não só home | [P-034](#p-034) |
| 27 | `.split-bg` só aplicada em `/` — outras páginas têm `bg-canvas-black` plano (inconsistência visual) | [P-035](#p-035) |
| 28 | Componente `Slate` (`slate-frame` CSS) — auditar uso real e se layout corresponde ao desenhado | [P-101](#p-101) |
| 29 | `prefers-reduced-motion` activo: confirmar SplitScrollReel mostra layout fallback sem GSAP | [P-076](#p-076) |
| 30 | Scrollbar custom? Default? Validar visual cross-browser | [P-077](#p-077) |

### O que está em falta

Ver matriz por fase. Resumo:
- **Conteúdo:** manifesto real, taglines validadas, embed URLs portfolio, imagens B&W.
- **Páginas:** /contacto, /privacidade, /termos, 404, 500.
- **Funcional:** form submission (Resend), Calendly ou form interno em /marcar.
- **Polish:** mobile audit, a11y audit, error boundary, loading states.
- **Visual:** decisões sobre imagens / vídeo / hero / logos órfãos.
- **SEO:** sitemap, robots, OG images, JSON-LD, per-page metadata.
- **Legal:** privacy policy, cookie policy, aviso legal, RGPD checkbox em forms.
- **Infra:** domínio, hosting, DNS, SSL, analytics, monitoring.

### Decisões pendentes (precisam de input do cliente OU executivas)

| # | Decisão | Recomendação | Prompt |
|---|---|---|---|
| D1 | `/programa/[vertical]` — apagar / renomear / manter? | **Apagar** se redundante com `/servicos`. **Redirect** rotas antigas para `/servicos/[nicho]` equivalente. | [P-040](#p-040) |
| D2 | `/caso/[slug]` — popular agora ou apagar? | **Apagar rota** se sem conteúdo. Reintroduzir quando houver case studies prontos. | [P-041](#p-041) |
| D3 | `HeroSequence` (vídeo hero) — restaurar ou apagar? | **Manter no projecto** sem usar. Decidir com cliente em Phase 6. | [P-049](#p-049) |
| D4 | `family.png` para Saúde definitivo? | **Manter** (semanticamente correcto). | [P-117](#p-117) |
| D5 | i18n EN agora ou diferir? | **Diferir** para pós-launch. Esconder LangToggle até lá. | [P-115](#p-115), [P-014](#p-014) |
| D6 | CMS agora ou JSON estático? | **JSON estático** até cliente pedir edit autónomo. | [P-150](#p-150) |
| D7 | Hero vídeo onde? | **Pedir feedback cliente** (Phase 6). | [P-049](#p-049) |
| D8 | `agency.png`, `producoes.png` órfãos — usar onde? | `agency.png` para favicon/OG. `producoes.png` provavelmente apagar. | [P-046](#p-046) |
| D9 | `/marcar` — Calendly externo ou form interno? | **Calendly** (mais rápido, gere disponibilidade). | [P-022](#p-022) |
| D10 | `.split-bg` em todas as páginas? | **Sim** para consistência visual. | [P-035](#p-035) |
| D11 | Mailto vs `/contacto` page? | Criar `/contacto` minimal. Mailto fica como fallback. | [P-023](#p-023) |

---

## Snapshot técnico

| Categoria | Ferramenta | Versão | Notas |
|---|---|---|---|
| Framework | Next.js | ^15.0.0 | App Router, RSC + client |
| UI | React | ^19.0.0 | |
| Styling | Tailwind CSS | ^3.4.15 | + utilities `globals.css` |
| TypeScript | TypeScript | ^5.6.3 | strict |
| Animação | GSAP + ScrollTrigger | ^3.12.5 | |
| Scroll | Lenis | ^1.3.23 | Provider em layout |
| Áudio | HTML5 Audio + Web Audio | nativo | + howler instalado e NÃO usado |
| Package manager | pnpm | — | |
| Fonts | next/font/google | — | Fraunces, Nunito, JetBrains Mono |

### Scripts

```bash
pnpm dev          # localhost:3000
pnpm build        # bundle produção
pnpm start        # serve bundle
pnpm lint         # next lint
pnpm typecheck    # tsc --noEmit
```

---

## Estrutura do repositório

```
app/
  layout.tsx                      # Providers (Audio, Lenis, Nav)
  page.tsx                        # / — AgencyIntro + SplitScrollReel + GaleriaReel
  globals.css                     # Tailwind + utilities (split-bg, .v-panel, .split-text)
  manifesto/page.tsx
  marcar/page.tsx
  orcamento/page.tsx              # form NÃO submete
  programa/
    page.tsx
    [vertical]/page.tsx           # LEGADO — verticais antigos
  servicos/
    page.tsx                      # cards logos cream
    [nicho]/
      page.tsx                    # 6 nichos
      portfolio/
        page.tsx                  # Phase 1 — vazio
        PortfolioGrid.tsx
  caso/[slug]/page.tsx            # esqueleto sem conteúdo

components/
  chrome/                         # Top + Bottom + Overlay + toggles
  intro/AgencyIntro.tsx
  reels/                          # SplitScrollReel + GaleriaReel + 7 outros (uso a confirmar)
  effects/                        # GradedVideo, MeshGradient, Viewfinder
  forms/BudgetForm.tsx
  primitives/Slate.tsx

lib/
  servicos.ts                     # NICHOS + GESTAO_REDES + BASE_TRANSVERSAL
  logos.ts                        # LOGOS (6, mesma ordem)
  portfolio.ts                    # Phase 1 — JSON estático vazio
  audio-context.tsx, audio.ts
  timecode.ts                     # default 25:00:00:00
  lenis-provider.tsx, nav-context.tsx, chrome-theme.tsx
  gsap-setup.ts, tokens.ts, first-visit.ts

public/media/
  logos/                          # 8 PNGs (agency + producoes órfãos)
  nichos/                         # 6 JPGs não usados
  bg-1..8.jpg                     # backgrounds posters
  bts-1..3.jpg                    # não usados
  hero.mp4, 25hh.mp4, hero-poster.jpg
  audio/vintecinco.mp3

items/                            # material referência (não servido)
MANUAL.md                         # bíblia estratégica
STATE.md                          # este ficheiro
```

---

## Sistema visual

### Cores

| Token | Hex | Uso |
|---|---|---|
| `canvas-black` | `#0A0A0A` | Lado esquerdo do split |
| `canvas-white` | `#F5F0E8` | Cream — lado direito |
| `accent-grade` | `#C7572B` | Hover, CTAs |
| `signal-live` | `#4F9D58` | Indicador áudio activo |
| `type-neutral` | `#B7B0A4` | Texto secundário |
| `type-dim` | `#66615A` | Labels micro |
| `chrome-line` | `#1F1D1A` | Hairline + borders |

### Tipografia

- **Fraunces** → `font-serif`. Substitui Ivypresto Text (Adobe, proprietária do tomatino.pt).
- **Nunito** → `font-body`. Substitui Atten Round New.
- **JetBrains Mono** → `font-mono`.

### Timing (25fps system)

```
f-4   = 160ms
f-8   = 320ms
f-12  = 480ms
f-25  = 1000ms
f-50  = 2000ms
```

Easings: `ease-cinema` = `cubic-bezier(0.16, 1, 0.3, 1)`.

### Page split

- `.split-bg` + `.split-divider` em `<main>` de `app/page.tsx`. **Outras páginas NÃO têm** — inconsistência (ver [P-035](#p-035)).
- `.split-text` utility = `background-clip: text` com gradient fixed-attachment 50vw. Funciona desktop; **falha iOS Safari mobile** (ver [P-036](#p-036)).
- Hairline `position: fixed; z-index: 1`. Conteúdo que deve cobrir usa `z-10`.

### Aspect ratios

- `aspect-scope` = `2.39 / 1`.

---

## Modelo de conteúdo

### NICHOS (6) em `lib/servicos.ts`

| # | Code | Slug | Label |
|---|---|---|---|
| 1 | 01 | `restaurantes` | RESTAURANTES |
| 2 | 02 | `desporto` | DESPORTO |
| 3 | 03 | `real-estate` | REAL STATE |
| 4 | 04 | `travel` | TRAVEL |
| 5 | 05 | `corporate` | CORPORATE |
| 6 | 06 | `saude` | SAÚDE & FAMÍLIA |

Cada um: `video[]`, `fotografia[]`, `design[]?` (3 dos 6), + `GESTAO_REDES` shared.

### Accordion (4 ou 5 painéis)

```
01 — VÍDEO                          (sempre)
02 — FOTOGRAFIA                     (sempre)
03 — DESIGN                         (3 dos 6)
04 — GESTÃO DE REDES SOCIAIS        (sempre)
05 — PORTFOLIO →                    (Link)
```

---

## Rotas e sitemap

| Rota | Status | Issue |
|---|---|---|
| `/` | ✓ | OK |
| `/manifesto` | ⚠ | Renderiza, texto placeholder |
| `/programa` | ⚠ | Index legado |
| `/programa/[vertical]` | ⚠ | Verticais desalinhados |
| `/servicos` | ✓ | OK |
| `/servicos/[nicho]` | ✓ | 6 nichos |
| `/servicos/[nicho]/portfolio` | ✓ | Phase 1 vazio |
| `/orcamento` | ⚠ | Form NÃO submete |
| `/marcar` | ⚠ | Estado a confirmar |
| `/caso/[slug]` | ⚠ | Esqueleto vazio |
| `/contacto` | ✗ | Não existe |
| `/privacidade` | ✗ | Obrigatório RGPD |
| `/termos` | ✗ | Opcional |
| `404` | ⚠ | Default |
| `500` | ⚠ | Default |

---

## Inventário de componentes

### Chrome

| Componente | Estado |
|---|---|
| `ChromeTop` | ✓ |
| `ChromeBottom` | ✓ |
| `Wordmark` | ✓ Timecode running |
| `Timecode` | ✓ |
| `AudioToggle` | ✓ |
| `NavOpener` | ✓ |
| `NavOverlay` | ✓ |
| `LangToggle` | ⚠ visível sem i18n |
| `ScrollCue` | ✓ |
| `ChapterTag` | ✓ |

### Reels

| Componente | Usado em | Estado |
|---|---|---|
| `SplitScrollReel` | `/` | ✓ |
| `GaleriaReel` | `/` | ✓ |
| `AgencyIntro` | `/` | ✓ |
| `ManifestoReel` | `/manifesto` | ✓ |
| `HeroSequence` | (nenhum) | ⚠ desactivado |
| `HeroReel` | ? | ⚠ audit |
| `AccordionReel` | ? | ⚠ audit |
| `VisaoReel` | ? | ⚠ audit |
| `ProgrammeBlock` | `/programa` (?) | ⚠ audit |
| `CaseReel` | `/caso/[slug]` (?) | ⚠ audit |

### Outros

- `GradedVideo`, `MeshGradient`, `Viewfinder` — uso a confirmar.
- `BudgetForm` — não submete.
- `Slate` — primitivo "claquete".

---

## Sistema de áudio

- `<AudioProvider>` em layout → `<audio>` em ref persistente cross-nav.
- Background: `/media/audio/vintecinco.mp3` (loop, vol 0.5).
- **NÃO autoplay.** Primeiro click SOM → play.
- `toggle()`: play/pause + `localStorage`.
- SFX em `lib/audio.ts` via Web Audio.
- Auto-pausa em iframes via `window.blur` + `document.activeElement === IFRAME`.

---

## Animação e scroll

- Lenis smooth (provider em layout, easing `1 - 2^(-8t)`).
- GSAP + ScrollTrigger, tickers sincronizados com Lenis.
- SplitScrollReel: section 590vh (`(count+1) × 70vh + 100vh`). Left tween `y: +1h → -count*h`, right `y: -count*h → +1h`. Right column renderiza `[...LOGOS].reverse()`.

---

## Matriz de prioridades

> Ordem é a ordem de execução. Deploy é o ÚLTIMO passo.

| Phase | Prompt | Título | P | E | Bloqueia "site pronto"? |
|---|---|---|---|---|---|
| **1** | [P-001](#p-001) | Run full route audit | P0 | S | ✓ |
| 1 | [P-002](#p-002) | Run full component audit | P0 | S | ✓ |
| 1 | [P-003](#p-003) | Audit `/media/` usage | P0 | XS | ✓ |
| 1 | [P-004](#p-004) | Lighthouse baseline | P0 | XS | ✓ |
| 1 | [P-005](#p-005) | Console error sweep | P0 | XS | ✓ |
| **2** | [P-010](#p-010) | Validar todos os `href` | P0 | S | ✓ |
| 2 | [P-011](#p-011) | Fix `/contacto` (criar OU remover refs) | P0 | S | ✓ |
| 2 | [P-012](#p-012) | Fix `/programa/[vertical]` legacy | P0 | M | ✓ |
| 2 | [P-013](#p-013) | Fix `/caso/[slug]` esqueleto | P0 | S | ✓ |
| 2 | [P-014](#p-014) | Esconder `LangToggle` | P0 | XS | ✓ |
| 2 | [P-015](#p-015) | Audit redirects para rotas antigas | P1 | S | — |
| **3** | [P-020](#p-020) | Form `/orcamento` submission | P0 | M | ✓ |
| 3 | [P-021](#p-021) | Auditar `/marcar` actual | P0 | S | ✓ |
| 3 | [P-022](#p-022) | Implementar `/marcar` (Calendly) | P0 | S | ✓ |
| 3 | [P-023](#p-023) | Criar `/contacto` page | P1 | S | — |
| 3 | [P-024](#p-024) | Audio toggle edge cases | P1 | S | — |
| 3 | [P-025](#p-025) | iframe auto-pause robustness | P2 | M | — |
| 3 | [P-026](#p-026) | Wordmark client-side nav teste | P2 | XS | — |
| **4** | [P-030](#p-030) | SplitScrollReel mobile audit | P1 | M | — |
| 4 | [P-031](#p-031) | AgencyIntro responsive | P1 | S | — |
| 4 | [P-032](#p-032) | GaleriaReel posters crossing divider | P1 | S | — |
| 4 | [P-033](#p-033) | GaleriaReel hover veil tint | P2 | XS | — |
| 4 | [P-034](#p-034) | z-index audit em todas as páginas | P1 | S | — |
| 4 | [P-035](#p-035) | Aplicar `.split-bg` consistente | P1 | M | — |
| 4 | [P-036](#p-036) | iOS Safari `.split-text` fallback | P1 | S | — |
| 4 | [P-037](#p-037) | Validar overflow horizontal em todas resoluções | P1 | S | — |
| 4 | [P-038](#p-038) | Validar hover/focus states | P1 | M | — |
| **5** | [P-040](#p-040) | Decidir /programa & implementar | P1 | M | — |
| 5 | [P-041](#p-041) | Decidir /caso/[slug] & implementar | P1 | S | — |
| 5 | [P-042](#p-042) | Decidir HeroSequence | P2 | S | — |
| 5 | [P-043](#p-043) | Audit reels não usados | P2 | M | — |
| 5 | [P-044](#p-044) | Audit effects não usados | P2 | S | — |
| 5 | [P-045](#p-045) | Audit primitives (Slate) | P3 | XS | — |
| 5 | [P-046](#p-046) | agency.png + producoes.png órfãos | P2 | S | — |
| 5 | [P-047](#p-047) | bts-*.jpg destino | P2 | XS | — |
| 5 | [P-048](#p-048) | nichos/*.jpg destino | P2 | S | — |
| 5 | [P-049](#p-049) | hero.mp4 + 25hh.mp4 destino | P2 | XS | — |
| **6** | [P-060](#p-060) | Manifesto text final | P0 | M | ✓ |
| 6 | [P-061](#p-061) | Aprovar taglines | P0 | S | ✓ |
| 6 | [P-062](#p-062) | Aprovar listas serviços | P0 | S | ✓ |
| 6 | [P-063](#p-063) | Recolher embed URLs portfolio | P0 | M | ✓ |
| 6 | [P-064](#p-064) | Imagens reais (posters + nichos) | P1 | L | — |
| 6 | [P-065](#p-065) | Tratamento B&W | P1 | M | — |
| 6 | [P-066](#p-066) | Áudio clearance | P0 | XS | ✓ |
| 6 | [P-067](#p-067) | Cliente: NIF + morada + telefone | P0 | XS | ✓ |
| 6 | [P-068](#p-068) | Cliente: handles redes sociais | P1 | XS | — |
| **7** | [P-070](#p-070) | iPhone Safari test | P0 | M | ✓ |
| 7 | [P-071](#p-071) | iPad test | P1 | S | — |
| 7 | [P-072](#p-072) | Android Chrome test | P0 | M | ✓ |
| 7 | [P-073](#p-073) | Desktop browser matrix | P0 | M | ✓ |
| 7 | [P-074](#p-074) | Touch gestures audit | P2 | S | — |
| 7 | [P-075](#p-075) | Forms mobile keyboard behaviour | P1 | S | — |
| 7 | [P-076](#p-076) | Reduced-motion review | P1 | S | — |
| 7 | [P-077](#p-077) | Scrollbar cross-browser | P2 | XS | — |
| **8** | [P-080](#p-080) | WCAG AA contrast | P1 | S | — |
| 8 | [P-081](#p-081) | Keyboard navigation | P1 | M | — |
| 8 | [P-082](#p-082) | Button vs div semantics | P1 | S | — |
| 8 | [P-083](#p-083) | Skip link | P1 | XS | — |
| 8 | [P-084](#p-084) | Focus visible em todos | P1 | S | — |
| 8 | [P-085](#p-085) | Tab order audit | P1 | S | — |
| 8 | [P-086](#p-086) | Alt texts | P1 | S | — |
| 8 | [P-087](#p-087) | ARIA labels audit | P1 | S | — |
| 8 | [P-088](#p-088) | Screen reader sweep | P1 | M | — |
| **9** | [P-090](#p-090) | 404 page custom | P0 | S | ✓ |
| 9 | [P-091](#p-091) | 500 / global-error.tsx | P0 | S | ✓ |
| 9 | [P-092](#p-092) | Error boundary local | P1 | S | — |
| 9 | [P-093](#p-093) | Loading states (loading.tsx) | P1 | M | — |
| 9 | [P-094](#p-094) | Suspense boundaries | P2 | M | — |
| **10** | [P-100](#p-100) | Remover howler | P2 | XS | — |
| 10 | [P-101](#p-101) | Apagar componentes não usados | P2 | M | — |
| 10 | [P-102](#p-102) | Limpar imports não usados | P2 | S | — |
| 10 | [P-103](#p-103) | Auditar deps not used | P2 | S | — |
| **11** | [P-110](#p-110) | sitemap.ts | P1 | XS | — |
| 11 | [P-111](#p-111) | robots.ts | P1 | XS | — |
| 11 | [P-112](#p-112) | OG image generator | P1 | S | — |
| 11 | [P-113](#p-113) | Per-page metadata | P1 | M | — |
| 11 | [P-114](#p-114) | JSON-LD structured data | P1 | S | — |
| 11 | [P-115](#p-115) | Canonical URLs | P1 | XS | — |
| 11 | [P-116](#p-116) | theme-color meta | P2 | XS | — |
| 11 | [P-117](#p-117) | favicon + manifest.json | P1 | S | — |
| 11 | [P-118](#p-118) | apple-touch-icon | P1 | XS | — |
| **12** | [P-120](#p-120) | Decisão i18n EN | P2 | XS | — |
| 12 | [P-121](#p-121) | next-intl setup | P2 | M | — |
| 12 | [P-122](#p-122) | Translation files | P2 | M | — |
| 12 | [P-123](#p-123) | LangToggle wiring | P2 | S | — |
| 12 | [P-124](#p-124) | Locale routing | P2 | M | — |
| 12 | [P-125](#p-125) | hreflang | P2 | S | — |
| **13** | [P-130](#p-130) | Image optimization | P1 | M | — |
| 13 | [P-131](#p-131) | priority audit | P1 | S | — |
| 13 | [P-132](#p-132) | Audio format optimization | P2 | S | — |
| 13 | [P-133](#p-133) | Lighthouse 90+ | P1 | M | — |
| 13 | [P-134](#p-134) | LCP optimization | P1 | M | — |
| 13 | [P-135](#p-135) | CLS audit | P1 | S | — |
| 13 | [P-136](#p-136) | Bundle size analysis | P2 | S | — |
| 13 | [P-137](#p-137) | Code splitting review | P2 | S | — |
| 13 | [P-138](#p-138) | Font loading optimization | P2 | XS | — |
| **14** | [P-140](#p-140) | Playwright smoke tests | P1 | M | — |
| 14 | [P-141](#p-141) | E2E flows críticos | P1 | M | — |
| 14 | [P-142](#p-142) | Visual regression (opcional) | P3 | M | — |
| 14 | [P-143](#p-143) | A11y tests automated | P2 | S | — |
| 14 | [P-144](#p-144) | Lighthouse CI | P2 | S | — |
| **15** | [P-150](#p-150) | Footer global | P1 | S | — |
| 15 | [P-151](#p-151) | CMS decision (Sanity vs JSON) | P2 | XS | — |
| 15 | [P-152](#p-152) | Newsletter signup | P2 | M | — |
| 15 | [P-153](#p-153) | FAQ section | P2 | S | — |
| 15 | [P-154](#p-154) | Process / "Como trabalhamos" | P2 | M | — |
| 15 | [P-155](#p-155) | Client logos wall | P2 | S | — |
| 15 | [P-156](#p-156) | Press kit page | P3 | M | — |
| 15 | [P-157](#p-157) | Search functionality | P3 | L | — |
| **16** | [P-160](#p-160) | /privacidade page | P0 | M | ✓ |
| 16 | [P-161](#p-161) | /termos page | P2 | M | — |
| 16 | [P-162](#p-162) | Aviso legal (NIF/morada) | P0 | XS | ✓ |
| 16 | [P-163](#p-163) | RGPD checkbox em forms | P0 | XS | ✓ |
| 16 | [P-164](#p-164) | Cookie consent (se GA) | P1 | M | — |
| 16 | [P-165](#p-165) | Data retention policy doc | P2 | S | — |
| **17** | [P-170](#p-170) | Plausible setup | P1 | S | — |
| 17 | [P-171](#p-171) | Sentry monitoring | P1 | S | — |
| 17 | [P-172](#p-172) | Web vitals tracking | P2 | S | — |
| 17 | [P-173](#p-173) | Custom events tracking | P2 | S | — |
| 17 | [P-174](#p-174) | Uptime monitoring | P2 | S | — |
| **18** | [P-180](#p-180) | Production build validation | P0 | S | — |
| 18 | [P-181](#p-181) | Env vars audit + setup | P0 | S | — |
| 18 | [P-182](#p-182) | Registar domínio | P0 | XS | — |
| 18 | [P-183](#p-183) | Vercel project + repo | P0 | S | — |
| 18 | [P-184](#p-184) | DNS configuration | P0 | S | — |
| 18 | [P-185](#p-185) | SSL + force HTTPS | P0 | XS | — |
| 18 | [P-186](#p-186) | Email infrastructure | P0 | M | — |
| 18 | [P-187](#p-187) | Security headers | P1 | M | — |
| 18 | [P-188](#p-188) | Submit ao Google Search Console | P1 | XS | — |
| 18 | [P-189](#p-189) | Validar OG cards live | P1 | XS | — |
| 18 | [P-190](#p-190) | Production smoke tests | P0 | S | — |
| 18 | [P-191](#p-191) | Rollback plan | P1 | S | — |

**Total: ~110 prompts.** P0 (blockers para site pronto): ~25. P0+P1: ~70.

---

## Os Prompts

### Phase 1 — Audit & Discovery

> **Primeiro passo de tudo.** Antes de fixar qualquer coisa, mapear exactamente o estado actual.

---

#### P-001
**Run full route audit**

- **P:** P0 · **E:** S · **Fase:** 1
- **Objectivo:** confirmar quais rotas renderizam OK, quais dão 404/500, quais têm conteúdo, quais são vazias.
- **Instruções:**
  1. Iniciar dev server: `pnpm dev`.
  2. Para cada rota da [tabela de rotas](#rotas-e-sitemap), abrir em browser e validar:
     - HTTP status (DevTools Network)
     - Renderiza sem erros JS (Console)
     - Conteúdo visível (não esqueleto vazio)
     - Links na página apontam para rotas válidas
  3. Para `/servicos/[nicho]`, testar os 6 slugs: `restaurantes`, `desporto`, `real-estate`, `travel`, `corporate`, `saude`.
  4. Para `/servicos/[nicho]/portfolio`, idem 6 slugs.
  5. Para `/caso/[slug]`, testar com slug fictício (e.g., `/caso/teste`) — confirmar comportamento.
  6. Para `/programa/[vertical]`, testar com slugs antigos (`hospitalidade`, `musica`, etc) — confirmar se ainda renderizam algo.
  7. Compilar resultado em tabela:
     ```
     | Rota | HTTP | Renderiza? | Conteúdo? | Links OK? | Acção |
     ```
- **Files to touch:** nenhum (só audit).
- **Acceptance criteria:**
  - [ ] Tabela completa para cada rota da spec.
  - [ ] Issues identificadas → criar prompts específicos (P-040 a P-049 já cobrem alguns).

---

#### P-002
**Run full component audit**

- **P:** P0 · **E:** S · **Fase:** 1
- **Objectivo:** descobrir quais componentes estão a ser usados vs órfãos.
- **Instruções:**
  1. Em terminal:
     ```bash
     # Lista todos os componentes
     find components -name "*.tsx" | sort
     ```
  2. Para cada componente, verificar onde é importado:
     ```bash
     # Por exemplo, para HeroSequence:
     grep -rn "HeroSequence" app/ components/ lib/ 2>/dev/null | grep -v node_modules
     ```
  3. Componentes a auditar especificamente:
     - `HeroSequence`, `HeroReel`, `AccordionReel`, `VisaoReel`, `ProgrammeBlock`, `CaseReel`
     - `GradedVideo`, `MeshGradient`, `Viewfinder`
     - `Slate` (primitivo)
  4. Compilar tabela:
     ```
     | Componente | Importado em | Usado? | Acção |
     | HeroSequence | (nenhum) | ✗ | Manter (Phase 5 decide) |
     | AccordionReel | ? | ? | ? |
     ```
  5. Componentes não usados → marcar para Phase 10 (cleanup) ou Phase 5 (decisão).
- **Acceptance criteria:**
  - [ ] Tabela completa.
  - [ ] Cada componente tem destino claro.

---

#### P-003
**Audit `/public/media/` usage**

- **P:** P0 · **E:** XS · **Fase:** 1
- **Instruções:**
  1. Listar todos os media:
     ```bash
     find public/media -type f | sort
     ```
  2. Para cada ficheiro, grep references no código:
     ```bash
     # Exemplo
     grep -rn "hero.mp4" app/ components/ lib/ 2>/dev/null
     ```
  3. Compilar:
     ```
     | Ficheiro | Tamanho | Referenciado em | Acção |
     | hero.mp4 | XX MB | (nenhum) | Apagar OU usar |
     | bts-1.jpg | XX KB | ? | ? |
     ```
- **Acceptance criteria:**
  - [ ] Cada media tem destino claro.

---

#### P-004
**Lighthouse baseline**

- **P:** P0 · **E:** XS · **Fase:** 1
- **Objectivo:** ter scores antes de fazer optimizações, para medir progresso.
- **Instruções:**
  1. Chrome DevTools → Lighthouse → Generate report (Mobile + Desktop, todas as categorias).
  2. Guardar reports em `docs/lighthouse-baseline-{date}.html`.
  3. Documentar scores actuais:
     ```
     | Categoria | Desktop | Mobile |
     | Performance | XX | XX |
     | Accessibility | XX | XX |
     | Best Practices | XX | XX |
     | SEO | XX | XX |
     ```
- **Acceptance criteria:**
  - [ ] Baseline registado.

---

#### P-005
**Console error sweep**

- **P:** P0 · **E:** XS · **Fase:** 1
- **Instruções:**
  1. Abrir cada rota com DevTools Console aberto.
  2. Listar **todos** os erros / warnings.
  3. Filtrar Next.js dev warnings (acceptable) vs errors reais.
  4. Para cada erro real → criar prompt específico de fix.
- **Acceptance criteria:**
  - [ ] Lista de erros documentada.
  - [ ] Tickets / prompts criados para cada.

---

### Phase 2 — Routes & broken links

#### P-010
**Validar todos os `href` apontam para rotas existentes**

- **P:** P0 · **E:** S · **Fase:** 2
- **Instruções:**
  1. Grep todos os hrefs:
     ```bash
     grep -rnE 'href="[^"#]+' app/ components/ lib/ 2>/dev/null | grep -v node_modules | sort -u
     ```
  2. Para cada href interno (`/...`), confirmar que rota existe.
  3. Para hrefs externos (`https://...`), confirmar que abrem (smoke test manual).
  4. `mailto:` — confirmar endereço correcto.
  5. Documentar todos os hrefs partidos.
- **Files to touch:** componentes com hrefs partidos.
- **Acceptance criteria:**
  - [ ] Lista 100% de hrefs validada.
  - [ ] 0 hrefs partidos.

---

#### P-011
**Fix `/contacto` — criar página OU remover refs**

- **P:** P0 · **E:** S · **Fase:** 2
- **Contexto:** NavOverlay antigamente tinha `CONTACTO → /contacto`. Já foi mudado para `mailto:` mas pode haver outras refs.
- **Instruções:**
  1. Grep refs:
     ```bash
     grep -rn "/contacto" app/ components/ lib/ 2>/dev/null | grep -v node_modules
     ```
  2. **Decisão:** criar `/contacto` (recomendado, ver [P-023](#p-023)) OU substituir todas as refs por `mailto:`.
  3. Se criar página → ver [P-023](#p-023).
  4. Se remover refs → trocar por `mailto:atendimento@25horasagency.com` ou link à página `/orcamento`.
- **Acceptance criteria:**
  - [ ] Nenhum link aponta para rota inexistente.

---

#### P-012
**Fix `/programa/[vertical]` legacy**

- **P:** P0 · **E:** M · **Fase:** 2
- **Contexto:** Verticais antigos (hospitalidade, música, institucional, real estate, eventos, desporto) não coincidem com os 6 nichos novos (RESTAURANTES, DESPORTO, REAL STATE, TRAVEL, CORPORATE, SAÚDE & FAMÍLIA).
- **Opções:**
  - **A. Apagar** `/programa/[vertical]/page.tsx` e `/programa/page.tsx` se redundantes.
  - **B. Redirect** rotas antigas para `/servicos/[nicho]` equivalente via `next.config.js`:
    ```js
    async redirects() {
      return [
        { source: "/programa/hospitalidade", destination: "/servicos/restaurantes", permanent: true },
        { source: "/programa/musica", destination: "/manifesto", permanent: true },
        { source: "/programa/institucional", destination: "/servicos/corporate", permanent: true },
        // etc
      ];
    }
    ```
  - **C. Manter** `/programa` como conceito separado (e.g., "produções específicas / projectos passados") com lista curated em vez de catálogo.
- **Recomendação:** A se sem conteúdo único. B se há backlinks externos a preservar. C se cliente quer manter o conceito.
- **Acceptance criteria:**
  - [ ] Decisão executada.
  - [ ] Rotas antigas não dão 404 (redirect OU já não são referenciadas).

---

#### P-013
**Fix `/caso/[slug]` esqueleto vazio**

- **P:** P0 · **E:** S · **Fase:** 2
- **Opções:**
  - **A. Apagar** `app/caso/[slug]/page.tsx`. Reintroduzir quando houver case studies.
  - **B. Render `notFound()`** para qualquer slug enquanto não há dados.
  - **C. Mostrar placeholder** "Case studies em construção" com link para `/servicos`.
- **Recomendação:** A (cleaner).
- **Acceptance criteria:**
  - [ ] Visitar `/caso/qualquer-coisa` não mostra esqueleto vazio.

---

#### P-014
**Esconder `LangToggle` até i18n estar pronto**

- **P:** P0 · **E:** XS · **Fase:** 2
- **Instruções:**
  1. Em `components/chrome/ChromeTop.tsx`:
     ```tsx
     const SHOW_LANG_TOGGLE = false; // flip when i18n ships (P-121)
     // ...
     {SHOW_LANG_TOGGLE && <LangToggle />}
     ```
  2. Manter componente no projecto.
- **Acceptance criteria:**
  - [ ] Botão PT/EN escondido.

---

#### P-015
**Audit redirects para rotas antigas**

- **P:** P1 · **E:** S · **Fase:** 2
- **Instruções:**
  1. Listar rotas que foram apagadas ou renomeadas durante desenvolvimento (e.g., `/programa/...`, `/contacto`).
  2. Adicionar redirects em `next.config.js`:
     ```js
     module.exports = {
       async redirects() {
         return [
           { source: "/programa/:vertical", destination: "/servicos", permanent: true },
           { source: "/contacto", destination: "/orcamento", permanent: true },
         ];
       },
     };
     ```
- **Acceptance criteria:**
  - [ ] URLs antigos redirect cleanly.

---

### Phase 3 — Forms & functional fixes

#### P-020
**Form `/orcamento` submission via Resend**

- **P:** P0 · **E:** M · **Fase:** 3
- **Pré-requisitos:** API key Resend (criar conta em Phase 18 ou agora). Domínio verificado em Resend (Phase 18 — adiar até deploy ou setup com domínio temp).
- **Workaround sem domínio:** usar `from: "onboarding@resend.dev"` enquanto não há domínio próprio.
- **Instruções:**
  1. `pnpm add resend zod`
  2. `.env.local`: `RESEND_API_KEY=re_xxx`
  3. Criar `app/orcamento/actions.ts`:
     ```ts
     "use server";
     import { Resend } from "resend";
     import { z } from "zod";

     const schema = z.object({
       name: z.string().min(2, "Nome muito curto"),
       email: z.string().email("Email inválido"),
       phone: z.string().optional(),
       nicho: z.enum(["restaurantes","desporto","real-estate","travel","corporate","saude","outro"]),
       message: z.string().min(10, "Mensagem muito curta"),
       budget: z.string().optional(),
       deadline: z.string().optional(),
       consent: z.literal("on", { errorMap: () => ({ message: "Tens de aceitar" }) }),
       website: z.string().max(0), // honeypot
     });

     export type ActionResult =
       | { ok: true }
       | { ok: false; errors: Record<string, string[]> };

     export async function submitBudget(formData: FormData): Promise<ActionResult> {
       const raw = Object.fromEntries(formData);
       const parsed = schema.safeParse(raw);
       if (!parsed.success) {
         return { ok: false, errors: parsed.error.flatten().fieldErrors };
       }
       if (parsed.data.website) return { ok: false, errors: { _: ["spam"] } };

       const resend = new Resend(process.env.RESEND_API_KEY);
       await resend.emails.send({
         from: "no-reply@25horasagency.com", // ou onboarding@resend.dev temp
         to: "atendimento@25horasagency.com",
         replyTo: parsed.data.email,
         subject: `[Orçamento] ${parsed.data.name} · ${parsed.data.nicho}`,
         html: renderEmail(parsed.data),
       });
       return { ok: true };
     }
     ```
  4. Em `components/forms/BudgetForm.tsx`:
     - Adicionar honeypot field
     - Adicionar checkbox consent
     - `useFormState` + `useFormStatus` para estado loading
     - Mostrar erros por campo
     - Sucesso → toast OU redirect `/orcamento/obrigado`
  5. Criar `app/orcamento/obrigado/page.tsx` (página simples).
  6. Em mobile: validar com `inputMode`, `autoComplete`, `enterkeyhint`.
- **Files to touch:**
  - `app/orcamento/actions.ts` (new)
  - `components/forms/BudgetForm.tsx`
  - `app/orcamento/obrigado/page.tsx` (new)
- **Acceptance criteria:**
  - [ ] Submit envia email
  - [ ] Honeypot rejeita spam
  - [ ] Validation server + client
  - [ ] Loading visible
  - [ ] Erros por campo
  - [ ] Sucesso → confirmação
  - [ ] RGPD checkbox obrigatória
  - [ ] Mobile friendly

---

#### P-021
**Auditar estado actual de `/marcar`**

- **P:** P0 · **E:** S · **Fase:** 3
- **Instruções:**
  1. Abrir `app/marcar/page.tsx`. Ler conteúdo.
  2. Documentar:
     - Mostra form? Calendly? Texto plano?
     - Tem submission? Para onde?
     - Estado funcional?
  3. Decidir: substituir por Calendly ou form interno ou outra solução.
- **Acceptance criteria:**
  - [ ] Estado actual documentado.
  - [ ] Próximo passo definido.

---

#### P-022
**Implementar `/marcar` (Calendly recomendado)**

- **P:** P0 · **E:** S · **Fase:** 3
- **Pré-requisitos:** Conta Calendly + event type criado pelo cliente.
- **Instruções:**
  1. Conta Calendly free → event type "Marcar chamada 25 Horas" 30min.
  2. URL: `https://calendly.com/25horasagency/30min?primary_color=c7572b`.
  3. Em `app/marcar/page.tsx`:
     ```tsx
     import Script from "next/script";
     import { ChromeTop } from "@/components/chrome/ChromeTop";

     export default function MarcarPage() {
       return (
         <main className="relative min-h-screen split-bg split-divider">
           <ChromeTop />
           <div className="pt-32 px-6 max-w-3xl mx-auto">
             <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] split-text">
               Marcar chamada.
             </h1>
             <p className="mt-4 text-type-neutral max-w-xl">
               30 minutos. Trazes o briefing, levamos com proposta de abordagem.
             </p>
             <div
               className="calendly-inline-widget mt-12"
               data-url="https://calendly.com/25horasagency/30min?primary_color=c7572b"
               style={{ minWidth: "320px", height: "700px" }}
             />
             <Script
               src="https://assets.calendly.com/assets/external/widget.js"
               strategy="lazyOnload"
             />
           </div>
         </main>
       );
     }
     ```
  4. Confirmar Calendly envia confirmação para `atendimento@`.
- **Acceptance criteria:**
  - [ ] Widget aparece
  - [ ] User consegue marcar slot
  - [ ] Email confirmação recebido por ambos

---

#### P-023
**Criar `/contacto` page**

- **P:** P1 · **E:** S · **Fase:** 3
- **Instruções:**
  1. Criar `app/contacto/page.tsx`:
     ```tsx
     import { ChromeTop } from "@/components/chrome/ChromeTop";
     import Link from "next/link";

     export default function ContactoPage() {
       return (
         <main className="relative min-h-screen split-bg split-divider">
           <ChromeTop />
           <div className="pt-32 px-6 max-w-3xl mx-auto">
             <h1 className="font-serif text-[clamp(2rem,5vw,4rem)] split-text">
               Contacto.
             </h1>
             <div className="mt-12 space-y-6 font-body text-canvas-white">
               <p>
                 <strong>Email:</strong>{" "}
                 <a href="mailto:atendimento@25horasagency.com" className="text-accent-grade hover:underline">
                   atendimento@25horasagency.com
                 </a>
               </p>
               <p>
                 <strong>Telefone:</strong>{" "}
                 <a href="tel:+351963869519" className="text-accent-grade hover:underline">
                   +351 963 869 519
                 </a>
               </p>
               <p><strong>Lisboa, Portugal</strong></p>
               <div className="pt-8 flex gap-6">
                 <Link href="/orcamento" className="font-mono text-xs tracking-mono-wider text-accent-grade">
                   PEDIR ORÇAMENTO →
                 </Link>
                 <Link href="/marcar" className="font-mono text-xs tracking-mono-wider text-accent-grade">
                   MARCAR CHAMADA →
                 </Link>
               </div>
             </div>
           </div>
         </main>
       );
     }
     ```
  2. Actualizar refs em NavOverlay e GaleriaReel se aplicável.
- **Acceptance criteria:**
  - [ ] Página renderiza
  - [ ] Telefone clicável (mobile)
  - [ ] Links para orçamento e marcar

---

#### P-024
**Audio toggle edge cases**

- **P:** P1 · **E:** S · **Fase:** 3
- **Testar:**
  1. Click SOM → toca → recarregar página → dot indicator estado?
  2. Click SOM → toca → navegar para `/servicos` → continua a tocar?
  3. Click SOM → mute → mute → unmute (toggle várias vezes)?
  4. Open new tab → audio toca em ambos? Pause num pause no outro?
  5. iOS Safari: tudo OK?
- **Instruções:**
  1. Auditar lógica em `lib/audio-context.tsx`.
  2. Verificar `localStorage` persiste estado correctamente.
  3. Considerar `BroadcastChannel` ou `storage` event listener para sync entre tabs (opcional).
- **Acceptance criteria:**
  - [ ] Toggle funciona em todos os cenários sem bugs visuais.

---

#### P-025
**iframe auto-pause robustness**

- **P:** P2 · **E:** M · **Fase:** 3
- **Contexto:** Actual implementation usa `window.blur` + `document.activeElement`. Funciona inconsistentemente em alguns browsers.
- **Alternativas a explorar:**
  - **YouTube IFrame Player API:** subscribe `onStateChange`, pausar quando playing.
  - **Postmessage listener:** algumas plataformas postMessage quando user faz play.
  - **Intersection Observer:** pausar quando iframe entra em viewport (heurística simples).
- **Instruções:** investigar e implementar mais robusto. Documentar limitações por plataforma.
- **Acceptance criteria:**
  - [ ] YouTube: pausa quando user faz play.
  - [ ] IG/TikTok: best-effort (documenta limitações).

---

#### P-026
**Wordmark client-side nav teste**

- **P:** P2 · **E:** XS · **Fase:** 3
- **Instruções:**
  1. Click Wordmark (timecode) em qualquer página interna → vai para `/`.
  2. Confirmar:
     - Timecode continua running (não reset).
     - Audio continua a tocar (se on).
     - Sem flash branco / page reload.
- **Acceptance criteria:**
  - [ ] Navegação cliente-side preserva estado.

---

### Phase 4 — Visual / UI bugs

#### P-030
**SplitScrollReel mobile audit**

- **P:** P1 · **E:** M · **Fase:** 4
- **Instruções:**
  1. DevTools → Device emulation iPhone 14 (390×844).
  2. Validar:
     - 6 nichos visíveis stacked.
     - Logos + accordions sem cortar.
     - Tap (não hover) abre/fecha accordion.
     - Sem horizontal scroll.
  3. Se falhar: ajustar `.v-acc-flow` em `globals.css`.
  4. Testar tap em iPhone real se possível.
- **Acceptance criteria:**
  - [ ] Renderiza correctamente em iPhone SE / 14 / 14 Pro Max.
  - [ ] Sem overflow horizontal.

---

#### P-031
**AgencyIntro responsive em viewports pequenos**

- **P:** P1 · **E:** S · **Fase:** 4
- **Contexto:** Width `clamp(500px,65vw,1100px)` + `transform: translateX(-2px)`. Em viewport 375px: `65vw = 244px`, mas clamp min `500px` → overflows!
- **Instruções:**
  1. Em `components/intro/AgencyIntro.tsx`, mudar wrapper:
     ```tsx
     <div className="relative w-[clamp(280px,80vw,1100px)] aspect-[1835/1024]">
     ```
  2. Confirmar em iPhone SE (375), iPhone 14 (390), iPad (768), Desktop.
  3. Considerar tornar `translateX(-2px)` proporcional ao viewport (e.g., remover em mobile se a seam estiver alinhada).
- **Acceptance criteria:**
  - [ ] Wordmark cabe em viewport ≥ 280px.
  - [ ] Seam alinhada com hairline em todos os viewports.

---

#### P-032
**GaleriaReel posters: texto a cruzar divisor**

- **P:** P1 · **E:** S · **Fase:** 4
- **Estado actual:** `.split-text` aplicado em title + desc — funciona desktop. Mobile (iOS Safari) tem problema (ver P-036).
- **Instruções:**
  1. Confirmar em desktop que todos os 4 posters lêem bem (texto + CTA).
  2. Confirmar em mobile com fallback (P-036).
- **Acceptance criteria:**
  - [ ] Todos os 4 posters legíveis em todas as resoluções.

---

#### P-033
**GaleriaReel hover veil tint**

- **P:** P2 · **E:** XS · **Fase:** 4
- **Contexto:** Hover veil é `bg-canvas-black/0 → /10` em hover. Verificar se é o tinte certo (alguns querem warm tint = accent-grade/10).
- **Instruções:**
  1. Validar visual em hover desktop.
  2. Decidir cor com cliente.
  3. Ajustar se necessário.
- **Acceptance criteria:**
  - [ ] Hover state aprovado.

---

#### P-034
**z-index audit em todas as páginas**

- **P:** P1 · **E:** S · **Fase:** 4
- **Contexto:** Hairline (`.split-divider::after`) tem `z-index: 1`. Em `/`, AgencyIntro + GaleriaReel posters têm `z-10` (cobrem hairline). Outras páginas?
- **Instruções:**
  1. Para cada página, verificar se hairline aparece a cortar conteúdo de forma indesejada.
  2. Aplicar `z-10` ou similar a wrappers que devam tapar a hairline.
- **Acceptance criteria:**
  - [ ] Hairline visualmente correcto em todas as páginas.

---

#### P-035
**Aplicar `.split-bg` consistente em todas as páginas**

- **P:** P1 · **E:** M · **Fase:** 4
- **Contexto:** Só `app/page.tsx` tem `<main className="relative split-bg split-divider">`. Outras páginas têm `bg-canvas-black` plano.
- **Decisão:**
  - **A. Todas as páginas com split-bg.** Consistência visual (recomendado).
  - **B. Só home.** Diferenciação intencional entre "landing" e "interior".
- **Se A:**
  1. Auditar todas as `page.tsx` em `app/`.
  2. Aplicar `relative split-bg split-divider` ao `<main>` ou layout wrapper.
  3. Confirmar legibilidade do conteúdo em cada lado.
- **Acceptance criteria:**
  - [ ] Decisão executada consistentemente.

---

#### P-036
**iOS Safari `.split-text` fallback**

- **P:** P1 · **E:** S · **Fase:** 4
- **Contexto:** `background-attachment: fixed` (usado em `.split-text`) **não funciona em iOS Safari mobile**. Texto pode ficar transparente / cor errada.
- **Instruções:**
  1. Em `app/globals.css`, adicionar fallback:
     ```css
     /* iOS Safari mobile fallback */
     @media (max-width: 768px), (hover: none) {
       .split-text {
         background: none;
         color: var(--canvas-white);
         -webkit-text-fill-color: var(--canvas-white);
       }
     }
     ```
  2. Considerar JS detection para forçar fallback se preciso.
  3. Validar em iPhone real Safari.
- **Acceptance criteria:**
  - [ ] Texto visível e legível em iOS Safari.

---

#### P-037
**Validar overflow horizontal em todas as resoluções**

- **P:** P1 · **E:** S · **Fase:** 4
- **Instruções:**
  1. DevTools → Device toolbar. Testar 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560.
  2. Em cada, scroll horizontal não deve existir.
  3. Identificar componentes que causam overflow → fixar com `overflow-x-hidden` ou ajustar widths.
- **Acceptance criteria:**
  - [ ] Sem horizontal scroll em nenhuma resolução.

---

#### P-038
**Validar hover/focus states em todos os elementos interactivos**

- **P:** P1 · **E:** M · **Fase:** 4
- **Instruções:**
  1. Listar todos os botões, links, inputs.
  2. Para cada: hover state visível? Focus state visível (tab)?
  3. Estados não-visíveis → adicionar.
- **Acceptance criteria:**
  - [ ] Todo elemento interactivo tem hover + focus state.

---

### Phase 5 — Decisões pendentes & dead code

#### P-040
**Decidir e implementar destino de `/programa/[vertical]`**

- **P:** P1 · **E:** M · **Fase:** 5
- Ver [P-012](#p-012). Esta é a execução final após decisão.

---

#### P-041
**Decidir e implementar destino de `/caso/[slug]`**

- **P:** P1 · **E:** S · **Fase:** 5
- Ver [P-013](#p-013).

---

#### P-042
**Decidir HeroSequence**

- **P:** P2 · **E:** S · **Fase:** 5
- **Opções:**
  - Restaurar como secção entre AgencyIntro e SplitScrollReel.
  - Apagar componente.
  - Reutilizar como background loop no AgencyIntro.
- **Recomendação:** **Manter no projecto** sem usar. Decisão final pós-cliente.
- **Acceptance criteria:**
  - [ ] Decisão tomada.

---

#### P-043
**Audit reels não usados (AccordionReel, VisaoReel, HeroReel, ProgrammeBlock, CaseReel)**

- **P:** P2 · **E:** M · **Fase:** 5
- **Pré-requisito:** [P-002](#p-002) (component audit).
- **Para cada:**
  1. Confirmar onde é importado.
  2. Se não usado em produção → apagar OU mover para `_legacy/`.
  3. Se usado parcialmente → decidir refactor ou remoção.
- **Acceptance criteria:**
  - [ ] Cada componente tem estado claro.

---

#### P-044
**Audit effects não usados (MeshGradient, Viewfinder, GradedVideo)**

- **P:** P2 · **E:** S · **Fase:** 5
- Idem [P-043](#p-043) mas para `components/effects/`.

---

#### P-045
**Audit `Slate` primitive**

- **P:** P3 · **E:** XS · **Fase:** 5
- **Instruções:** confirmar se `<Slate>` é usado e se layout corresponde ao desenho original.

---

#### P-046
**Destino dos logos órfãos `agency.png` e `producoes.png`**

- **P:** P2 · **E:** S · **Fase:** 5
- **Recomendação:**
  - `agency.png` → favicon, OG image default ([P-117](#p-117)).
  - `producoes.png` → apagar OR usar como secondary brand em algum lado.
- **Instruções:**
  1. Confirmar decisão com cliente.
  2. Implementar.
- **Acceptance criteria:**
  - [ ] Cada logo tem destino claro.

---

#### P-047
**Destino `bts-*.jpg`**

- **P:** P2 · **E:** XS · **Fase:** 5
- **Opções:** usar no manifesto / about, gallery interna, OU apagar se não úteis.

---

#### P-048
**Destino `public/media/nichos/*.jpg`**

- **P:** P2 · **E:** S · **Fase:** 5
- **Opções:**
  - **A.** Usar como hero images em `/servicos/[nicho]/page.tsx`.
  - **B.** Usar como cover em `/servicos` em vez de logos (se cliente preferir).
  - **C.** Apagar.

---

#### P-049
**Destino `hero.mp4`, `25hh.mp4`, `hero-poster.jpg`**

- **P:** P2 · **E:** XS · **Fase:** 5
- **Opções:**
  - Re-incorporar como hero intro.
  - Background loop no AgencyIntro.
  - Apagar.

---

### Phase 6 — Conteúdo do cliente

> Todos os prompts desta fase requerem input do cliente. **Recomendação: enviar checklist único com prazo.**

#### P-060
**Manifesto text final**

- **P:** P0 · **E:** M · **Fase:** 6
- Ver detalhes anteriores.

---

#### P-061
**Aprovar taglines dos 6 nichos**

- **P:** P0 · **E:** S · **Fase:** 6

---

#### P-062
**Aprovar listas de serviços (vídeo / fotografia / design / gestão)**

- **P:** P0 · **E:** S · **Fase:** 6

---

#### P-063
**Recolher embed URLs portfolio**

- **P:** P0 · **E:** M · **Fase:** 6
- Mínimo 3-5 por nicho. Ver instruções em header de `lib/portfolio.ts`.

---

#### P-064
**Imagens reais (posters + nichos)**

- **P:** P1 · **E:** L · **Fase:** 6
- Specs em [Appendix B](#appendix-b--image--video--audio-specs).

---

#### P-065
**Tratamento B&W (estética cliente)**

- **P:** P1 · **E:** M · **Fase:** 6
- Confirmar com cliente: todas as fotos? só algumas?
- Implementar via CSS filter OU pré-processadas.

---

#### P-066
**Áudio clearance `vintecinco.mp3`**

- **P:** P0 · **E:** XS · **Fase:** 6
- Confirmar: original / royalty-free / licenciado.

---

#### P-067
**Cliente: NIF + morada + telefone (legal)**

- **P:** P0 · **E:** XS · **Fase:** 6
- Para aviso legal ([P-162](#p-162)).

---

#### P-068
**Cliente: handles redes sociais**

- **P:** P1 · **E:** XS · **Fase:** 6
- Para footer + structured data.

---

### Phase 7 — Mobile & responsive

#### P-070
**iPhone Safari test (iOS 17)**

- **P:** P0 · **E:** M · **Fase:** 7
- **Devices:** iPhone SE 2nd, iPhone 14, iPhone 14 Pro Max.
- **Flows:** home journey, nav, audio, form, portfolio.
- **Documentar bugs.**

---

#### P-071
**iPad test**

- **P:** P1 · **E:** S · **Fase:** 7
- **Device:** iPad Air, iPad Pro 12.9.

---

#### P-072
**Android Chrome test**

- **P:** P0 · **E:** M · **Fase:** 7
- **Device:** Pixel 5+, Samsung Galaxy S22.

---

#### P-073
**Desktop browser matrix**

- **P:** P0 · **E:** M · **Fase:** 7
- Chrome, Safari, Firefox, Edge em 1280, 1440, 1920, 2560.

---

#### P-074
**Touch gestures audit**

- **P:** P2 · **E:** S · **Fase:** 7

---

#### P-075
**Forms mobile keyboard behaviour**

- **P:** P1 · **E:** S · **Fase:** 7
- `inputMode`, `autoComplete`, `enterkeyhint` apropriados.

---

#### P-076
**Reduced-motion review**

- **P:** P1 · **E:** S · **Fase:** 7

---

#### P-077
**Scrollbar cross-browser**

- **P:** P2 · **E:** XS · **Fase:** 7

---

### Phase 8 — Accessibility

#### P-080
**WCAG AA contrast audit**

- **P:** P1 · **E:** S · **Fase:** 8
- Tool: axe DevTools ou Chrome Lighthouse A11y.

---

#### P-081
**Keyboard navigation**

- **P:** P1 · **E:** M · **Fase:** 8

---

#### P-082
**Button vs div semantics**

- **P:** P1 · **E:** S · **Fase:** 8
- Trocar `role="button"` por `<button>` nos accordion panels.

---

#### P-083
**Skip link**

- **P:** P1 · **E:** XS · **Fase:** 8

---

#### P-084
**Focus visible em todos os elementos**

- **P:** P1 · **E:** S · **Fase:** 8

---

#### P-085
**Tab order audit**

- **P:** P1 · **E:** S · **Fase:** 8

---

#### P-086
**Alt texts em todas as imagens**

- **P:** P1 · **E:** S · **Fase:** 8

---

#### P-087
**ARIA labels audit**

- **P:** P1 · **E:** S · **Fase:** 8

---

#### P-088
**Screen reader sweep (VoiceOver / NVDA)**

- **P:** P1 · **E:** M · **Fase:** 8

---

### Phase 9 — Error pages & loading states

#### P-090
**404 page custom**

- **P:** P0 · **E:** S · **Fase:** 9
- **Instruções:**
  ```tsx
  // app/not-found.tsx
  import Link from "next/link";
  import { ChromeTop } from "@/components/chrome/ChromeTop";

  export default function NotFound() {
    return (
      <main className="relative split-bg split-divider min-h-screen">
        <ChromeTop />
        <div className="pt-32 px-6 max-w-3xl mx-auto text-center">
          <div className="font-mono text-[10px] text-type-dim mb-4">ERROR · 404</div>
          <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] split-text">
            Frame perdido.
          </h1>
          <p className="mt-6 text-type-neutral">
            Esta página saiu do filme. Volta ao genérico.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex font-mono text-[11px] tracking-mono-wider text-accent-grade hover:underline"
          >
            ← VOLTAR À HOME
          </Link>
        </div>
      </main>
    );
  }
  ```
- **Acceptance criteria:**
  - [ ] `/não-existe` mostra página custom.

---

#### P-091
**500 / global-error.tsx**

- **P:** P0 · **E:** S · **Fase:** 9
- ```tsx
  // app/global-error.tsx
  "use client";

  export default function GlobalError({
    error, reset
  }: {
    error: Error & { digest?: string };
    reset: () => void
  }) {
    return (
      <html lang="pt">
        <body>
          <main className="min-h-screen bg-canvas-black text-canvas-white flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              <div className="font-mono text-[10px] text-accent-grade">ERROR · 500</div>
              <h1 className="font-serif text-3xl mt-4">Falha técnica.</h1>
              <p className="mt-4 text-type-neutral text-sm">
                Algo correu mal. Já fomos notificados.
              </p>
              <button
                onClick={reset}
                className="mt-6 font-mono text-[11px] text-accent-grade underline"
              >
                Tentar de novo
              </button>
            </div>
          </main>
        </body>
      </html>
    );
  }
  ```

---

#### P-092
**Error boundary local em rotas críticas**

- **P:** P1 · **E:** S · **Fase:** 9
- Criar `app/servicos/[nicho]/error.tsx`, `app/orcamento/error.tsx`, etc.

---

#### P-093
**Loading states (loading.tsx)**

- **P:** P1 · **E:** M · **Fase:** 9
- Criar `app/loading.tsx` (root). Estilo: timecode + frame counter.

---

#### P-094
**Suspense boundaries**

- **P:** P2 · **E:** M · **Fase:** 9

---

### Phase 10 — Component cleanup

#### P-100
**Remover `howler`**

- **P:** P2 · **E:** XS · **Fase:** 10
- `pnpm remove howler @types/howler`. Confirmar build pass.

---

#### P-101
**Apagar componentes confirmadamente não usados**

- **P:** P2 · **E:** M · **Fase:** 10
- Pré-requisito: [P-043](#p-043), [P-044](#p-044).

---

#### P-102
**Limpar imports não usados**

- **P:** P2 · **E:** S · **Fase:** 10
- Tool: ESLint rule `no-unused-vars` + `unused-imports`.

---

#### P-103
**Auditar deps não usadas**

- **P:** P2 · **E:** S · **Fase:** 10
- `npx depcheck`.

---

### Phase 11 — SEO & metadata

#### P-110
**`app/sitemap.ts`**

- **P:** P1 · **E:** XS · **Fase:** 11
- Snippet em manual anterior.

---

#### P-111
**`app/robots.ts`**

- **P:** P1 · **E:** XS · **Fase:** 11

---

#### P-112
**OG image generator (`@vercel/og`)**

- **P:** P1 · **E:** S · **Fase:** 11

---

#### P-113
**Per-page metadata overrides**

- **P:** P1 · **E:** M · **Fase:** 11
- Cada `page.tsx` deve ter `metadata` com title + description + og.

---

#### P-114
**JSON-LD structured data**

- **P:** P1 · **E:** S · **Fase:** 11
- Organization + LocalBusiness em `app/layout.tsx`. Service em `/servicos/[nicho]/page.tsx`.

---

#### P-115
**Canonical URLs**

- **P:** P1 · **E:** XS · **Fase:** 11
- `metadata.alternates.canonical` em cada page.

---

#### P-116
**theme-color meta**

- **P:** P2 · **E:** XS · **Fase:** 11
- `viewport.themeColor` em `app/layout.tsx`.

---

#### P-117
**Favicon + manifest.json**

- **P:** P1 · **E:** S · **Fase:** 11
- Gerar favicons em `realfavicongenerator.net`. Add `app/manifest.ts`.

---

#### P-118
**apple-touch-icon**

- **P:** P1 · **E:** XS · **Fase:** 11

---

### Phase 12 — i18n PT/EN

#### P-120
**Decisão i18n EN agora ou diferir?**

- **P:** P2 · **E:** XS · **Fase:** 12
- Recomendação: diferir pós-launch.

---

#### P-121 a P-125

**`next-intl` setup + translation files + LangToggle wiring + locale routing + hreflang.**

(Detalhes inline conforme decisão.)

---

### Phase 13 — Performance

#### P-130
**Image optimization**

- **P:** P1 · **E:** M · **Fase:** 13
- `agency-bw.png` 5505×3072 → AVIF/WebP, max 2200×1230.
- `bg-*.jpg`, `nichos/*.jpg` → mesmo tratamento.

---

#### P-131
**`priority` audit**

- **P:** P1 · **E:** S · **Fase:** 13
- Só above-the-fold deve ter `priority`.

---

#### P-132
**Audio format optimization**

- **P:** P2 · **E:** S · **Fase:** 13
- `vintecinco.mp3` 1.27MB → Opus / AAC ~30-50% menor.

---

#### P-133
**Lighthouse 90+ em todas as categorias**

- **P:** P1 · **E:** M · **Fase:** 13

---

#### P-134
**LCP optimization**

- **P:** P1 · **E:** M · **Fase:** 13
- Alvo < 2.5s mobile 3G.

---

#### P-135
**CLS audit**

- **P:** P1 · **E:** S · **Fase:** 13
- Reservar espaço para imagens (aspect-ratio).

---

#### P-136
**Bundle size analysis**

- **P:** P2 · **E:** S · **Fase:** 13
- `pnpm build` → analisar `.next/analyze`.

---

#### P-137
**Code splitting review**

- **P:** P2 · **E:** S · **Fase:** 13
- `dynamic()` imports para componentes não-críticos.

---

#### P-138
**Font loading optimization**

- **P:** P2 · **E:** XS · **Fase:** 13
- `display: swap` (já). Considerar `preload`.

---

### Phase 14 — Tests

#### P-140
**Playwright smoke tests**

- **P:** P1 · **E:** M · **Fase:** 14
- Snippet anterior.

---

#### P-141
**E2E flows críticos**

- **P:** P1 · **E:** M · **Fase:** 14
- Home journey, nav, form submit (mocked), portfolio.

---

#### P-142
**Visual regression (opcional)**

- **P:** P3 · **E:** M · **Fase:** 14
- Percy / Chromatic.

---

#### P-143
**A11y tests automated**

- **P:** P2 · **E:** S · **Fase:** 14
- `axe-playwright`.

---

#### P-144
**Lighthouse CI**

- **P:** P2 · **E:** S · **Fase:** 14
- GitHub Action `lighthouse-ci`.

---

### Phase 15 — Features em falta

#### P-150
**Footer global**

- **P:** P1 · **E:** S · **Fase:** 15
- 4 colunas: brand info, nav, legal, social.

---

#### P-151
**CMS decision (Sanity vs JSON)**

- **P:** P2 · **E:** XS · **Fase:** 15
- Recomendação: JSON estático até cliente pedir editor.

---

#### P-152
**Newsletter signup**

- **P:** P2 · **E:** M · **Fase:** 15
- MailerLite / Buttondown / ConvertKit.

---

#### P-153
**FAQ section**

- **P:** P2 · **E:** S · **Fase:** 15
- 5-10 questões + respostas em `/faq` ou no manifesto.

---

#### P-154
**Process / "Como trabalhamos" page**

- **P:** P2 · **E:** M · **Fase:** 15

---

#### P-155
**Client logos wall**

- **P:** P2 · **E:** S · **Fase:** 15
- "Trabalhamos com X" — grid de logos passados.

---

#### P-156
**Press kit page**

- **P:** P3 · **E:** M · **Fase:** 15

---

#### P-157
**Search functionality**

- **P:** P3 · **E:** L · **Fase:** 15

---

### Phase 16 — Legal & privacy

#### P-160
**`/privacidade` page**

- **P:** P0 · **E:** M · **Fase:** 16
- Template + adaptação. **Obrigatório RGPD PT.**

---

#### P-161
**`/termos` page**

- **P:** P2 · **E:** M · **Fase:** 16

---

#### P-162
**Aviso legal (NIF / morada / contacto)**

- **P:** P0 · **E:** XS · **Fase:** 16
- No footer. Pré-requisito: [P-067](#p-067).

---

#### P-163
**RGPD checkbox em forms**

- **P:** P0 · **E:** XS · **Fase:** 16
- Já implementado em [P-020](#p-020).

---

#### P-164
**Cookie consent (apenas se GA)**

- **P:** P1 · **E:** M · **Fase:** 16
- Skip se ficar com Plausible.

---

#### P-165
**Data retention policy doc**

- **P:** P2 · **E:** S · **Fase:** 16
- Definir quanto tempo retém leads form.

---

### Phase 17 — Analytics & monitoring

#### P-170
**Plausible setup**

- **P:** P1 · **E:** S · **Fase:** 17
- Snippet em manual anterior.

---

#### P-171
**Sentry monitoring**

- **P:** P1 · **E:** S · **Fase:** 17
- `@sentry/nextjs`.

---

#### P-172
**Web vitals tracking**

- **P:** P2 · **E:** S · **Fase:** 17
- Reportar CLS, LCP, FID a Plausible custom events.

---

#### P-173
**Custom events tracking**

- **P:** P2 · **E:** S · **Fase:** 17
- Click SOM, submit form, portfolio click.

---

#### P-174
**Uptime monitoring**

- **P:** P2 · **E:** S · **Fase:** 17
- UptimeRobot / BetterUptime — free tier.

---

### Phase 18 — Deploy & launch

> **ÚLTIMA FASE.** Só agora pensamos em domínio, Vercel, DNS.

#### P-180
**Production build validation**

- **P:** P0 · **E:** S · **Fase:** 18
- ```bash
  pnpm typecheck && pnpm lint && pnpm build && pnpm start
  ```
- Smoke test localhost antes de deploy.

---

#### P-181
**Env vars audit + setup**

- **P:** P0 · **E:** S · **Fase:** 18
- Listar todas: `RESEND_API_KEY`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `SENTRY_DSN`, etc.
- Documentar em `.env.example`.

---

#### P-182
**Registar domínio `25horasagency.com`**

- **P:** P0 · **E:** XS · **Fase:** 18
- Cloudflare Registrar (sem upsell), Porkbun, Namecheap.
- Considerar registar `.pt` em paralelo.

---

#### P-183
**Vercel project + repo conectado**

- **P:** P0 · **E:** S · **Fase:** 18
- Conta Vercel → Import repo → auto-detect Next.js → deploy.

---

#### P-184
**DNS configuration**

- **P:** P0 · **E:** S · **Fase:** 18
- Records A / CNAME / TXT (SPF + DKIM Resend).

---

#### P-185
**SSL + force HTTPS**

- **P:** P0 · **E:** XS · **Fase:** 18
- Auto via Vercel + Let's Encrypt.

---

#### P-186
**Email infrastructure**

- **P:** P0 · **E:** M · **Fase:** 18
- Google Workspace / Microsoft 365 / Fastmail / Zoho.
- MX records.

---

#### P-187
**Security headers (CSP, HSTS)**

- **P:** P1 · **E:** M · **Fase:** 18
- `next.config.js` `headers()` ou middleware.

---

#### P-188
**Submit ao Google Search Console**

- **P:** P1 · **E:** XS · **Fase:** 18
- + Bing Webmaster Tools.

---

#### P-189
**Validar OG cards em produção**

- **P:** P1 · **E:** XS · **Fase:** 18
- Facebook Sharing Debugger, Twitter Card Validator, LinkedIn Post Inspector.

---

#### P-190
**Production smoke tests**

- **P:** P0 · **E:** S · **Fase:** 18
- Lista completa de fluxos. Validar HTTPS, audio, forms, mobile.

---

#### P-191
**Rollback plan documentado**

- **P:** P1 · **E:** S · **Fase:** 18
- Vercel: "Promote previous deployment".
- DNS rollback se preciso.

---

## Appendix A — Style guide & brand voice

### Voice / Tone

- **Cinematic** sem ser pretensioso. Tom de produtor/realizador a falar com par.
- **Português europeu**, não brasileiro.
- **Frases curtas**. Pontuação dramática (em-dashes, pontos finais).
- **Sem jargão corporativo:** evitar "soluções inovadoras", "parceiros estratégicos".
- **Verbos no presente.** "Filmamos", não "iremos filmar".
- **Métricas concretas.**

### Anchor phrases

- "Não fazemos vídeos. Fazemos filmes para marcas."
- "25 frames por segundo. 25 horas por dia."
- "Cinema para marcas."
- "Frame perdido" (404).

### Palavras a evitar

- "Inovador", "disruptivo", "transformação digital", "best-in-class", "holístico".

### Anglicismos

- Manter quando intraduzíveis: "drone", "behind-the-scenes", "reel", "highlight".
- Traduzir quando há equivalente PT: "marca" > "brand".

---

## Appendix B — Image / video / audio specs

### Stills

- Ratio 2.39:1. Master 3840×1606 min. Final 1920×803.
- Format: source TIFF/RAW. Web: AVIF + WebP fallback.
- B&W consistent. Size < 200KB.

### Logos

- PNG transparent alpha. 2000×2000 min.
- Black `#000000` OR cream `#F5F0E8` conforme uso.

### Vídeo

- MP4 H.264 + WebM VP9 fallback.
- 1080p (5 Mbps) ou 4K (12 Mbps).
- Audio AAC 128kbps OR muted.
- 8-15s loop hero.

### Áudio

- Re-encode `vintecinco.mp3` para Opus / AAC 96-128 kbps.
- Loop seamless. Peak -6 dB, average -16 LUFS.

---

## Appendix C — Component reference

### Hooks

| Hook | Retorna |
|---|---|
| `useAudio()` | `{ on, blocked, toggle }` |
| `useNav()` | `{ open, openNav, closeNav }` |
| `useLenis()` | Lenis instance |
| `useTimecode(baseFrames?)` | `HH:MM:SS:FF` |
| `useChromeTheme()` | `"dark"\|"light"` |
| `useFirstVisit(key)` | `{ first, dismiss }` |

### Utility classes

| Classe | Função |
|---|---|
| `.split-bg` | Page split background |
| `.split-divider` | Hairline central |
| `.split-text` | Text colour adapta à posição |
| `.v-acc-bounded` | Bounded accordion desktop |
| `.v-acc-flow` | Flow accordion mobile |
| `.v-panel` | Painel individual |
| `.slate-frame` | Frame-corner notches |
| `.wordmark-colon` | Raised colon |
| `.rec-dot`, `.som-hint`, `.hint-fade` | Animations |

---

## Appendix D — Gotchas & tribal knowledge

### Audio

- **AudioProvider deve estar no root layout.** Senão `<audio>` desmonta em nav.
- **iOS Safari não respeita `audio.volume`** — só system volume.
- **Muted autoplay permitido**, unmuted requer gesture.

### Counter-scroll

- `[...LOGOS].reverse()` no right column é **obrigatório** para alinhar logos.
- Section height = `(LOGOS.length + 1) × 70vh + 100vh`. Adicionar nicho → re-deploy.

### Split-bg

- `.split-divider::after` tem `z-index: 1`. Cobrir → `z-10`+.
- Hairline pode estar 0.5px desalinhada — `translateX(-0.5px)` aplicado.

### Next.js App Router

- **NICHOS removidos → URLs órfãs.** Adicionar redirect.
- `generateStaticParams` faz pre-render no build.

### Forms

- **Honeypot é primeiro filtro spam.**
- **zod server-side** mandatório.

### Fonts

- **Fraunces optical sizing** — Safari < 17 pode falhar.

### iOS Safari mobile

- `background-attachment: fixed` NÃO funciona.
- Audio behaviour restrito (gesture required).

---

## Appendix E — Test matrix

### Devices

| Device | Viewport | OS | Browser | Priority |
|---|---|---|---|---|
| iPhone SE 2 | 375×667 | iOS 17 | Safari | P1 |
| iPhone 14 | 390×844 | iOS 17 | Safari | P0 |
| iPhone 14 Pro Max | 430×932 | iOS 17 | Safari | P1 |
| iPad Air | 820×1180 | iPadOS | Safari | P1 |
| Pixel 7 | 412×915 | Android 13 | Chrome | P0 |
| Galaxy S22 | 360×780 | Android 13 | Samsung Internet | P2 |
| MacBook Air | 1280×800 | macOS | Safari + Chrome | P0 |
| Desktop 1920 | 1920×1080 | Win/macOS | Chrome + Firefox + Edge | P0 |
| Desktop 2560 | 2560×1440 | macOS | Chrome | P1 |

### Flows críticos

1. Home → scroll completo → click portfolio → back.
2. Click hamburger → click nicho → verificar.
3. Click SOM → audio toca → navegar → audio continua.
4. `/orcamento` → preencher → submit (após [P-020](#p-020)).
5. Mobile gestures: swipe scroll fluído.

---

## Appendix F — Glossary

| Termo | Significado |
|---|---|
| **Slate** | "Claquete" — frame-corner notches |
| **Timecode** | HH:MM:SS:FF (broadcast) |
| **Counter-scroll** | Colunas movendo em direcções opostas |
| **Split BG** | Background dividido vertical |
| **Hairline** | 1px divider |
| **Anamorphic** | 2.39:1 |
| **FPS** | Frames per second (25) |
| **Reel** | Section de conteúdo |
| **Chrome** | Header + footer bars |
| **Lenis** | Smooth scroll lib |
| **GSAP** | GreenSock Animation Platform |
| **RSC** | React Server Components |
| **ISR** | Incremental Static Regeneration |
| **OG** | Open Graph |
| **CTA** | Call to action |
| **CMS** | Content Management System |
| **RGPD** | Regulamento Geral de Proteção de Dados (PT) |
| **WCAG** | Web Content Accessibility Guidelines |
| **LUFS** | Loudness Units relative to Full Scale |

---

## Closing — critical path

### Trabalho para considerar "site pronto" (~10-15 dias)

```
DAY 1     Phase 1 — Audit (P-001 a P-005)
DAY 2-3   Phase 2 + 3 — Routes + Forms (P-010 a P-026)
DAY 4-5   Phase 4 — Visual fixes (P-030 a P-038)
DAY 6     Phase 5 — Decisões + cleanup (P-040 a P-049)
DAY 7-8   Phase 6 — Conteúdo cliente (P-060 a P-068) [pode ser paralelo]
DAY 9-10  Phase 7 — Mobile (P-070 a P-077)
DAY 11    Phase 8 — A11y (P-080 a P-088)
DAY 12    Phase 9 — Error pages (P-090 a P-094)
DAY 12    Phase 10 — Cleanup (P-100 a P-103)
DAY 13    Phase 11 — SEO (P-110 a P-118)
          [Phase 12 i18n deferido]
DAY 14    Phase 13 — Performance (P-130 a P-138)
DAY 14    Phase 14 — Tests (P-140 a P-144)
          [Phase 15 features deferido para iteração]
DAY 15    Phase 16 — Legal (P-160 a P-165)
DAY 15    Phase 17 — Analytics (P-170 a P-174)
```

### Trabalho para ir ONLINE (~1-2 dias após pronto)

```
DAY 16    Phase 18 — Deploy (P-180 a P-191)
DAY 17    Post-launch monitoring + iteração
```

---

### Próxima acção concreta

[**P-001 — Run full route audit**](#p-001).

Começa por aí. Não compres domínio agora. O domínio é o último passo.

— Fim do STATE.md.
