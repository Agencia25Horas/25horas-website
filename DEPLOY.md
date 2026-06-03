# Deploy — 25 Horas

Guia de produção. Host: **Vercel**. CMS: **Sanity** (Studio autónomo, Sanity-hosted, em
`https://agencia25horas.sanity.studio` — `pnpm exec sanity deploy`).
Domínio final: **`25horasagency.com`** (já fixado em `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`).

---

## 0. Pré-requisitos (uma vez)

- Conta **Vercel** (fazer login com o GitHub `gamingbreak0uttv-lab`).
- Repo já no GitHub: `gamingbreak0uttv-lab/25horas-website`.
- Acesso ao **DNS** do domínio `25horasagency.com` (registrar / painel atual WordPress).
- Conta **Resend** (opcional, para o form de orçamento enviar emails reais).

---

## 1. Importar o projeto na Vercel

1. Vercel → **Add New… → Project** → importar `gamingbreak0uttv-lab/25horas-website`.
2. Framework: **Next.js** (auto-detetado). Root directory: raiz do repo.
3. Build & install são auto-detetados (Vercel deteta o `pnpm-lock.yaml`):
   - Install: `pnpm install`
   - Build: `next build`
   - Output: `.next` (default)
4. **NÃO fazer deploy ainda** — primeiro configurar as env vars (passo 2).

---

## 2. Variáveis de ambiente (Vercel → Settings → Environment Variables)

Adicionar para **Production** e **Preview**. Valores secretos: copiar de `.env.local` (NUNCA commitado).

> **Nota importante:** o site lê o Sanity de forma **pública** (CDN, `perspective: "published"`,
> sem token) e o `lib/sanity/client.ts` tem **fallbacks hardcoded** para projeto/dataset/versão.
> Por isso o site **funciona na Vercel mesmo sem nenhuma env var**. As de baixo são *recomendadas*
> (config explícita) mas não bloqueiam o deploy.

| Variável | Valor | Necessária? |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `epe7jy8x` | recomendada (tem fallback) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | recomendada (tem fallback) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` | recomendada (tem fallback) |
| `RESEND_API_KEY` | *(da conta Resend; vazio = só log na consola)* | opcional (secreto) |
| `RESEND_FROM_EMAIL` | `25 Horas <onboarding@resend.dev>` (ou domínio verificado) | opcional |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `25horasagency.com` | opcional (analytics) |

> `SANITY_API_WRITE_TOKEN` **NÃO** vai para a Vercel — só é usado pelo `pnpm seed`
> (script local, escreve no dataset). O site em produção nunca escreve, só lê.
>
> Se `RESEND_API_KEY` ficar vazio, `/api/orcamento` ainda aceita pedidos e faz log (não perde leads), mas não envia email.

---

## 3. Deploy inicial

- Clicar **Deploy**. Resultado: um URL `https://<projeto>.vercel.app`.
- Testar nesse URL: `/`, `/sobre`, `/servicos`, `/servicos/restaurantes`, `/portfolio`, `/contactos`, `/orcamento`.

---

## 4. Sanity Studio (autónomo, Sanity-hosted) — JÁ DEPLOYED

O Studio é hospedado pelo Sanity (build próprio, não passa pelo Next), em:

> **https://agencia25horas.sanity.studio**

O cliente faz login com a conta Sanity e edita os 6 nichos, packs, portfolio e textos do site.
O Sanity adiciona automaticamente `*.sanity.studio` às CORS Origins, por isso **não é preciso
configurar CORS manualmente**. O site público só lê (server-side, dataset público), também sem CORS.

Para republicar o Studio após mudar schemas (`sanity/schemaTypes/*`):

```bash
pnpm exec sanity deploy
```

O hostname está fixado em `sanity.cli.ts` (`studioHost: "agencia25horas"`).

> **Dar acesso ao cliente:** [sanity.io/manage](https://sanity.io/manage) → projeto `25 Horas Agency`
> (`epe7jy8x`) → **Members → Invite** → email do cliente (role *Editor* ou *Administrator*).

---

## 5. Domínio `25horasagency.com`

1. Vercel → projeto → **Settings → Domains → Add** `25horasagency.com` (e `www.25horasagency.com`).
2. No DNS do registrar, aplicar os registos que a Vercel indicar:
   - Apex `25horasagency.com` → **A** `76.76.21.21` (ou ALIAS/ANAME `cname.vercel-dns.com` se suportado).
   - `www` → **CNAME** `cname.vercel-dns.com`.
3. SSL é emitido automaticamente pela Vercel (Let's Encrypt). Pode demorar até propagação DNS.
4. Remover o placeholder WordPress "coming soon" assim que o DNS apontar para a Vercel.
5. Voltar ao passo 4.1 e garantir que `https://25horasagency.com` está nas CORS Origins do Sanity.

---

## 6. Resend (envio de email do form de orçamento) — opcional

1. Resend → **Domains → Add Domain** `25horasagency.com` → adicionar os registos DKIM/SPF no DNS.
2. Após verificado, mudar `RESEND_FROM_EMAIL` para `Pedido <atendimento@25horasagency.com>`.
3. Redeploy. Testar o form em `/orcamento`.

---

## 7. Checklist pós-deploy

- [ ] Páginas públicas carregam no domínio final.
- [ ] `/studio` faz login e edita conteúdo (CORS ✅).
- [ ] `https://25horasagency.com/robots.txt` e `/sitemap.xml` resolvem.
- [ ] `/opengraph-image` e `/servicos/<nicho>/opengraph-image` geram imagem.
- [ ] Form `/orcamento` → email recebido (ou log na consola se Resend off).
- [ ] JSON-LD LocalBusiness presente no `<head>`/body (testar em search.google.com/test/rich-results).
- [ ] Editar um doc no Studio → confirmar que a página revalida (ISR `revalidate: 60`).
