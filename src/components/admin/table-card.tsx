import { adminCardClass } from "@/components/admin/styles";
import { cn } from "@/lib/utils";

export const tableHeadClass = "sticky top-0 z-10 h-11 bg-muted px-4 text-[11px] font-extrabold tracking-[0.08em] text-ink-muted uppercase shadow-[inset_0_-1px_0_var(--border)]";

type TableCardProps = {
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function TableCard({ footer, className, children }: TableCardProps) {
  return (
    <div className={cn("flex min-h-0 flex-col overflow-hidden", adminCardClass, className)}>
      {children}
      {footer && <div className="shrink-0 border-t border-border bg-card px-4 py-3">{footer}</div>}
    </div>
  );
}
