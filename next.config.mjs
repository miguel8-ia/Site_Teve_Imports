/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Imagens já são entregues otimizadas (WebP) em /public/assets.
    unoptimized: true,
  },
};

export default nextConfig;
