import { cn } from "@/lib/utils";

type DialogFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  footer: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function DialogForm({ onSubmit, footer, className, children }: DialogFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="scroll-slim -mx-1 min-h-0 flex-1 overflow-y-auto px-1 pb-3">
        <div className={cn("grid gap-x-4 gap-y-3 sm:grid-cols-2", className)}>{children}</div>
      </div>
      <div className="flex shrink-0 flex-col gap-3 pt-2">{footer}</div>
    </form>
  );
}

export function FormMessage({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="rounded-lg bg-canvas px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand">
      {children}
    </p>
  );
}
