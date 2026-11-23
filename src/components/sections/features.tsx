import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureCard, type FeatureCardProps } from "./feature-card";

type FeaturesProps = {
  eyebrow: string;
  title: string;
  items: readonly Omit<FeatureCardProps, "className">[];
};

export function Features({ eyebrow, title, items }: FeaturesProps) {
  return (
    <Section doodles={doodleLayout.features} aria-labelledby="keunggulan-judul" className="bg-white py-12 lg:pt-16 lg:pb-[72px]">

      <SectionHeading id="keunggulan-judul" eyebrow={eyebrow} title={title} />
      <div className="relative mt-7 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item, index) => (
          <FeatureCard
            key={item.number}
            {...item}
            className={index === items.length - 1 ? "md:col-span-2 lg:col-span-1" : undefined}
          />
        ))}
      </div>
    </Section>
  );
}
