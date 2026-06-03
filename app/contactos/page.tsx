import type { Metadata } from "next";
import { ContactosView } from "./ContactosView";
import { fetchSiteContent } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Contactos — 25 Horas",
  description: "Falar com a 25 Horas Agency.",
};

export default async function ContactosPage() {
  const siteContent = await fetchSiteContent();
  return <ContactosView siteContent={siteContent} />;
}
