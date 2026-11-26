import { orderStatusInfo, type OrderStatus } from "@/content/checkout";
import { cn } from "@/lib/utils";

const dot: Record<OrderStatus, string> = {
  pending: "bg-status-pending",
  paid: "bg-status-paid",
  failed: "bg-status-failed",
  expired: "bg-status-void",
  cancelled: "bg-status-void",
};

const tone: Record<OrderStatus, string> = {
  pending: "bg-status-pending/15 text-ink",
  paid: "bg-status-paid/12 text-ink",
  failed: "bg-status-failed/12 text-ink",
  expired: "bg-status-void/15 text-ink",
  cancelled: "bg-status-void/15 text-ink",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", tone[status])}>
      <span className={cn("size-1.5 rounded-full", dot[status])} aria-hidden="true" />
      {orderStatusInfo[status].label}
    </span>
  );
}
