"use client";

import Image from "next/image";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { formatRupiah } from "@/lib/currency";

export type ProductOption = {
  value: string;
  name: string;
  price: number;
  unit: string;
  pcs: number;
  image: string;
};

type ProductPickerProps = {
  products: readonly ProductOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
};

export function ProductPicker({ products, value, onChange, name }: ProductPickerProps) {
  return (
    <>
      <input type="hidden" name={name} value={value} />
      <ToggleGroup
        type="single"
        variant="outline"
        spacing={2}
        aria-label="Pilih produk"
        value={value}
        onValueChange={(next) => next && onChange(next)}
        className="grid w-full grid-cols-1 sm:grid-cols-2"
      >
        {products.map((product) => (
          <ToggleGroupItem
            key={product.value}
            value={product.value}
            className="h-auto min-w-0 justify-start gap-3 rounded-lg border-2 border-border bg-white p-2.5 text-left font-normal whitespace-normal hover:bg-muted data-[state=on]:border-brand data-[state=on]:bg-white"
          >
            <Image src={product.image} alt="" width={44} height={44} sizes="44px" className="size-11 shrink-0 rounded-md bg-canvas object-cover" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm leading-[1.25] font-semibold text-ink">{product.name}</span>
              <span className="text-xs leading-[1.25] text-ink-muted">
                <span className="font-semibold text-ink tabular-nums">{formatRupiah(product.price)}</span>
                {` / ${product.unit} · isi ${product.pcs}`}
              </span>
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}
