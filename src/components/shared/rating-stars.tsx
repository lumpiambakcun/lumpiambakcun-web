import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type RatingStarsProps = {
  value?: number;
  className?: string;
  starClassName?: string;
  tone?: "brand" | "highlight";
};

export function RatingStars({ value = 5, className, starClassName, tone = "brand" }: RatingStarsProps) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`Rating ${value} dari 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            tone === "brand" ? "fill-brand text-brand" : "fill-highlight text-highlight",
            i >= value && "fill-transparent",
            starClassName,
          )}
        />
      ))}
    </span>
  );
}
