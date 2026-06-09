import type { Metadata } from "next";
import { FotografiasView } from "./FotografiasView";

export const metadata: Metadata = {
  title: "Fotografia — Portfólio",
  description: "Fotografia de marca da 25 Horas Agency por nicho.",
  alternates: { canonical: "/portfolio/fotografias" },
};

export default function FotografiasPage() {
  return <FotografiasView />;
}
