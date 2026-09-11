import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/gallery/**" },
      { pathname: "/api/uploads/**" },
    ],
  },
};

export default nextConfig;
