import type { MetadataRoute } from "next";
import { isHiddenPath } from "@/config/hidden-pages";
import { sitePages } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages
    .map((page) => page.path)
    .filter((path) => !isHiddenPath(path))
    .map((path) => ({ url: absoluteUrl(path) }));
}
