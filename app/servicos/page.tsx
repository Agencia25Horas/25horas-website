import type { Metadata } from "next";
import { ServicosView } from "./ServicosView";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Oito sectores, um vocabulário cinematográfico — vídeo, fotografia e gestão de redes sociais para a tua marca, em Lisboa.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return <ServicosView />;
}
