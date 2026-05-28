import type { Metadata } from "next";
import { ServicosView } from "./ServicosView";

export const metadata: Metadata = {
  title: "Serviços — 25 Horas",
  description: "Os 6 sectores em que trabalhamos.",
};

export default function ServicosPage() {
  return <ServicosView />;
}
