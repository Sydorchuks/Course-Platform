// next.config.js
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  async rewrites() {
    return [
      {
        source: '/external-api/:path*',  // 👈 change the prefix
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
