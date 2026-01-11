import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable __dirname and __filename for server-side builds
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Enable Node.js globals for server-side code
      config.node = {
        ...config.node,
        __dirname: true,
        __filename: true,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
