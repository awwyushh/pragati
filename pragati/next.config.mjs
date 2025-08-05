/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.newsdata.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'newsdata.io', // Some images might come directly from newsdata.io
        port: '',
        pathname: '/images/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
