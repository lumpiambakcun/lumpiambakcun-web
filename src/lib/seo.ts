import type { Metadata } from "next";
import { siteConfig, sitePages } from "@/config/site";

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

type ShareImage = { url: string; alt: string };

const defaultShareImage: ShareImage = { url: "/opengraph-image", alt: `${siteConfig.name}: lumpia mini khas Semarang sejak 1998` };

export function shareMetadata(
  title: string,
  description: string,
  url: string,
  image: ShareImage | null = defaultShareImage,
): Pick<Metadata, "openGraph" | "twitter"> {
  const images = image && { images: [{ ...image, width: 1200, height: 630 }] };
  return {
    openGraph: { type: "website", siteName: siteConfig.name, locale: siteConfig.locale, title, description, url, ...images },
    twitter: { card: "summary_large_image", title, description, ...images },
  };
}

export function pageMetadata(path: (typeof sitePages)[number]["path"], absoluteTitle?: string): Metadata {
  const page = sitePages.find((item) => item.path === path)!;
  const title = absoluteTitle ?? `${page.title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : page.title,
    description: page.description,
    alternates: { canonical: path },
    ...shareMetadata(title, page.description, path),
  };
}
