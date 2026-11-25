import { Check, Plus } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type QuickOrderProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  pcs: number;
  image: { src: string; alt: string };
};

type QuickOrderProductCardProps = {
  product: QuickOrderProduct;
  priceLabel: string;
  selected: boolean;
  onSelect: () => void;
};

export function QuickOrderProductCard({ product, priceLabel, selected, onSelect }: QuickOrderProductCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`Pilih ${product.name}`}
      className={cn(
        "group relative flex flex-col items-center gap-1 rounded-tile border-[1.5px] bg-white px-4 pt-[128px] pb-4 transition duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        selected ? "border-brand" : "border-border hover:border-brand/40",
      )}
    >
      <span className="absolute -top-[88px] left-1/2 block size-[200px] -translate-x-1/2">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={200}
          height={200}
          sizes="200px"
          className="size-full rounded-full border-[5px] border-white bg-cream-tint object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </span>
      <span className="font-heading text-base leading-[1.08] font-semibold text-ink">{product.name}</span>
      <span className="text-balance text-center text-xs leading-[1.22] text-ink-muted">{product.description}</span>
      <span className="flex w-full items-center gap-2">
        <span className="flex min-w-0 flex-1 items-baseline gap-1 text-left">
          <span className="font-heading text-[26px] leading-none font-bold text-brand">{priceLabel}</span>
          <span className="text-sm leading-[1.28] text-ink-muted">{product.unit}</span>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-[46px] shrink-0 items-center justify-center rounded-[10px] transition-colors motion-reduce:transition-none",
            selected ? "bg-highlight text-ink" : "bg-cream-tint text-ink-muted group-hover:bg-highlight group-hover:text-ink",
          )}
        >
          {selected ? <Check className="size-6" strokeWidth={3} /> : <Plus className="size-6" strokeWidth={2.5} />}
        </span>
      </span>
    </button>
  );
}
