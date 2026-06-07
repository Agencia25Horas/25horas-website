/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["gsap", "howler"],
  },
  images: {
    // Tamanhos de qualidade que o pipeline pode emitir. Em Next 16 isto passa
    // a ser obrigatório (warning ruidoso hoje). 75 é o default; 95 é usado
    // pelo logo agency e pelo logo do header (alta resolução crítica).
    qualities: [50, 75, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],

  },
};

export default nextConfig;
