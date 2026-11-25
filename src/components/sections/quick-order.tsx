"use client";

import { useRef, useState } from "react";
import { formatRupiah } from "@/lib/currency";
import { QuickOrderPanel } from "./quick-order-panel";
import { QuickOrderProductCard, type QuickOrderProduct } from "./quick-order-product-card";

const MIN_QTY = 1;
const MAX_QTY = 50;
const STACKED_LAYOUT = "(max-width: 1023px)";

export function QuickOrder({ products }: { products: readonly QuickOrderProduct[] }) {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [qty, setQty] = useState(MIN_QTY);
  const panelRef = useRef<HTMLDivElement>(null);
  const selected = products.find((product) => product.id === selectedId) ?? products[0];

  function select(id: string) {
    setSelectedId(id);
    if (!window.matchMedia(STACKED_LAYOUT).matches) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }

  return (
    <div className="relative mt-9 flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="mt-[88px] grid min-w-0 gap-x-4 gap-y-[120px] sm:grid-cols-2 lg:mt-0 lg:flex-1 lg:pt-[88px]">
        {products.map((product) => (
          <QuickOrderProductCard
            key={product.id}
            product={product}
            priceLabel={formatRupiah(product.price)}
            selected={product.id === selected.id}
            onSelect={() => select(product.id)}
          />
        ))}
      </div>
      <div ref={panelRef} className="scroll-mt-24 lg:w-[380px] lg:shrink-0">
        <QuickOrderPanel product={selected} qty={qty} min={MIN_QTY} max={MAX_QTY} onChange={setQty} />
      </div>
    </div>
  );
}
