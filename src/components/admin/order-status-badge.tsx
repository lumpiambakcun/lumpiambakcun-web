import { orderStatusInfo, type OrderStatus } from "@/content/checkout";
import { cn } from "@/lib/utils";

const dot: Record<OrderStatus, string> = {
  pending: "bg-status-pending",
  paid: "bg-status-paid",
  failed: "bg-status-failed",
  expired: "bg-status-void",
  cancelled: "bg-status-void",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink">
      <span className={cn("size-1.5 rounded-full", dot[status])} aria-hidden="true" />
      {orderStatusInfo[status].label}
    </span>
  );
}
