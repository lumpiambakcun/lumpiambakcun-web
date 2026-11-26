import type { ProductRow } from "@/lib/products";

export type ProductChoices = { variants: string[]; categories: string[]; units: string[] };

const uniq = (...lists: string[][]) => [...new Set(lists.flat().filter(Boolean))];

export function productChoices(rows: readonly Pick<ProductRow, "variant" | "category" | "unit">[]): ProductChoices {
  return {
    variants: uniq(["Frozen", "Goreng"], rows.map((row) => row.variant)),
    categories: uniq(rows.map((row) => row.category)),
    units: uniq(["mika", "box", "pack"], rows.map((row) => row.unit)),
  };
}
