/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  basePath: process.env.NEXT_PUBLIC_STANDALONE === 'true' ? '' : '/aviation-hubspace',
}

module.exports = nextConfig 