import type { LucideIcon } from "lucide-react";
import { IconBadge } from "@/components/shared/icon-badge";
import { revealItem } from "@/lib/reveal";

export type StepCardProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function StepCard({ icon, title, text, number }: StepCardProps & { number: number }) {
  return (
    <li {...revealItem} className="flex min-h-[210px] flex-col gap-2.5 rounded-panel md:min-h-[220px] lg:min-h-[230px] border border-border bg-cream p-[26px]">
      <div className="flex items-center justify-between">
        <IconBadge icon={icon} />
        <span aria-hidden="true" className="font-heading text-[56px] leading-none font-bold text-highlight">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 font-heading text-[22px] leading-[1.08] font-bold text-ink">
        <span className="sr-only">Langkah {number}: </span>
        {title}
      </h3>
      <p className="text-[15px] leading-[1.32] text-ink/65">{text}</p>
    </li>
  );
}
