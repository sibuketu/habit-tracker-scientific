import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Netlify用の設定
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // ESLintを無効化（一時的）
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
