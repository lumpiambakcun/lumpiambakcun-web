import { cn } from "@/lib/utils";

type ActiveBadgeProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

export function ActiveBadge({ active, activeLabel = "Aktif", inactiveLabel = "Nonaktif" }: ActiveBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink">
      <span className={cn("size-1.5 rounded-full", active ? "bg-status-paid" : "bg-status-void")} aria-hidden="true" />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
