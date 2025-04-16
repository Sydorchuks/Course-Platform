import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match API routes starting with `/api/`
        destination: 'http://localhost:5000/api/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
