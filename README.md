# 25 Horas — Landing Page

> *"Não fazemos vídeos. Fazemos filmes para marcas."*

Landing site para **Agência 25 Horas** ([@25horas.agency](https://instagram.com/25horas.agency)) — produtora audiovisual portuguesa que trabalha em 6 nichos: restaurantes, desporto, real estate, travel, corporate, saúde & família.

Estilo: **Tomatino-faithful** — branco limpo, tipografia display (Anton) + body serif (Source Serif 4), accent vermelho/laranja `#E85D3A`, mecânicas de scroll mínimas, foco em foto + tipografia.

## Stack

- **Next.js 15** (App Router · React 19 · TypeScript)
- **Tailwind CSS 3** + tokens custom em `tailwind.config.ts`
- **GSAP + ScrollTrigger** (parallax subtil nos logos)
- **Lenis** (smooth scroll)
- **Resend** (envio de email via `/api/orcamento`)
- **Plausible** (analytics opcional, privacy-friendly)

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Hero (logo branco gigante) + 6 NichoBlock alternados + footer preto compacto |
| `/sobre` | Manifesto + 6 sub-logos clicáveis |
| `/servicos` | Grelha 3-col com os 6 nichos |
| `/servicos/[nicho]` | Hero foto + chips de serviços por categoria + CTA orçamento/portfolio |
| `/servicos/[nicho]/portfolio` | Scaffold de portfolio (vazio até cliente entregar) |
| `/portfolio` | Índice global de portfolio com secção por nicho |
| `/contactos` | Email · telefone · social · CTA orçamento |
| `/orcamento` | Form 4 perguntas → `/api/orcamento` → Resend |

## Setup

```bash
pnpm install
cp .env.example .env.local   # editar com keys do cliente
pnpm dev                     # http://localhost:3000
```

Ver [`.env.example`](.env.example) para todas as variáveis (Resend, Plausible).

## i18n (PT/EN)

Sistema próprio em `lib/i18n.ts` + `lib/language-context.tsx`. Toggle no header (canto direito). Persiste em localStorage. `<html lang>` sincroniza dinamicamente.

## Adicionar trabalhos ao portfolio

Editar `lib/portfolio.ts` — colar embed URLs (YouTube, Instagram, TikTok, Facebook) no nicho respectivo. Os scaffolds "Em breve" são substituídos automaticamente.

## Conteúdo do cliente

`lib/servicos.ts` é a fonte de verdade dos 6 nichos (label, tagline, listas de serviços vídeo/foto/design, accentColor). Para alterar copy, editar aqui.

`lib/logos.ts` mapeia cada nicho à sua sub-marca PNG (`/public/media/logos/*.png`).
