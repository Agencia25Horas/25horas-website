import { redirect } from "next/navigation";

// Galeria movida para /portfolio/[nicho]/fotografias/[categoria] (nicho-primeiro).
export default async function OldCategoriaRedirect({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  redirect(`/portfolio/restaurantes/fotografias/${categoria}`);
}
