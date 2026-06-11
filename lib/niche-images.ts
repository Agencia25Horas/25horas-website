/**
 * Fotos estáticas de cada nicho (versões *op de melhor qualidade) usadas como
 * fundo/cartão por nicho. Partilhadas entre:
 *   • app/HomeView.tsx          (fallback depth quando o nicho não tem foto Sanity)
 *   • app/portfolio/PortfolioHubView.tsx (cartões do hub do portefólio)
 *   • app/portfolio/[nicho]     (hero da página do nicho)
 *
 * Chave = slug do nicho (lib/servicos.ts). O cliente pode sobrepor qualquer
 * uma carregando a imagem do nicho no Studio (ver fetchNichePhotos).
 */
export const STATIC_NICHE_PHOTOS: Record<string, string> = {
  restaurantes: "/media/nichos/restauranteop.jpeg",
  desporto: "/media/nichos/desportoop.jpg",
  "real-estate": "/media/nichos/realestateop.jpg",
  travel: "/media/nichos/travelop.png",
  corporate: "/media/nichos/corporateop.png",
  saude: "/media/nichos/familyop.png", // slug "saude" = nicho FAMÍLIA
  "saude-bem-estar": "/media/nichos/saudeop.png", // slug "saude-bem-estar" = nicho SAÚDE
  educacao: "/media/nichos/testeop.png",
};
