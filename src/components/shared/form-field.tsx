import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const fieldControlClass = "h-[45px] rounded-lg border-border bg-white px-4 text-sm placeholder:text-ink-muted md:text-sm";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  plain?: boolean;
  labelAction?: React.ReactNode;
  children: React.ReactNode;
};

export function FormField({ id, label, error, className, plain, labelAction, children }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={id}
          className={plain ? "text-[15px] leading-[1.3] font-semibold text-ink" : "text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase"}
        >
          {label}
        </Label>
        {labelAction}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
