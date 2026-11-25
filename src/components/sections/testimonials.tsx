import { doodleLayout } from "@/content/doodles";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialsCarousel } from "./testimonials-carousel";
import type { Testimonial } from "./testimonial-card";
import { revealItem } from "@/lib/reveal";

type TestimonialsProps = {
  title: string;
  rating: { value: number; count: number; source: string };
  reviews: readonly Testimonial[];
};

export function Testimonials({ title, rating, reviews }: TestimonialsProps) {
  return (
    <Section doodles={doodleLayout.testimonials} id="testimoni" aria-labelledby="testimoni-judul" className="bg-cream pt-4 pb-24 lg:pt-4 lg:pb-28">
      <div className="relative flex flex-col items-center gap-0.5 text-center">
        <SectionHeading id="testimoni-judul" title={title} size="md" />
        <p {...revealItem} className="text-sm leading-[1.3] font-semibold text-ink">
          {rating.value} dari {rating.count} ulasan {rating.source}
        </p>
      </div>

      <div {...revealItem} className="relative mt-5">
        <TestimonialsCarousel reviews={reviews} />
      </div>
    </Section>
  );
}
