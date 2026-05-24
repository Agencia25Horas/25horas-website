import type { NichoSlug } from "./servicos";

/**
 * Portfolio data per niche. Phase 1 is a hard-coded list — to add a post,
 * paste the EMBED URL (not the public URL) into the right niche array below.
 *
 * Where to find each platform's embed URL:
 *   • YouTube  → "Share" → "Embed" → copy the src in the <iframe>.
 *                Format: https://www.youtube.com/embed/<VIDEO_ID>
 *   • Instagram → on the post page, append "/embed" to the URL.
 *                Format: https://www.instagram.com/p/<POST_ID>/embed
 *   • TikTok    → "Share" → "Embed video" → copy the src in the <iframe>.
 *                Format: https://www.tiktok.com/embed/v2/<VIDEO_ID>
 *   • Facebook  → use the FB Embedded Posts tool to generate a URL like:
 *                https://www.facebook.com/plugins/post.php?href=<ENCODED_URL>
 *
 * Phase 2 (later) will swap this for an admin UI + database.
 */
export type Platform = "instagram" | "facebook" | "youtube" | "tiktok";

export type PortfolioItem = {
  /** Direct embed URL (see comment above for format per platform). */
  embed: string;
  /** Platform — used for aspect ratio + iframe attributes per provider. */
  platform: Platform;
  /** Optional short caption shown under the embed. */
  caption?: string;
};

export const PORTFOLIO: Record<NichoSlug, PortfolioItem[]> = {
  restaurantes: [],
  desporto: [],
  "real-estate": [],
  travel: [],
  corporate: [],
  saude: [],
};

/** Default aspect ratio per platform — used to size the iframe wrapper. */
export const PLATFORM_ASPECT: Record<Platform, string> = {
  youtube: "16 / 9",
  instagram: "9 / 16",
  tiktok: "9 / 16",
  facebook: "4 / 5",
};
