import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderStatusContent } from "@/components/sections/order-status-content";
import { PageShell } from "@/components/shared/page-shell";
import { doodleLayout } from "@/content/doodles";

export const metadata: Metadata = {
  title: "Status pesanan",
  robots: { index: false, follow: false },
};

const crumbs = [
  { label: "Beranda", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Status pesanan", href: "/pesanan" },
];

export default function OrderPage({ params }: PageProps<"/pesanan/[kode]">) {
  return (
    <PageShell crumbs={crumbs} title="Status pesanan" hideTitle doodles={doodleLayout.checkout}>
      <Suspense fallback={<div className="min-h-[420px]" />}>
        <OrderStatusContent params={params} />
      </Suspense>
    </PageShell>
  );
}
