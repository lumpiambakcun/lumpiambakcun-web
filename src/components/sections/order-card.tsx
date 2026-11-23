import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { cn } from "@/lib/utils";

export type OrderCardProps = {
  icon: LucideIcon;
  title: string;
  text: string | readonly string[];
  badge?: string;
  extra?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function OrderCard({ icon, title, text, badge, extra, action, className }: OrderCardProps) {
  const paragraphs = typeof text === "string" ? [text] : text;
  return (
    <article className={cn("flex h-full flex-col gap-2.5 rounded-panel border border-border bg-white p-[26px]", className)}>
      <div className="flex items-center justify-between">
        <IconBadge icon={icon} />
        {badge && (
          <p className="rounded-full bg-highlight px-2.5 py-1 text-[10px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">
            {badge}
          </p>
        )}
      </div>
      <h3 className="mt-4 font-heading text-[22px] leading-[1.08] font-bold text-ink">{title}</h3>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-[15px] leading-[1.32] text-ink/65">
          {paragraph}
        </p>
      ))}
      {extra}
      {action && <div className="mt-auto flex pt-3.5">{action}</div>}
    </article>
  );
}
