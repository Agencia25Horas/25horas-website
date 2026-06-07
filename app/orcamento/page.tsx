import type { Metadata } from "next";
import { OrcamentoView } from "./OrcamentoView";

export const metadata: Metadata = {
  title: "Pedir Orçamento",
  description:
    "Quatro perguntas e um orçamento à medida para a tua marca. Resposta em 24h, em PT ou EN.",
  alternates: { canonical: "/orcamento" },
};

export default function OrcamentoPage() {
  return <OrcamentoView />;
}
