import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "25 Horas Agency — Cinema para marcas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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
        {/* TOP — wordmark + accent bar */}
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
              background: "#E85D3A",
            }}
          />
        </div>

        {/* MIDDLE — claim */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Cinema
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            para marcas.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            25 horas por dia. Lisboa, Portugal.
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
          <div style={{ display: "flex" }}>Agência audiovisual</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
