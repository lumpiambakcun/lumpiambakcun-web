import { cn } from "@/lib/utils";

export const dialogFooterClass = "-mx-5 -mb-5 gap-3 border-t border-border bg-muted/60 px-5 py-4 md:-mx-6 md:-mb-6 md:px-6";

type DialogFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  footer: React.ReactNode;
  className?: string;
  footerClassName?: string;
  children: React.ReactNode;
};

export function DialogForm({ onSubmit, footer, className, footerClassName, children }: DialogFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="scroll-slim -mx-1 min-h-0 flex-1 overflow-y-auto px-1 pb-3">
        <div className={cn("grid gap-x-4 gap-y-3 sm:grid-cols-2", className)}>{children}</div>
      </div>
      <div className={cn("flex shrink-0 flex-col gap-3 pt-2", footerClassName)}>{footer}</div>
    </form>
  );
}

export function FormMessage({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="rounded-lg bg-muted px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand">
      {children}
    </p>
  );
}
