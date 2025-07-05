import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uwjszqyssojnwfikscsx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'noiseplug.pl',
      },
      {
        protocol: 'https',
        hostname: 'cdn.myshoptet.com',
      },
      {
        protocol: 'https',
        hostname: 'images.stockx.com',
      },
      {
        protocol: 'https',
        hostname: 'aplug.pl',
      },
    ],
  },
};

export default nextConfig;
