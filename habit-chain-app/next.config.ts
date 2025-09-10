import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ESLintを無効化（一時的）
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
