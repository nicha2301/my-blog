/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    // Add unoptimized option for static export compatibility
    unoptimized: true,
  },
  reactStrictMode: true,
  eslint: {
    // Don't fail build on ESLint warnings
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't fail build on TypeScript errors
    ignoreBuildErrors: true,
  },
  // Temporarily disable static export for development
  // ...(process.env.NODE_ENV === 'production' ? {
  //   output: 'export',
  //   distDir: 'out',
  // } : {}),
  
  // Keep experimental section but remove unsupported option
  experimental: {
    // Empty but can be used for future experimental features
  },
};

module.exports = nextConfig;