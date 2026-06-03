import type { Metadata } from "next";
import { SobreView } from "./SobreView";
import { fetchSiteContent } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Sobre — 25 Horas",
  description: "25 Horas Agency. Cinema para marcas. Lisboa, Portugal.",
};

export default async function SobrePage() {
  const siteContent = await fetchSiteContent();
  return <SobreView siteContent={siteContent} />;
}
