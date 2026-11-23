import { cn } from "@/lib/utils";

type PriceStickerProps = {
  prefix: string;
  price: string;
  suffix: string;
  className?: string;
};

export function PriceSticker({ prefix, price, suffix, className }: PriceStickerProps) {
  return (
    <div
      className={cn(
        "flex size-20 origin-top-left rotate-8 flex-col items-center justify-center rounded-full border-[3px] border-brand bg-white md:size-[92px] lg:size-[122px]",
        className,
      )}
    >
      <span className="text-[8px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase lg:text-[11px]">{prefix}</span>
      <span className="font-heading text-base leading-[1.08] font-bold text-brand md:text-lg lg:text-2xl">{price}</span>
      <span className="text-[8px] leading-[1.28] text-ink md:text-[9px] lg:text-xs">{suffix}</span>
    </div>
  );
}
