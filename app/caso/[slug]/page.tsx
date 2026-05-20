import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChromeTop } from "@/components/chrome/ChromeTop";
import { ChromeBottom } from "@/components/chrome/ChromeBottom";
import { CaseReel } from "@/components/reels/CaseReel";
import { CASES, findCase } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = findCase(slug);
  if (!c) return { title: "Caso — 25 Horas" };
  return {
    title: `${c.title} — 25 Horas`,
    description: `${c.client} · ${c.year}. ${c.tagline}`,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = findCase(slug);
  if (!c) return notFound();

  return (
    <main className="relative bg-canvas-black">
      <ChromeTop />
      <CaseReel caseEntry={c} />
      <ChromeBottom chapter={5} total={9} showCue={false} />
    </main>
  );
}
