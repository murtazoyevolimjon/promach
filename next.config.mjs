/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Next.js rasmlarni avtomatik AVIF/WebP formatiga o'giradi
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Asosiy til — o'zbekcha. "/" -> "/uz"
    return [{ source: "/", destination: "/uz", permanent: false }];
  },
};

export default nextConfig;
