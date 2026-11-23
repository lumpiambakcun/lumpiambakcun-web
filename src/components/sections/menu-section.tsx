import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { SectionHeading } from "@/components/shared/section-heading";
import { MenuBrowser, type MenuCategory, type MenuProduct } from "./menu-browser";

type MenuSectionProps = {
  eyebrow: string;
  title: string;
  categories: readonly MenuCategory[];
  products: readonly MenuProduct[];
};

export function MenuSection({ eyebrow, title, categories, products }: MenuSectionProps) {
  return (
    <Section doodles={doodleLayout.menu} id="menu" aria-labelledby="menu-judul" className="bg-cream py-10">

      <SectionHeading id="menu-judul" eyebrow={eyebrow} title={title} size="md" />
      <MenuBrowser categories={categories} products={products} />
    </Section>
  );
}
