"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { ProductCardProps } from "./product-card";
import { ProductGrid } from "./product-grid";
import { useDragScroll } from "./use-drag-scroll";

export type MenuCategory = { id: string; label: string };
export type MenuProduct = { id: string; category: string; card: ProductCardProps };

type MenuBrowserProps = {
  categories: readonly MenuCategory[];
  products: readonly MenuProduct[];
  allLabel?: string;
  chipsClassName?: string;
};

const ALL = "semua";

export function MenuBrowser({ categories, products, allLabel = "Semua", chipsClassName }: MenuBrowserProps) {
  const [category, setCategory] = useState(ALL);
  const scroller = useRef<HTMLDivElement>(null);

  useDragScroll(scroller);

  const chips = useMemo(() => [{ id: ALL, label: allLabel }, ...categories], [allLabel, categories]);
  const handleChange = useCallback((value: string) => setCategory(value || ALL), []);
  const visible = useMemo(
    () => (category === ALL ? products : products.filter((product) => product.category === category)),
    [category, products],
  );

  return (
    <>
      <ToggleGroup
        ref={scroller}
        type="single"
        value={category}
        onValueChange={handleChange}
        aria-label="Kategori menu"
        spacing={2}
        className={cn("edge-fade-x max-lg:cursor-grab mt-1.5 -mb-2 -ml-3 w-[calc(100%+1.5rem)] snap-x snap-proximity scroll-px-3 md:scroll-px-8 flex-nowrap justify-start overflow-x-auto overscroll-x-contain px-3 py-2 [scrollbar-width:none] max-lg:*:first:ml-auto max-lg:*:last:mr-auto md:-ml-8 md:w-[calc(100%+4rem)] md:px-8 lg:mx-auto lg:mt-3.5 lg:mb-0 lg:w-fit lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0 lg:py-0 lg:mask-none [&::-webkit-scrollbar]:hidden", chipsClassName)}
      >
        {chips.map((item) => (
          <ToggleGroupItem
            key={item.id}
            value={item.id}
            className="h-auto min-w-0 snap-start rounded-2xl border border-border bg-white px-[22px] py-3.5 font-heading text-xs leading-[1.08] font-semibold tracking-[0.04em] text-ink uppercase transition-colors hover:border-ink hover:bg-ink hover:text-highlight aria-checked:bg-highlight data-[state=on]:border-highlight data-[state=on]:bg-highlight data-[state=on]:hover:border-highlight-hover data-[state=on]:hover:bg-highlight-hover data-[state=on]:hover:text-ink active:scale-95 motion-reduce:transition-none"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} menu
      </p>
      <ProductGrid products={visible} className="mt-[78px]" />
    </>
  );
}
