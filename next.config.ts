import type { NextConfig } from "next";
import { hiddenPages } from "./src/config/hidden-pages";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
  },
  async redirects() {
    return hiddenPages.map((page) => ({ source: `${page}/:path*`, destination: "/", permanent: false }));
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
