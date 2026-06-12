import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, RESTAURANTES_CATEGORIES } from "@/lib/portfolio-photos";
import { findNicho } from "@/lib/servicos";
import { CategoriaGalleryView } from "./CategoriaGalleryView";

type Params = { nicho: string; categoria: string };

// Só o nicho RESTAURANTES tem galerias de categoria (Sushi, Carnes, …).
export async function generateStaticParams() {
  return RESTAURANTES_CATEGORIES.map((cat) => ({
    nicho: "restaurantes",
    categoria: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { nicho, categoria } = await params;
  const cat = getCategoryBySlug(categoria);
  if (!cat || nicho !== "restaurantes") return {};
  return {
    title: `${cat.label} — Fotografia · Portfólio`,
    description: `Galeria de fotografia de ${cat.label} da 25 Horas Agency.`,
    alternates: { canonical: `/portfolio/${nicho}/fotografias/${categoria}` },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { nicho, categoria } = await params;
  // As categorias são exclusivas do nicho restaurantes.
  if (nicho !== "restaurantes" || !findNicho(nicho)) notFound();
  const cat = getCategoryBySlug(categoria);
  if (!cat) notFound();
  return <CategoriaGalleryView category={cat} nicheSlug={nicho} />;
}
