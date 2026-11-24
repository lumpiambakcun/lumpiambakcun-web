import { cn } from "@/lib/utils";

type PaymentMethodOptionsProps = {
  name: string;
  options: readonly { id: string; label: string; description: string }[];
  defaultValue: string;
  error?: string;
};

export function PaymentMethodOptions({ name, options, defaultValue, error }: PaymentMethodOptionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <label
          key={option.id}
          className={cn(
            "flex cursor-pointer items-center gap-3.5 rounded-[14px] border border-border bg-white px-[18px] py-4 transition-colors",
            "has-checked:border-2 has-checked:border-brand has-checked:bg-cream has-focus-visible:ring-3 has-focus-visible:ring-ring/50",
          )}
        >
          <input type="radio" name={name} value={option.id} defaultChecked={option.id === defaultValue} className="peer sr-only" />
          <span
            aria-hidden="true"
            className="grid size-[22px] shrink-0 place-items-center rounded-full border-2 border-border bg-white peer-checked:border-brand peer-checked:[&>span]:opacity-100"
          >
            <span className="size-3 rounded-full bg-brand opacity-0" />
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="font-heading text-base leading-[1.12] font-bold text-ink">{option.label}</span>
            <span className="text-[13px] leading-[1.28] text-ink">{option.description}</span>
          </span>
        </label>
      ))}
      {error && (
        <p role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
    </div>
  );
}
