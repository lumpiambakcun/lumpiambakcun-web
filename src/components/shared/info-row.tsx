import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconComponent = LucideIcon | ((props: React.ComponentProps<"svg">) => React.ReactNode);

type InfoRowProps = {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function InfoRow({ icon: Icon, label, value, href, external }: InfoRowProps) {
  const text = "text-base leading-[1.32] text-ink";
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-highlight">
        <Icon aria-hidden="true" className="size-5 text-ink" strokeWidth={1.75} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">{label}</p>
        {href ? (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(text, "rounded-sm transition-colors hover:text-brand")}
          >
            {value}
          </a>
        ) : (
          <p className={text}>{value}</p>
        )}
      </div>
    </div>
  );
}
