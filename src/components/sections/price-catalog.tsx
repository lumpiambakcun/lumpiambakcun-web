import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { SectionHeading } from "@/components/shared/section-heading";
import { PriceCard, type PriceCardProps } from "./price-card";

type PriceCatalogProps = {
  eyebrow: string;
  title: string;
  cards: readonly PriceCardProps[];
  footnote: string;
};

export function PriceCatalog({ eyebrow, title, cards, footnote }: PriceCatalogProps) {
  return (
    <Section doodles={doodleLayout.catalog} aria-labelledby="katalog-judul" className="bg-cream pt-10 pb-10 md:pt-12 lg:pt-[60px] lg:pb-14">

      <SectionHeading id="katalog-judul" eyebrow={eyebrow} title={title} />
      <div className="relative mx-auto mt-6 grid max-w-[1080px] gap-4 md:grid-cols-2 lg:mt-7">
        {cards.map((card) => (
          <PriceCard key={card.title} {...card} />
        ))}
      </div>
      <p className="relative mt-8 text-center text-[13px] leading-[1.28] text-ink lg:mt-[34px]">{footnote}</p>
    </Section>
  );
}
