# 25 Horas — Website

> *"Não fazemos vídeos. Fazemos filmes para marcas."*

Site para **Agência 25 Horas** ([@25horas.agency](https://instagram.com/25horas.agency)) — produtora audiovisual portuguesa em 6 nichos: restaurantes, desporto, real estate, travel, corporate, saúde & família.

Estilo: branco limpo + tipografia display (Anton) + corpo serif (Source Serif 4), accent `#E85D3A`, scroll mínimo, foco em foto + tipografia.

## Stack

- **Next.js 15** (App Router · React 19 · TypeScript)
- **Tailwind CSS 3** + tokens em `tailwind.config.ts` / `lib/tokens.ts`
- **Sanity** — CMS headless (conteúdo: nichos, packs, portfolio, textos do site)
- **GSAP + ScrollTrigger** (parallax subtil) · **Lenis** (smooth scroll)
- **Resend** (`/api/orcamento` → email) · **Plausible** (analytics opcional)
- Fontes: Anton (display) · Source Serif 4 (corpo) · JetBrains Mono

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Hero + 6 blocos de nicho + footer |
| `/sobre` | Manifesto + sub-logos |
| `/servicos` | Grelha dos 6 nichos |
| `/servicos/[nicho]` | Hero + serviços por categoria + CTA |
| `/servicos/[nicho]/portfolio` | Portfolio do nicho (vazio até o cliente entregar) |
| `/portfolio` | Índice global de portfolio |
| `/contactos` | Email · telefone · social · CTA |
| `/orcamento` | Form 4 perguntas → `/api/orcamento` → Resend |

## Setup

```bash
pnpm install
cp .env.example .env.local   # editar com keys (Resend, Plausible)
pnpm dev                     # http://localhost:3000
```

O site **lê o Sanity publicamente** e tem fallbacks hardcoded em `lib/sanity/client.ts`
(+ dados estáticos em `lib/servicos.ts`, `lib/packs.ts`, `lib/logos.ts`), por isso corre
mesmo sem env vars de Sanity.

## CMS — Sanity (conteúdo)

Studio autónomo (Sanity-hosted): **https://agencia25horas.sanity.studio**

Tipos de conteúdo (`sanity/schemaTypes/`):
- `niche` — os 6/7 nichos (label, objective, tagline, accentColor, logo) — bilingue `_pt`/`_en`
- `pack` — pacotes de serviços por nicho (features bilingues)
- `portfolioItem` — trabalhos de portfolio (embeds de vídeo) — **vazio por defeito**
- `siteContent` — singleton: hero, textos do "sobre", contactos

Republicar o Studio após mudar schemas:

```bash
pnpm exec sanity deploy
```

### Adicionar trabalhos ao portfolio

No Studio → `portfolioItem` → criar documento com o embed (YouTube / Instagram / TikTok /
Vimeo) e o `nicheSlug` respectivo. Os placeholders "Em breve" são substituídos automaticamente.

## i18n (PT/EN)

Bilingue via campos `_pt`/`_en` no Sanity + `lib/i18n.ts` + `lib/language-context.tsx`.
Toggle no header (persiste em localStorage; `<html lang>` sincroniza).

## Deploy

Ver **[`DEPLOY.md`](DEPLOY.md)** — checklist completo: Vercel + env vars + DNS (`25horasagency.com`) + Studio.
