import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NICHOS, findNicho, type NichoSlug } from "@/lib/servicos";
import { NichePackView } from "@/components/sections/NichePackView";
import { fetchNichePack } from "@/lib/sanity/fetch";

type Params = { nicho: string };

export function generateStaticParams() {
  return NICHOS.map((n) => ({ nicho: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho } = await params;
  const n = findNicho(nicho);
  if (!n) return { title: "Serviços — 25 Horas" };

  const title = `${n.label} — 25 Horas Agency`;
  const description = `${n.tagline} Vídeo, fotografia e gestão de redes para ${n.label.toLowerCase()} em Portugal.`;

  return {
    title,
    description,
    keywords: [
      n.label.toLowerCase(),
      `vídeo ${n.label.toLowerCase()}`,
      `fotografia ${n.label.toLowerCase()}`,
      "gestão redes sociais",
      "agência audiovisual",
      "Lisboa",
      "25 Horas",
    ],
    alternates: { canonical: `/servicos/${n.slug}` },
    openGraph: {
      title,
      description,
      url: `/servicos/${n.slug}`,
      type: "website",
      locale: "pt_PT",
      siteName: "25 Horas Agency",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function NichoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { nicho } = await params;
  const n = findNicho(nicho as NichoSlug);
  if (!n) notFound();
  const pack = await fetchNichePack(n.slug);
  return <NichePackView nicho={n} pack={pack} />;
}
