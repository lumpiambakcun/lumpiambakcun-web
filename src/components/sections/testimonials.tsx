import { RatingStars } from "@/components/shared/rating-stars";
import { doodleLayout } from "@/content/doodles";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialsCarousel } from "./testimonials-carousel";
import type { Testimonial } from "./testimonial-card";
import { revealItem } from "@/lib/reveal";

type TestimonialsProps = {
  eyebrow: string;
  title: string;
  rating: { value: number; count: number; source: string };
  reviews: readonly Testimonial[];
  allReviewsLabel: string;
  allReviewsHref: string;
};

export function Testimonials({ eyebrow, title, rating, reviews, allReviewsLabel, allReviewsHref }: TestimonialsProps) {
  return (
    <Section doodles={doodleLayout.testimonials} aria-labelledby="testimoni-judul" className="bg-cream pt-12 pb-12 lg:pt-16 lg:pb-14">

      <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="testimoni-judul"
          eyebrow={eyebrow}
          title={title}
          align="left"
          size="md"
          className="gap-1"
        />
        <p {...revealItem} className="flex w-fit items-center gap-3 rounded-card border-[1.5px] border-cream-line bg-white px-5 py-3">
          <span className="font-heading text-[34px] leading-none font-bold text-brand">{rating.value}</span>
          <span className="flex flex-col gap-[3px]">
            <RatingStars value={Math.round(rating.value)} starClassName="size-3" />
            <span className="text-xs leading-[1.28] text-ink">
              dari {rating.count} ulasan {rating.source}
            </span>
          </span>
        </p>
      </div>

      <div {...revealItem} className="relative mt-6">
        <TestimonialsCarousel reviews={reviews} />
      </div>

      <p {...revealItem} className="relative mt-5 text-center">
        <a
          href={allReviewsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm text-sm leading-[1.3] font-extrabold text-brand underline underline-offset-4 transition-colors hover:text-brand-hover"
        >
          {allReviewsLabel}
        </a>
      </p>
    </Section>
  );
}
