import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, RESTAURANTES_CATEGORIES } from "@/lib/portfolio-photos";
import { CategoriaGalleryView } from "./CategoriaGalleryView";

export async function generateStaticParams() {
  return RESTAURANTES_CATEGORIES.map((cat) => ({ categoria: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) return {};
  return {
    title: `${cat.label} — Fotografia · Portfólio`,
    description: `Galeria de fotografia de ${cat.label} da 25 Horas Agency.`,
    alternates: { canonical: `/portfolio/fotografias/restaurantes/${categoria}` },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat) notFound();
  return <CategoriaGalleryView category={cat} />;
}
