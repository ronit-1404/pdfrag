import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/upload/:path*`,
      },
      {
        source: "/chat",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/chat`,
      },
    ];
  },
};

export default nextConfig;
