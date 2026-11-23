import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundHero } from "@/components/sections/not-found-hero";
import { doodleLayout } from "@/content/doodles";
import { notFoundPage } from "@/content/not-found";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundHero {...notFoundPage} doodles={doodleLayout.notFound} />
    </SiteShell>
  );
}
