import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckoutContent } from "@/components/sections/checkout-content";
import { PageShell } from "@/components/shared/page-shell";
import { doodleLayout } from "@/content/doodles";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

const crumbs = [
  { label: "Beranda", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Checkout", href: "/checkout" },
];

export default function CheckoutPage({ searchParams }: PageProps<"/checkout">) {
  return (
    <PageShell crumbs={crumbs} title="Checkout" doodles={doodleLayout.checkout}>
      <Suspense fallback={<div className="min-h-[640px]" />}>
        <CheckoutContent searchParams={searchParams} />
      </Suspense>
    </PageShell>
  );
}
