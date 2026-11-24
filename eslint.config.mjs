import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/app/opengraph-image.tsx", "src/app/(site)/menu/[[]slug]/opengraph-image.tsx", "src/lib/order-nota.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  {
    files: ["src/components/ui/carousel.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "old-example/**",
    ".playwright-mcp/**",
  ]),
]);

export default eslintConfig;
