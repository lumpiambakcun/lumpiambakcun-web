import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { MenuProduct } from "./menu-browser";
import { ProductGrid } from "./product-grid";

type RelatedProductsProps = {
  eyebrow: string;
  title: string;
  products: readonly MenuProduct[];
  doodles?: React.ComponentProps<typeof Section>["doodles"];
};

export function RelatedProducts({ eyebrow, title, products, doodles }: RelatedProductsProps) {
  return (
    <Section doodles={doodles} aria-labelledby="produk-lain-judul" className="bg-cream pt-4 pb-12 lg:pb-16">
      <SectionHeading id="produk-lain-judul" eyebrow={eyebrow} title={title} size="md" />
      <ProductGrid products={products} className="mt-[78px]" />
    </Section>
  );
}
