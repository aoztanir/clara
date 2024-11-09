// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Allow CORS for HeyGen API
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type, x-api-key' },
          ],
        },
      ]
    }
  }
  
  module.exports = nextConfig