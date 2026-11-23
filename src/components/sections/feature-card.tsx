import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

export type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function FeatureCard({ number, title, description, icon: Icon, className }: FeatureCardProps) {
  return (
    <article
      {...revealItem}
      className={cn(
        "group relative flex flex-col gap-2 rounded-card border-[1.5px] border-cream-line bg-cream p-[26px] transition duration-200 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-[27px] right-[22px] font-heading text-[68px] leading-none font-bold text-highlight opacity-60 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
      >
        {number}
      </span>
      <span className="flex size-[70px] items-center justify-center rounded-full border-2 border-brand bg-highlight text-brand transition-colors group-hover:bg-brand group-hover:text-highlight motion-reduce:transition-none">
        <Icon aria-hidden="true" className="size-8" strokeWidth={1.9} />
      </span>
      <div aria-hidden="true" className="h-2" />
      <h3 className="text-xl leading-[1.12] font-bold text-ink lg:text-[21px]">{title}</h3>
      <p className="text-[14.5px] leading-[1.32] text-ink">{description}</p>
    </article>
  );
}
