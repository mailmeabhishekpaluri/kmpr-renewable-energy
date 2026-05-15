import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the embedded Sanity Studio
  transpilePackages: ["sanity", "styled-components"],

  // Keep @react-pdf/renderer on the Node.js runtime — it cannot be bundled by Turbopack
  serverExternalPackages: ["@react-pdf/renderer"],

  // Silence the "no turbopack config" warning that fires when only webpack config exists
  turbopack: {},
};

export default nextConfig;
