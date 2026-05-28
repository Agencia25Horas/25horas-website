import type { Metadata } from "next";
import { OrcamentoView } from "./OrcamentoView";

export const metadata: Metadata = {
  title: "Pedir Orçamento — 25 Horas",
  description: "Quatro perguntas. Resposta em 24h, em PT ou EN.",
};

export default function OrcamentoPage() {
  return <OrcamentoView />;
}
