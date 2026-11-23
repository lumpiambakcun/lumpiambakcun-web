import { Check } from "lucide-react";
import Image from "next/image";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { cn } from "@/lib/utils";
import { revealItem } from "@/lib/reveal";

export type PriceCardProps = {
  badge: string;
  badgeTone?: "yellow" | "red";
  title: string;
  price: string;
  unit: string;
  features: readonly string[];
  ctaLabel: string;
  ctaMessage: string;
  image: { src: string; alt: string };
};

export function PriceCard({
  badge,
  badgeTone = "yellow",
  title,
  price,
  unit,
  features,
  ctaLabel,
  ctaMessage,
  image,
}: PriceCardProps) {
  return (
    <article {...revealItem} className="group flex flex-col overflow-hidden rounded-card border-[1.5px] border-cream-line bg-cream-soft pb-6 transition duration-200 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-[310px] w-full overflow-hidden bg-cream-tint lg:h-[250px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 532px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-col gap-2 px-5 pt-5 md:px-[30px]">
        <p
          className={cn(
            "w-fit rounded-md px-3 py-[5px] text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] uppercase",
            badgeTone === "yellow" ? "bg-highlight text-ink" : "bg-brand text-white",
          )}
        >
          {badge}
        </p>
        <h3 className="text-[26px] leading-[1.08] font-bold text-ink">{title}</h3>
        <p className="flex items-baseline gap-1">
          <span className="font-heading text-[36px] leading-[1.1] font-bold text-brand lg:text-[34px]">{price}</span>
          <span className="text-sm leading-[1.32] text-ink-muted">{unit}</span>
        </p>
        <ul className="mt-1 flex flex-col gap-1.5">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm leading-[1.32] text-ink">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
              {feature}
            </li>
          ))}
        </ul>
        <WhatsAppButton
          message={ctaMessage}
          variant="brand"
          size="cta"
          hideIcon
          className="mt-3 h-[46px] w-full"
        >
          {ctaLabel}
        </WhatsAppButton>
      </div>
    </article>
  );
}
