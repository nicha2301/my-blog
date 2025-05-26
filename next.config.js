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
  // For static export (uncomment when needed)
  // output: 'export',
  // distDir: 'out',
  
  // Ignore errors related to useSearchParams
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig; 