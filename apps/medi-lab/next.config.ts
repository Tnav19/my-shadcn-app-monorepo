import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  basePath: "/medi-lab",
  async rewrites() {
    return [
      // Handle all routes
      {
        source: '/:path*',
        destination: '/:path*',
      }
    ];
  },
};

export default nextConfig;
