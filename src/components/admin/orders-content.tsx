import { connection } from "next/server";
import { OrderFilterBar } from "@/components/admin/order-filters";
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

  return (
    <div className="flex flex-col gap-4">
      <OrderFilterBar filters={filters} />
      <OrdersTable orders={orders} />
      <OrdersPagination filters={filters} total={total} />
    </div>
  );
}
