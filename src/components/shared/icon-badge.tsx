import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconBadge({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span className={cn("flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-highlight", className)}>
      <Icon aria-hidden="true" className="size-7 text-ink" strokeWidth={1.75} />
    </span>
  );
}
