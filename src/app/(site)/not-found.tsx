import type { Metadata } from "next";
import { NotFoundHero } from "@/components/sections/not-found-hero";
import { doodleLayout } from "@/content/doodles";
import { notFoundPage } from "@/content/not-found";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: true },
};

export default function SiteNotFound() {
  return <NotFoundHero {...notFoundPage} doodles={doodleLayout.notFound} />;
}
