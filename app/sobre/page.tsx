import type { Metadata } from "next";
import { SobreView } from "./SobreView";

export const metadata: Metadata = {
  title: "Sobre — 25 Horas",
  description: "25 Horas Agency. Cinema para marcas. Lisboa, Portugal.",
};

export default function SobrePage() {
  return <SobreView />;
}
