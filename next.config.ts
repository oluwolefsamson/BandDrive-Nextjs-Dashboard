import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["upload.wikimedia.org"],
  },
};

export default nextConfig;
