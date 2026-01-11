import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Add webpack config to handle Edge Runtime compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Define __dirname and __filename for Edge Runtime
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        path: false,
        fs: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);

