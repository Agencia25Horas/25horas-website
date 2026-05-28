import type { Metadata } from "next";
import { ContactosView } from "./ContactosView";

export const metadata: Metadata = {
  title: "Contactos — 25 Horas",
  description: "Falar com a 25 Horas Agency.",
};

export default function ContactosPage() {
  return <ContactosView />;
}
