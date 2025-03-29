/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  // Removing standalone output to avoid symlink issues
};

export default nextConfig
