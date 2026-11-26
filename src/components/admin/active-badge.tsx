import { cn } from "@/lib/utils";

type ActiveBadgeProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

export function ActiveBadge({ active, activeLabel = "Aktif", inactiveLabel = "Nonaktif" }: ActiveBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", active ? "bg-status-paid/12 text-ink" : "bg-status-void/15 text-ink")}>
      <span className={cn("size-1.5 rounded-full", active ? "bg-status-paid" : "bg-status-void")} aria-hidden="true" />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
