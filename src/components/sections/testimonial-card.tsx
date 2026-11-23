import Image from "next/image";
import { memo } from "react";
import { RatingStars } from "@/components/shared/rating-stars";

export type Testimonial = {
  name: string;
  source: string;
  quote: string;
  rating?: number;
  avatar?: string;
};

export const TestimonialCard = memo(function TestimonialCard({ name, source, quote, rating = 5, avatar }: Testimonial) {
  return (
    <figure className="flex h-full min-h-[250px] flex-col justify-between gap-6 rounded-card border-[1.5px] border-cream-line bg-white px-[26px] pt-[26px] pb-6">
      <div className="flex flex-col gap-3">
        <RatingStars value={rating} />
        <blockquote className="text-[15px] leading-[1.32] text-ink">&ldquo;{quote}&rdquo;</blockquote>
      </div>
      <figcaption className="flex items-center gap-2.5">
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            width={38}
            height={38}
            className="size-[38px] shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-highlight text-[15px] leading-[1.3] font-extrabold text-brand"
          >
            {name.charAt(0)}
          </span>
        )}
        <span className="flex flex-col gap-px">
          <span className="text-sm leading-[1.3] font-extrabold text-ink">{name}</span>
          <span className="text-xs leading-[1.28] text-ink-muted">{source}</span>
        </span>
      </figcaption>
    </figure>
  );
});
