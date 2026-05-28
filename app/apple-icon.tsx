import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 88,
          letterSpacing: "-3px",
          position: "relative",
        }}
      >
        25
        <div
          style={{
            position: "absolute",
            bottom: 42,
            width: 32,
            height: 6,
            background: "#E85D3A",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
