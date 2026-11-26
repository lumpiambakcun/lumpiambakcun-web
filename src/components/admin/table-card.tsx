import { cn } from "@/lib/utils";

export const tableHeadClass = "sticky top-0 z-10 h-10 bg-card px-3 text-xs font-semibold text-ink-muted shadow-[inset_0_-1px_0_var(--border)]";

type TableCardProps = {
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function TableCard({ footer, className, children }: TableCardProps) {
  return (
    <div className={cn("flex min-h-0 flex-col overflow-hidden rounded-md border border-border bg-card shadow-card", className)}>
      {children}
      {footer && <div className="shrink-0 border-t border-border px-3 py-2">{footer}</div>}
    </div>
  );
}
