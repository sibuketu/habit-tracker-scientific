import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ESLintを無効化（一時的）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScriptの型チェックを無効化（一時的）
  typescript: {
    ignoreBuildErrors: true,
  },
  // 静的エクスポート用設定
  output: 'export',
  distDir: 'dist', // distフォルダを使用
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
