import { Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumb, type Crumb } from "@/components/shared/breadcrumb";
import { Section } from "@/components/shared/section";
import { ProductGallery } from "./product-gallery";
import { revealItem } from "@/lib/reveal";
import { cn } from "@/lib/utils";

type ProductDetailProps = {
  crumbs: readonly Crumb[];
  name: string;
  gallery: readonly { src: string; alt: string }[];
  rating: { value: number; count: number; source: string };
  variantsLabel: string;
  variants: readonly { href: string; label: string; active: boolean }[];
  price?: string;
  unit?: string;
  priceFallback: string;
  description: string;
  highlights: readonly string[];
  actions: React.ReactNode;
  doodles?: React.ComponentProps<typeof Section>["doodles"];
};

export function ProductDetail({
  crumbs,
  name,
  gallery,
  rating,
  variantsLabel,
  variants,
  price,
  unit,
  priceFallback,
  description,
  highlights,
  actions,
  doodles,
}: ProductDetailProps) {
  return (
    <Section doodles={doodles} aria-labelledby="produk-judul" className="bg-cream py-6 md:pt-2 md:pb-7 lg:pt-8 lg:pb-14">
      <Breadcrumb items={crumbs} className="relative" />
      <div className="relative mt-4 grid gap-3 md:mt-[18px] md:gap-4 lg:mt-5 lg:grid-cols-2 lg:items-start lg:gap-12">
        <ProductGallery images={gallery} />
        <div {...revealItem} className="flex flex-col gap-2.5">
          <h1 id="produk-judul" className="text-[44px] leading-none font-bold text-ink md:text-6xl">
            {name}
          </h1>
          <p className="flex items-center gap-2.5 text-[13px] leading-[1.28] text-ink">
            <span className="text-lg leading-[1.12] font-extrabold">{rating.value.toLocaleString("id-ID")}</span>
            <span>
              dari {rating.count} ulasan {rating.source}
            </span>
          </p>
          <div className="flex flex-col gap-2.5">
            <p className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase">{variantsLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <li key={variant.href}>
                  <Link
                    href={variant.href}
                    aria-current={variant.active ? "page" : undefined}
                    className={cn(
                      "block rounded-2xl border px-5 py-[11px] font-heading text-xs leading-[1.08] font-semibold tracking-[0.04em] uppercase transition-colors motion-reduce:transition-none",
                      variant.active
                        ? "border-highlight bg-highlight text-ink"
                        : "border-border bg-white text-ink hover:border-ink hover:bg-ink hover:text-highlight",
                    )}
                  >
                    {variant.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex items-baseline gap-1">
            <span className={cn("font-heading font-bold text-brand", price ? "text-[44px] leading-[1.3]" : "text-2xl")}>
              {price ?? priceFallback}
            </span>
            {price && unit && <span className="text-[13px] leading-[1.28] text-ink-muted">{unit}</span>}
          </p>
          <p className="text-base leading-[1.32] text-ink">{description}</p>
          <ul className="flex flex-col gap-2.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-base leading-[1.32] text-ink">
                <Check aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
          {actions}
        </div>
      </div>
    </Section>
  );
}
