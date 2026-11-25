"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useState, useSyncExternalStore } from "react";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TestimonialCard, type Testimonial } from "./testimonial-card";

const emblaOpts = { align: "start", loop: true, slidesToScroll: "auto" } as const;

const navButton =
  "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-ink bg-white text-ink shadow-card transition-colors hover:bg-ink hover:text-highlight active:scale-95 motion-reduce:transition-none lg:flex";

function useSnapCount(api: CarouselApi) {
  const subscribe = useCallback(
    (notify: () => void) => {
      api?.on("reInit", notify);
      return () => {
        api?.off("reInit", notify);
      };
    },
    [api],
  );
  const getSnapshot = useCallback(() => (api ? api.scrollSnapList().length : 0), [api]);
  return useSyncExternalStore(subscribe, getSnapshot, () => 0);
}

export function TestimonialsCarousel({ reviews }: { reviews: readonly Testimonial[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const snaps = useSnapCount(api);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <Carousel setApi={setApi} opts={emblaOpts} aria-label="Ulasan pelanggan">
      <div className="cursor-grab select-none active:cursor-grabbing">
        <CarouselContent
          className="-ml-4"
          viewportClassName="edge-fade-x -mx-3 px-3 [--fade-l:12px] [--fade-r:12px] md:-mx-4 md:px-4 md:[--fade-l:16px] md:[--fade-r:16px]"
        >
          {reviews.map((review) => (
            <CarouselItem key={review.name} className="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
              <TestimonialCard {...review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>

      {snaps > 1 && (
        <>
          <button
            type="button"
            aria-label="Ulasan sebelumnya"
            className={cn(navButton, "left-0 -translate-x-1/2 xl:-left-4 xl:-translate-x-full")}
            onClick={scrollPrev}
          >
            <ArrowLeft aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Ulasan berikutnya"
            className={cn(navButton, "right-0 translate-x-1/2 xl:-right-4 xl:translate-x-full")}
            onClick={scrollNext}
          >
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
          </button>
        </>
      )}
    </Carousel>
  );
}
