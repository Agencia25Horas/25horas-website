import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

// POR ENQUANTO: gmail do cliente (o domínio 25horasagency.com ainda não está
// live). Trocar para atendimento@25horasagency.com quando o cliente pedir.
const TO_EMAIL = "agencia25horas@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "25 Horas <onboarding@resend.dev>";

type Body = {
  projectType?: string;
  deliverable?: string;
  timeline?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  /** Honeypot — bots tendem a preencher. Se vier preenchido, descarta silenciosamente. */
  website?: string;
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function htmlBody(b: Body) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:8px 12px;color:#666;font-family:sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;width:160px">${label}</td><td style="padding:8px 12px;color:#111;font-family:sans-serif;font-size:14px">${value}</td></tr>`
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
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silenciosamente "sucesso" para enganar bots
  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || body.name.trim().length < 2) {
    return NextResponse.json({ ok: false, error: "Nome obrigatório" }, { status: 400 });
  }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
  }
  if (!body.projectType || !body.deliverable || !body.timeline) {
    return NextResponse.json(
      { ok: false, error: "Campos obrigatórios em falta" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Dev fallback: log e considera enviado. Útil enquanto o cliente
    // não configurou Resend ainda.
    console.warn(
      "[/api/orcamento] RESEND_API_KEY ausente — pedido NÃO enviado por email. Body:",
      body,
    );
    return NextResponse.json({ ok: true, devMode: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `Pedido de orçamento — ${body.projectType} · ${body.deliverable}`,
      html: htmlBody(body),
    });
    if (error) {
      console.error("[/api/orcamento] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Falha no envio. Tenta de novo ou usa o email directo." },
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
