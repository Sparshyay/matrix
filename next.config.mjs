// Load environment variables during build time
const loadEnv = () => {
  const env = {};
  // This ensures that the environment variables are available at build time
  if (process.env.NEXT_PUBLIC_CONVEX_URL) {
    env.NEXT_PUBLIC_CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
  }
  return env;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: loadEnv(),
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.convex.cloud',
      },
    ],
    // Disable image optimization in development for better quality
    ...(process.env.NODE_ENV === 'development' 
      ? {
          unoptimized: true
        } 
      : {
          // Production settings
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
        }),
  },
};

export default nextConfig;
