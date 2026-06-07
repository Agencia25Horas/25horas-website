import type { Metadata } from "next";
import { ContactosView } from "./ContactosView";
import { fetchSiteContent } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contactos",
  description:
    "Fala com a 25 Horas Agency — email, telefone e WhatsApp. Resposta em 24h, em PT ou EN.",
  alternates: { canonical: "/contactos" },
};

export default async function ContactosPage() {
  const siteContent = await fetchSiteContent();
  return <ContactosView siteContent={siteContent} />;
}
