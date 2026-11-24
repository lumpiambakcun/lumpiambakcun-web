import type { Metadata } from "next";
import { Suspense } from "react";
import { AddOrderButton } from "@/components/admin/add-order-button";
import { OrdersContent } from "@/components/admin/orders-content";
import { OrdersSkeleton } from "@/components/admin/orders-skeleton";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Pesanan" };

export default function AdminOrdersPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader title="Pesanan" actions={<AddOrderButton />} />
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
