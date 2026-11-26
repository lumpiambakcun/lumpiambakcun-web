import type { NextConfig } from "next";
import { hiddenPages } from "./src/config/hidden-pages";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : null;

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    agentUpgrade: "security",
    serverActions: { bodySizeLimit: "3mb" },
  },
  images: {
    remotePatterns: supabaseHost
      ? ["products", "articles"].map((bucket) => ({
          protocol: "https" as const,
          hostname: supabaseHost,
          pathname: `/storage/v1/object/public/${bucket}/**`,
        }))
      : [],
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
