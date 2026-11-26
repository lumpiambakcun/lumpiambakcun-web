import { connection } from "next/server";
import { OrdersLiveFilters } from "@/components/admin/orders-live-filters";
import { OrdersPagination } from "@/components/admin/orders-pagination";
import { OrdersTable } from "@/components/admin/orders-table";
import { requireAdmin } from "@/lib/admin-auth";
import { listOrders, parseOrderFilters } from "@/lib/admin-orders";

type OrdersContentProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function OrdersContent({ searchParams }: OrdersContentProps) {
  await connection();
  await requireAdmin();
  const filters = parseOrderFilters(await searchParams);
  const { orders, total } = await listOrders(filters);
  const filtered = Boolean(filters.q || filters.status || filters.rentang === "semua");

  return (
    <OrdersLiveFilters filters={filters}>
      <OrdersTable orders={orders} filtered={filtered} footer={<OrdersPagination filters={filters} total={total} />} />
    </OrdersLiveFilters>
  );
}
