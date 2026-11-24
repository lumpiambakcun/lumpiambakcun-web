import { Badge } from "@/components/ui/badge";
import { orderStatusInfo, type OrderStatus } from "@/content/checkout";
import { cn } from "@/lib/utils";

const tone: Record<OrderStatus, string> = {
  pending: "bg-highlight text-ink",
  paid: "bg-brand text-highlight",
  failed: "bg-cream-line text-ink-muted",
  expired: "bg-cream-line text-ink-muted",
  cancelled: "bg-cream-line text-ink-muted",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge className={cn("font-bold", tone[status])}>{orderStatusInfo[status].label}</Badge>;
}
