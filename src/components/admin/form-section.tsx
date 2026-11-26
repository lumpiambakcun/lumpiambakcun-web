import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FormSectionProps = {
  icon: LucideIcon;
  title: string;
  error?: string;
  errorId?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormSection({ icon: Icon, title, error, errorId, className, children }: FormSectionProps) {
  return (
    <section aria-label={title} className={cn("flex flex-col gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0", className)}>
      <h3 className="flex items-center gap-2 text-[11px] leading-none font-extrabold tracking-[0.08em] text-ink-muted uppercase">
        <Icon className="size-3.5" aria-hidden="true" />
        {title}
      </h3>
      {children}
      {error && (
        <p id={errorId} role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
    </section>
  );
}
