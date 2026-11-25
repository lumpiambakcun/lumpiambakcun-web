import { cn } from "@/lib/utils";

const bar = "block h-[3px] w-[20px] rounded-full bg-white transition-[transform,opacity] duration-200 motion-reduce:transition-none";

export function MenuToggle({ open = false, className, ...props }: React.ComponentProps<"button"> & { open?: boolean }) {
  return (
    <button
      type="button"
      aria-label={open ? "Tutup menu" : "Buka menu"}
      className={cn(
        "flex size-12 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-brand transition-colors hover:bg-brand-hover active:scale-95 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className={cn(bar, open && "translate-y-2 rotate-45")} />
      <span aria-hidden="true" className={cn(bar, open && "opacity-0")} />
      <span aria-hidden="true" className={cn(bar, open && "-translate-y-2 -rotate-45")} />
    </button>
  );
}
