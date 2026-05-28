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
  return {
    title: `${n.label.toLowerCase()} — 25 Horas`,
    description: n.tagline,
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
