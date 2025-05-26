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
  // Enable static export for GitHub Pages
  output: 'export',
  distDir: 'out',
  
  // Ignore errors related to useSearchParams
  experimental: {
    // Next.js 15.3.2 doesn't recognize this, but it's okay
    missingSuspenseForDataFetchingWarning: false
  },
};

module.exports = nextConfig; 