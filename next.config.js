/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.api-sports.io', 'media-1.api-sports.io', 'media-2.api-sports.io', 'media-3.api-sports.io'],
  },
  env: {
    NEXT_PUBLIC_API_KEY: process.env.API_SPORTS_KEY,
    NEXT_PUBLIC_API_HOST: 'v3.football.api-sports.io',
  },
}

module.exports = nextConfig