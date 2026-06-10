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

// Fotos de restaurantes (vertical = story 9:16, horizontal = 16:9)
const VERTICAL_PHOTOS = new Set(["01", "06", "08", "013", "014", "015", "017", "018", "022"]);

function restPhoto(num: string, order: number): SanityPortfolioItem {
  return {
    _id: `fb-rest-photo-${num}`,
    nicheSlug: "restaurantes",
    imageUrl: `/portfolio/restaurantes/${num}.jpeg`,
    mediaType: "foto",
    orientation: VERTICAL_PHOTOS.has(num) ? "vertical" : "horizontal",
    featured: true,
    order,
  };
}

const REST_PHOTO_NUMS = [
  "01","02","03","04","05","06","07","08","09",
  "010","011","012","013","014","015","016","017","018","019","020","021","022","023",
];

export const PORTFOLIO_PHOTOS_FALLBACK: Record<string, SanityPortfolioItem[]> = {
  restaurantes: REST_PHOTO_NUMS.map((n, i) => restPhoto(n, i)),
};

// Fotos de nicho (corporate, desporto…) guardadas em /public/portfolio/<niche>/NN.jpeg.
// `oris` é a orientação REAL de cada ficheiro por ordem (h=landscape, v=portrait) —
// segue o aspecto real, não o nome da pasta de origem (yt/short nem sempre bate certo).
function nichePhotos(
  niche: string,
  oris: string,
  startOrder: number,
): SanityPortfolioItem[] {
  return oris.split("").map((o, i): SanityPortfolioItem => {
    const n = String(i + 1).padStart(2, "0");
    return {
      _id: `fb-${niche}-photo-${n}`,
      nicheSlug: niche,
      imageUrl: `/portfolio/${niche}/${n}.jpeg`,
      mediaType: "foto",
      orientation: o === "h" ? "horizontal" : "vertical",
      featured: true,
      order: startOrder + i,
    };
  });
}

export const PORTFOLIO_FALLBACK: Record<string, SanityPortfolioItem[]> = {
  restaurantes: [
    {
      _id: "fb-restaurantes-1",
      nicheSlug: "restaurantes",
      link: "https://www.youtube.com/shorts/o4kIVyRa4Fg",
      mediaType: "video",
      orientation: "vertical",
      featured: true,
      order: 0,
    },
    {
      _id: "fb-restaurantes-2",
      nicheSlug: "restaurantes",
      link: "https://www.youtube.com/watch?v=84iBKOrEAfY",
      mediaType: "video",
      orientation: "vertical",
      featured: true,
      order: 1,
    },
  ],
  corporate: [
    {
      _id: "fb-corporate-1",
      nicheSlug: "corporate",
      link: "https://www.youtube.com/shorts/FHkPl6cFOtU",
      mediaType: "video",
      orientation: "vertical",
      featured: true,
      order: 0,
    },
    {
      _id: "fb-corporate-2",
      nicheSlug: "corporate",
      link: "https://www.youtube.com/watch?v=A1SW8wCwC3Q",
      mediaType: "video",
      orientation: "horizontal",
      featured: true,
      order: 1,
    },
    {
      _id: "fb-corporate-3",
      nicheSlug: "corporate",
      link: "https://www.youtube.com/watch?v=-RSB4zGZx5o",
      mediaType: "video",
      orientation: "horizontal",
      featured: true,
      order: 2,
    },
    {
      _id: "fb-corporate-4",
      nicheSlug: "corporate",
      link: "https://www.youtube.com/watch?v=UUEyTanV8uI",
      mediaType: "video",
      orientation: "horizontal",
      featured: true,
      order: 3,
    },
    // Fotos do corporate: ytsize (9 landscape) + shortsize (9 portrait)
    ...nichePhotos("corporate", "hhhhhhhhhvvvvvvvvv", 4),
  ],
  educacao: [
    {
      _id: "fb-educacao-1",
      nicheSlug: "educacao",
      link: "https://www.youtube.com/watch?v=R0Ixc8btmgg",
      mediaType: "video",
      orientation: "horizontal",
      featured: true,
      order: 0,
    },
  ],
  // Fotos de desporto (orientação real por ficheiro)
  desporto: nichePhotos("desporto", "vvvvvvhhh", 0),
};
