import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

export type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function FeatureCard({ title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <article
      {...revealItem}
      className={cn(
        "group flex flex-col items-center gap-4 rounded-card border-[1.5px] border-cream-line bg-cream px-6 py-8 text-center shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <span className="flex size-20 items-center justify-center rounded-full bg-brand text-white ring-[3px] ring-brand ring-offset-4 ring-offset-cream transition-colors group-hover:bg-brand-hover group-hover:ring-brand-hover motion-reduce:transition-none">
        <Icon aria-hidden="true" className="size-9" strokeWidth={1.9} />
      </span>
      <h3 className="mt-1 text-[22px] leading-[1.15] font-bold text-ink">{title}</h3>
      <p className="text-[17px] leading-[1.5] text-ink">{description}</p>
    </article>
  );
}
