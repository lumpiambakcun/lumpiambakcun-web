import { cn } from "@/lib/utils";
import type { MenuProduct } from "./menu-browser";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: readonly MenuProduct[];
  className?: string;
};

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <ul className={cn("relative grid gap-x-2.5 gap-y-[74px] md:grid-cols-2 lg:grid-cols-4 lg:gap-y-[78px]", className)}>
      {products.map(({ id, card }) => (
        <li key={id} className="motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200">
          <ProductCard {...card} />
        </li>
      ))}
    </ul>
  );
}
