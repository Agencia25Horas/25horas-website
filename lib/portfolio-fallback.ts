/**
 * Fallback estático de portfólio — usado quando o Sanity ainda não tem itens
 * para um nicho (mesmo padrão de lib/packs.ts). Assim que existir conteúdo no
 * Sanity para esse nicho, ele tem prioridade e isto é ignorado.
 *
 * Para adicionar: junta entradas por slug de nicho (restaurantes, desporto,
 * real-estate, travel, corporate, saude, saude-bem-estar, educacao). `link`
 * pode ser YouTube/Shorts/Vimeo. (O ideal é geri-los no Studio — isto é a rede
 * de segurança / conteúdo de arranque.)
 */

import type { SanityPortfolioItem } from "./sanity/types";

export const PORTFOLIO_FALLBACK: Record<string, SanityPortfolioItem[]> = {
  restaurantes: [
    {
      _id: "fb-restaurantes-1",
      nicheSlug: "restaurantes",
      link: "https://www.youtube.com/shorts/o4kIVyRa4Fg",
      featured: true,
      order: 0,
    },
    {
      _id: "fb-restaurantes-2",
      nicheSlug: "restaurantes",
      // vídeo normal (horizontal) — só o ID é usado; a playlist (&list=) é ignorada
      link: "https://www.youtube.com/watch?v=84iBKOrEAfY",
      featured: true,
      order: 1,
    },
  ],
  corporate: [
    {
      _id: "fb-corporate-1",
      nicheSlug: "corporate",
      link: "https://www.youtube.com/shorts/FHkPl6cFOtU",
      featured: true,
      order: 0,
    },
  ],
};
