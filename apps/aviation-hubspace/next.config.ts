import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  basePath: "/aviation-hubspace",
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
