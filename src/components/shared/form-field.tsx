import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const fieldControlClass = "h-[45px] rounded-lg border-border bg-white px-4 text-sm placeholder:text-ink-muted md:text-sm";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <Label
        htmlFor={id}
        className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase"
      >
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
