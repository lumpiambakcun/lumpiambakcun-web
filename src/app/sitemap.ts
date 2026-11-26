import type { MetadataRoute } from "next";
import { isHiddenPath } from "@/config/hidden-pages";
import { sitePages } from "@/config/site";
import { listPublishedArticles } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = sitePages
    .map((page) => page.path)
    .filter((path) => !isHiddenPath(path))
    .map((path) => ({ url: absoluteUrl(path) }));
  const articles = (await listPublishedArticles()).map(({ slug, updated_at }) => ({
    url: absoluteUrl(`/artikel/${slug}`),
    lastModified: updated_at,
  }));
  return [...pages, ...articles];
}
