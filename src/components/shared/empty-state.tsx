import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="grid size-11 place-items-center rounded-full bg-canvas text-ink-muted">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div className="flex max-w-sm flex-col gap-1">
        <p className="text-[15px] font-semibold text-ink">{title}</p>
        <p className="text-sm leading-[1.4] text-ink-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
