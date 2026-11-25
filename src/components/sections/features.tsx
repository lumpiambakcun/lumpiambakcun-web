import { Section } from "@/components/shared/section";
import { doodleLayout } from "@/content/doodles";
import { SectionHeading } from "@/components/shared/section-heading";
import { FeatureCard, type FeatureCardProps } from "./feature-card";

type FeaturesProps = {
  title: string;
  items: readonly Omit<FeatureCardProps, "className">[];
};

export function Features({ title, items }: FeaturesProps) {
  return (
    <Section doodles={doodleLayout.features} id="keunggulan" aria-labelledby="keunggulan-judul" className="bg-white py-24 lg:py-28">

      <SectionHeading id="keunggulan-judul" title={title} />
      <div className="relative mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </Section>
  );
}
