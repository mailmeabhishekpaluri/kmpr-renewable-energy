import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the embedded Sanity Studio
  transpilePackages: ["sanity", "styled-components"],
};

export default nextConfig;
