/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  // output: 'export',
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://localhost:5111/:path*' // Proxy to Backend
      }
    ]
  }
}