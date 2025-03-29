/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/medi-lab/:path*',
        destination: 'http://localhost:3001/:path*'
      }
    ]
  }
}

export default nextConfig; 