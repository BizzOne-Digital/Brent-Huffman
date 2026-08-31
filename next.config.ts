import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/api/uploads/**" },
    ],
  },
};

export default nextConfig;
