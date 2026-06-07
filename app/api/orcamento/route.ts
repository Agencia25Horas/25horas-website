import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// POR ENQUANTO: gmail do cliente (o domínio 25horasagency.com ainda não está
// live). Trocar para atendimento@25horasagency.com quando o cliente pedir.
const TO_EMAIL = "agencia25horas@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "25 Horas <onboarding@resend.dev>";

/* ─── Anti-spam (sem captcha) ─────────────────────────────────────────── */
const MIN_FILL_MS = 3000; // submissões mais rápidas que isto = provável bot
const RATE_LIMIT = 5; // máx. submissões por IP
const RATE_WINDOW_MS = 60 * 60 * 1000; // por hora
// Map em memória — best-effort (por instância serverless; reseta em cold start).
const hits = new Map<string, { count: number; resetAt: number }>();

type Body = {
  projectType?: string;
  deliverable?: string;
  timeline?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  /** Honeypot — bots tendem a preencher. */
  website?: string;
  /** Timestamp (ms) do mount do form, para detetar submissões instantâneas. */
  _t?: number;
};

// Email regex robusta (formato tipo-RFC, sem ser exagerada).
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
// Telefone opcional: só dígitos, espaços e + ( ) -
const PHONE_RE = /^[\d\s()+-]{6,20}$/;

const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => HTML_ESCAPE[c]);
}
// Limpa header de email (evita injeção via newlines no subject).
function cleanHeader(s: string) {
  return s.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

function getIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRate(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || e.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }
  e.count += 1;
  if (e.count > RATE_LIMIT) {
    return { limited: true, retryAfter: Math.ceil((e.resetAt - now) / 1000) };
  }
  return { limited: false, retryAfter: 0 };
}

function htmlBody(b: Body) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;font-family:sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:160px">${escapeHtml(
          label,
        )}</td><td style="padding:8px 12px;color:#111;font-family:sans-serif;font-size:14px">${escapeHtml(
          value,
        )}</td></tr>`
      : "";
  return `<!doctype html>
<html><body style="margin:0;background:#fff;color:#111">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <h1 style="font-family:sans-serif;font-size:18px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 24px;color:#111">Novo pedido de orçamento</h1>
    <table style="border-collapse:collapse;width:100%;border-top:1px solid #eee">
      ${row("Nicho", b.projectType)}
      ${row("Entregável", b.deliverable)}
      ${row("Prazo", b.timeline)}
      ${row("Nome", b.name)}
      ${row("Email", b.email)}
      ${row("Telefone", b.phone)}
      ${row("Empresa", b.company)}
    </table>
    <p style="margin-top:24px;font-family:sans-serif;font-size:12px;color:#999">Enviado via formulário /orcamento — 25horasagency.com</p>
  </div>
</body></html>`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const ip = getIp(req);

  // 1) Rate limit — 5/IP/hora → 429 + Retry-After
  const rate = checkRate(ip);
  if (rate.limited) {
    console.warn(
      `[/api/orcamento] rate-limit accionado — IP ${ip} excedeu ${RATE_LIMIT}/h`,
    );
    return NextResponse.json(
      { ok: false, error: "Demasiados pedidos. Tenta daqui a um bocado." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }

  // 2) Honeypot — campo invisível preenchido = bot → 200 silencioso
  if (body.website && body.website.trim().length > 0) {
    console.warn(`[/api/orcamento] honeypot accionado — IP ${ip}`);
    return NextResponse.json({ ok: true });
  }

  // 3) Timestamp — preenchido demasiado depressa = bot → 200 silencioso
  if (typeof body._t === "number") {
    const elapsed = Date.now() - body._t;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      console.warn(
        `[/api/orcamento] timestamp accionado — submissão em ${elapsed}ms (<${MIN_FILL_MS}), IP ${ip}`,
      );
      return NextResponse.json({ ok: true });
    }
  }

  // 4) Validação server-side
  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { ok: false, error: "Nome inválido" },
      { status: 400 },
    );
  }
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email inválido" },
      { status: 400 },
    );
  }
  if (phone && !PHONE_RE.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Telefone inválido" },
      { status: 400 },
    );
  }
  if (!body.projectType || !body.deliverable || !body.timeline) {
    return NextResponse.json(
      { ok: false, error: "Campos obrigatórios em falta" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev fallback: log e considera enviado (enquanto o Resend não está configurado).
    console.warn(
      "[/api/orcamento] RESEND_API_KEY ausente — pedido NÃO enviado por email.",
    );
    return NextResponse.json({ ok: true, devMode: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: cleanHeader(
        `Pedido de orçamento — ${body.projectType} · ${body.deliverable}`,
      ),
      html: htmlBody(body),
    });
    if (error) {
      console.error("[/api/orcamento] Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          error: "Falha no envio. Tenta de novo ou usa o email directo.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[/api/orcamento] Unexpected error:", e);
    return NextResponse.json(
      { ok: false, error: "Erro inesperado." },
      { status: 500 },
    );
  }
}
