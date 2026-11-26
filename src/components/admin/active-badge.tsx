import { cn } from "@/lib/utils";

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-0.5 text-xs font-medium whitespace-nowrap text-ink">
      <span className={cn("size-1.5 rounded-full", active ? "bg-status-paid" : "bg-status-void")} aria-hidden="true" />
      {active ? "Aktif" : "Nonaktif"}
    </span>
  );
}
