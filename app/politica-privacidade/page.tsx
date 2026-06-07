import type { Metadata } from "next";
import { PoliticaPrivacidadeView } from "./PoliticaPrivacidadeView";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a 25 Horas Agency trata os teus dados pessoais — RGPD, em português simples.",
  alternates: { canonical: "/politica-privacidade" },
};

export default function PoliticaPrivacidadePage() {
  return <PoliticaPrivacidadeView />;
}
