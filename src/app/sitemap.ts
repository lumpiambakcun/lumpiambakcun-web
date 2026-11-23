import type { MetadataRoute } from "next";
import { sitePages } from "@/config/site";
import { menuProducts } from "@/content/menu";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...sitePages.map((page) => page.path), ...menuProducts.map((product) => product.card.href)].map((path) => ({
    url: absoluteUrl(path),
  }));
}
