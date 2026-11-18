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
  async headers() {
    // Asosiy xavfsizlik sarlavhalari (Vercel'da ham, boshqa hostingda ham ishlaydi)
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
