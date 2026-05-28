import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "epe7jy8x";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

/** True quando o site está configurado para ler do Sanity.
 *  Com fallbacks hardcoded acima, isto é sempre true. */
export const sanityEnabled = Boolean(projectId);

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // serve cached responses for read; mais rápido
  perspective: "published",
});

const builder = createImageUrlBuilder(sanityClient);

type ImageSource = Parameters<NonNullable<typeof builder>["image"]>[0];

/** URL para uma imagem do Sanity. Retorna null se nada configurado. */
export function urlForImage(source: ImageSource | undefined | null) {
  if (!source || !builder) return null;
  return builder.image(source);
}
