import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

export const runtime = "nodejs";

/**
 * Webhook do Sanity → revalidação no Next (ISR on-demand).
 * Quando o cliente publica/edita no Studio, o Sanity faz POST aqui com a
 * assinatura HMAC (SANITY_REVALIDATE_SECRET) e a página afectada é
 * revalidada em ~segundos, sem esperar o cache expirar.
 *
 * Configurar no Studio: Settings → API → Webhooks
 *   • URL: https://<dominio>/api/revalidate
 *   • Trigger on: create / update / delete · Dataset: production
 *   • Secret: o mesmo valor de SANITY_REVALIDATE_SECRET
 *   • Projection (p/ ter nicheSlug em packs/portfolioItem):
 *       {_type, slug, "nicheSlug": niche->slug}
 */
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: { current?: string } | string;
      nicheSlug?: string;
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      return NextResponse.json(
        { ok: false, error: "Invalid signature" },
        { status: 401 },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { ok: false, error: "No body" },
        { status: 400 },
      );
    }

    const slugValue =
      typeof body.slug === "string" ? body.slug : body.slug?.current;

    // Rotas a revalidar conforme o tipo do documento
    const paths = new Set<string>(["/", "/portfolio"]);

    if (body._type === "niche" && slugValue) {
      paths.add(`/servicos/${slugValue}`);
      paths.add(`/servicos/${slugValue}/portfolio`);
      paths.add(`/portfolio/${slugValue}`);
    }
    if (body._type === "pack" && body.nicheSlug) {
      paths.add(`/servicos/${body.nicheSlug}`);
    }
    if (body._type === "portfolioItem") {
      if (body.nicheSlug) {
        paths.add(`/servicos/${body.nicheSlug}`);
        paths.add(`/servicos/${body.nicheSlug}/portfolio`);
        paths.add(`/portfolio/${body.nicheSlug}`);
      }
    }
    if (body._type === "siteContent") {
      paths.add("/sobre");
      paths.add("/contactos");
    }

    for (const p of paths) revalidatePath(p);

    return NextResponse.json({
      ok: true,
      revalidated: Array.from(paths),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
