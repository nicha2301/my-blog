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
    domains: [
      'images.unsplash.com',
      'png.pngtree.com',
      'cdn.sanity.io' // Thêm domain của Sanity
    ],
  },
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
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
  // Thêm CORS cho Sanity
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;