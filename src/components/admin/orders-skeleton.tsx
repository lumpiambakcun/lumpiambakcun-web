import { OrdersPaginationSkeleton } from "@/components/admin/orders-pagination";
import { OrdersTableSkeleton } from "@/components/admin/orders-table";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
        <Skeleton className="h-10 rounded-lg sm:w-72" />
        <Skeleton className="h-10 rounded-lg sm:w-[15.5rem]" />
        <Skeleton className="h-10 rounded-lg sm:w-36" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <OrdersTableSkeleton footer={<OrdersPaginationSkeleton />} />
      </div>
    </div>
  );
}
