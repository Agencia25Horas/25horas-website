"use client";

import Link from "next/link";
import { useState } from "react";
import type { PhotoCategory } from "@/lib/portfolio-photos";
import { useLang } from "@/lib/language-context";

// Zoom base (background-size height %) para capas que precisam de
// enquadramento diferente. 100 = comportamento padrão.
const COVER_ZOOM: Record<string, number> = {
  sushi: 140,
  hamburgers: 140,
};

export function AccordionSlider({
  categories,
  basePath,
}: {
  categories: PhotoCategory[];
  basePath: string;
}) {
  const { lang } = useLang();
  const [active, setActive] = useState<string | null>(null);

  const getLabel = (cat: PhotoCategory) =>
    lang === "en" ? cat.labelEn : lang === "es" ? cat.labelEs : cat.label;

  return (
    <div
      // Limpa a seleção SÓ ao sair do accordion inteiro — não a cada painel.
      // Senão, ao atravessar o gap de 8px entre painéis, o mouseleave do painel
      // colapsava tudo, o layout reflowava e o cursor caía no painel SEGUINTE.
      onMouseLeave={() => setActive(null)}
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        height: "70vh",
        minHeight: "400px",
        maxHeight: "600px",
      }}
    >
      {categories.map((cat, i) => {
        const isActive = active === cat.slug;
        const label = getLabel(cat);
        const zoom = COVER_ZOOM[cat.slug] ?? 100;

        return (
          <Link
            key={cat.slug}
            href={`${basePath}/${cat.slug}`}
            onMouseEnter={() => setActive(cat.slug)}
            aria-label={label}
            style={{
              flex: isActive ? 5 : 1,
              transition: "flex 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              display: "block",
              minWidth: 0,
            }}
          >
            {/* Background — zoom base por categoria via COVER_ZOOM */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${cat.cover})`,
                backgroundSize: `auto ${zoom}%`,
                backgroundPosition: "center",
              }}
            />

            {/* Overlay escuro */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.2) 40%, transparent 60%)",
              }}
            />

            {/* Título vertical — visível quando colapsado, some no hover */}
            <span
              style={{
                position: "absolute",
                bottom: "28px",
                left: "16px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "white",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                opacity: isActive ? 0 : 1,
                transition: "opacity 0.3s",
                zIndex: 2,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>

            {/* Conteúdo expandido — aparece no hover */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "28px 24px",
                zIndex: 2,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.4s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              <p
                style={{
                  color: "var(--accent-grade, #e85d3a)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: "8px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display"
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                  color: "white",
                  marginBottom: "6px",
                }}
              >
                {label}
              </h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>
                {cat.count}{" "}
                {lang === "en"
                  ? "photos"
                  : lang === "es"
                    ? "fotos"
                    : "fotografias"}
              </p>
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {lang === "en"
                  ? "View gallery →"
                  : lang === "es"
                    ? "Ver galería →"
                    : "Ver galeria →"}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
