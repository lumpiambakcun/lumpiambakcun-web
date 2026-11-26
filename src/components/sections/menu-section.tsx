import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { SectionHeading } from "@/components/shared/section-heading";
import { QuickOrder } from "./quick-order";
import type { QuickOrderProduct } from "./quick-order-product-card";

type MenuSectionProps = {
  title: string;
  text: string;
  products: readonly QuickOrderProduct[];
};

export function MenuSection({ title, text, products }: MenuSectionProps) {
  return (
    <Section doodles={doodleLayout.menu} id="menu" aria-labelledby="menu-judul" className="bg-highlight pt-28 pb-24 lg:pt-36 lg:pb-28">
      <SectionHeading id="menu-judul" title={title} size="md" />
      <p className="relative mx-auto mt-3 max-w-[560px] text-center text-base leading-[1.45] text-ink-muted">{text}</p>
      <QuickOrder products={products} />
    </Section>
  );
}
