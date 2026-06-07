import type { Metadata } from "next";
import { SobreView } from "./SobreView";
import { fetchSiteContent } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Quem é a 25 Horas Agency — cinema para marcas em Lisboa. Vídeo, fotografia, design e gestão de redes sociais.",
  alternates: { canonical: "/sobre" },
};

export default async function SobrePage() {
  const siteContent = await fetchSiteContent();
  return <SobreView siteContent={siteContent} />;
}
