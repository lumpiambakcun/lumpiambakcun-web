import type { Metadata } from "next";
import { Suspense } from "react";
import { OrdersContent } from "@/components/admin/orders-content";

export const metadata: Metadata = { title: "Pesanan" };

export default function AdminOrdersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <Suspense fallback={<div className="min-h-[420px]" />}>
      <OrdersContent searchParams={searchParams} />
    </Suspense>
  );
}
