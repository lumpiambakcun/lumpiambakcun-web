import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { default: `Panel Admin ${siteConfig.name}`, template: `%s | Panel Admin ${siteConfig.name}` },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div data-admin-root className="min-h-screen text-ink">{children}</div>;
}
