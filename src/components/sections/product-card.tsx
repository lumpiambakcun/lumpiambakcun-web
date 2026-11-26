import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/shared/whatsapp-link";

export type ProductCardProps = {
  href: string;
  variant: string;
  name: string;
  description: string;
  price?: string;
  unit?: string;
  discount?: string;
  image: { src: string; alt: string };
  whatsappMessage: string;
};

export const ProductCard = memo(function ProductCard({
  href,
  variant,
  name,
  description,
  price,
  unit,
  discount,
  image,
  whatsappMessage,
}: ProductCardProps) {
  return (
    <article className="group relative flex flex-col items-center gap-1 rounded-tile border border-border bg-white px-4 pt-[108px] pb-4 transition duration-200 hover:-translate-y-1 hover:border-brand/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <Link href={href} aria-hidden="true" tabIndex={-1} className="absolute -top-16 left-1/2 size-[156px] -translate-x-1/2">
        <Image
          src={image.src}
          alt={image.alt}
          width={156}
          height={156}
          sizes="156px"
          className="size-full rounded-full border-[5px] border-white bg-cream-tint object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </Link>
      {discount && (
        <p className="absolute top-3 left-3 rounded-full bg-ink px-2.5 py-[3px] text-[11px] leading-[1.12] font-extrabold tracking-[0.04em] text-white">
          {discount}
        </p>
      )}
      <p className="text-[11px] leading-[1.12] font-extrabold tracking-[0.08em] text-brand uppercase">{variant}</p>
      <h3 className="text-base leading-[1.08] font-semibold text-ink">
        <Link href={href} className="rounded-sm after:absolute after:inset-0 after:rounded-tile">
          {name}
        </Link>
      </h3>
      <p className="text-balance text-center text-xs leading-[1.22] text-ink-muted">{description}</p>
      <div className="flex w-full items-center gap-2">
        <p className="flex min-w-0 flex-1 items-baseline gap-1">
          <span className="font-heading text-lg leading-[1.08] font-bold text-brand">{price ?? "Tanya via WA"}</span>
          {unit && <span className="text-xs leading-[1.28] text-ink-muted">{unit}</span>}
        </p>
        <Button
          asChild
          variant="accent"
          className="relative z-10 size-[46px] shrink-0 rounded-[10px] md:size-[46px]"
        >
          <WhatsAppLink message={whatsappMessage} aria-label={`Pesan ${name} ${variant} lewat WhatsApp`}>
            <WhatsAppIcon className="size-6" />
          </WhatsAppLink>
        </Button>
      </div>
    </article>
  );
});
