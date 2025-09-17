import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* PWA Configuration for offline support */
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [360, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  /* Output file tracing configuration to silence workspace warnings */
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  
  /* Performance optimizations for low-bandwidth */
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'lucide-react', 'framer-motion'],
  },
  
  /* Compression and optimization */
  compress: true,
  poweredByHeader: false,
  
  /* Headers for PWA and security */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
