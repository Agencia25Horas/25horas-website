import { ImageResponse } from "next/og";
import { findNicho } from "@/lib/servicos";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const alt = "25 Horas Agency";

/**
 * OG image dinâmica per nicho. Renderiza:
 *   • Sub-marca (nome do nicho) em grande, na cor accent do nicho
 *   • Tagline curta
 *   • Footer 25 HORAS + accent bar
 *
 * Cada partilha social (LinkedIn, Twitter, FB, WhatsApp) mostra um cartão
 * único e branded, em vez do OG genérico do site.
 */
export default async function NichoOG({
  params,
}: {
  params: Promise<{ nicho: string }>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho);

  const label = n?.label ?? "25 HORAS";
  const tagline = n?.tagline ?? "Cinema para marcas.";
  const accent = n?.accentColor ?? "#E85D3A";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 88px",
          background: "#0A0A0A",
          color: "#FFFFFF",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* TOP — wordmark + accent bar do nicho */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-1px",
            }}
          >
            25 HORAS
          </div>
          <div
            style={{
              display: "flex",
              width: 24,
              height: 4,
              background: accent,
            }}
          />
        </div>

        {/* MIDDLE — label do nicho em accent + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              textTransform: "uppercase",
              color: accent,
              maxWidth: "100%",
              flexWrap: "wrap",
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 1024,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* BOTTOM — meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>25horasagency.com</div>
          <div style={{ display: "flex" }}>
            {n?.code ?? "00"} / Agência audiovisual
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
