import type { Metadata } from "next";
import { StudioView } from "./StudioView";

export const metadata: Metadata = {
  title: "Aluguer de Espaços e Estúdios",
  description:
    "Estúdios profissionais de fotografia, vídeo, podcast, música e ensaio vocal, e sala de formação — em Lisboa, com ou sem operador técnico. Preços sob consulta.",
  keywords: [
    "aluguer estúdio",
    "estúdio fotografia",
    "estúdio vídeo",
    "estúdio podcast",
    "estúdio música",
    "sala de formação",
    "Lisboa",
    "25 Horas",
  ],
  alternates: { canonical: "/servicos/studio" },
  openGraph: {
    title: "Aluguer de Espaços e Estúdios — 25 Horas Agency",
    description:
      "Espaços profissionais para fotografia, vídeo, podcast, música, ensaios, formações e workshops.",
    url: "/servicos/studio",
    type: "website",
    locale: "pt_PT",
    siteName: "25 Horas Agency",
  },
};

export default function StudioPage() {
  return <StudioView />;
}
