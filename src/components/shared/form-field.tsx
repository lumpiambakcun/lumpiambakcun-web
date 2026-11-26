import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const fieldControlClass = "h-[45px] rounded-lg border-border bg-white px-4 text-sm placeholder:text-ink-muted md:text-sm";

export const fieldTextareaClass =
  "w-full min-w-0 rounded-lg border border-border bg-white px-4 py-3 text-sm leading-[1.4] transition-colors outline-none placeholder:text-ink-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20";

const labelTone = {
  brand: "text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase",
  plain: "text-[15px] leading-[1.3] font-semibold text-ink",
  admin: "text-[13px] leading-[1.2] font-semibold text-ink",
} as const;

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  tone?: "brand" | "plain" | "admin";
  labelAction?: React.ReactNode;
  children: React.ReactNode;
};

export function FormField({ id, label, error, className, tone = "brand", labelAction, children }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <Label
          htmlFor={id}
          className={labelTone[tone]}
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
