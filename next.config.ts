import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "@prisma/client": "./src/generated/prisma",
      },
    },
  },
  images: {
    // Разрешаем локальные папки для Image компонента
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'whiskerstails.ru',
        pathname: '/pets/**',
      },
      {
        protocol: 'https',
        hostname: 'whiskerstails.ru',
        pathname: '/avatars/**',
      },
    ],
    qualities: [100],
  },
};

export default nextConfig;
