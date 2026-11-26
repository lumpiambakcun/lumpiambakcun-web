import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import type { MenuCategory, MenuProduct } from "@/components/sections/menu-browser";
import type { QuickOrderProduct } from "@/components/sections/quick-order-product-card";
import { formatRupiah } from "@/lib/currency";
import { slugify } from "@/lib/slug";
import { createAdminClient } from "@/lib/supabase/admin";

export type ProductRow = {
  id: string;
  category: string;
  variant: string;
  name: string;
  description: string;
  ingredients: string;
  chili: boolean;
  price: number;
  unit: string;
  pcs: number;
  summary: string;
  image_url: string;
  active: boolean;
  sort: number;
};

export const PRODUCTS_TAG = "products";

export const categorySlug = slugify;

const blurb = ({ summary, pcs, unit }: ProductRow) => summary || `Isi ${pcs} pcs per ${unit}.`;

function toMenuProduct(row: ProductRow): MenuProduct {
  return {
    id: row.id,
    category: categorySlug(row.category),
    detail: { description: row.description, ingredients: row.ingredients, chili: row.chili },
    pack: { unit: row.unit, pcs: row.pcs },
    card: {
      href: `/menu/${row.id}`,
      variant: row.variant,
      name: row.name,
      description: blurb(row),
      price: formatRupiah(row.price),
      unit: `/ ${row.unit}`,
      image: { src: row.image_url, alt: `${row.name} ${row.variant.toLowerCase()}` },
      whatsappMessage: `Halo Mbak Cun, saya mau pesan ${row.name} ${row.variant} (isi ${row.pcs}).`,
    },
  };
}

async function fetchActiveRows() {
  "use cache";
  cacheTag(PRODUCTS_TAG);
  cacheLife("max");
  const { data, error } = await createAdminClient().from("products").select("*").eq("active", true).order("sort").order("id");
  if (error) throw new Error(`fetchActiveRows: ${error.message}`);
  return data as ProductRow[];
}

export async function listProducts() {
  return (await fetchActiveRows()).map(toMenuProduct);
}

export async function getProduct(id: string) {
  return (await listProducts()).find((product) => product.id === id);
}

export async function listCategories() {
  const seen = new Map<string, MenuCategory>();
  for (const { category } of await fetchActiveRows()) {
    const id = categorySlug(category);
    if (!seen.has(id)) seen.set(id, { id, label: category });
  }
  return [...seen.values()];
}

export async function getVariants(category: string) {
  return (await listProducts()).filter((product) => product.category === category);
}

export async function getRelated(id: string, count = 4) {
  const products = await listProducts();
  const category = products.find((product) => product.id === id)?.category;
  const others = products.filter((product) => product.id !== id);
  return [...others.filter((p) => p.category === category), ...others.filter((p) => p.category !== category)].slice(0, count);
}

export async function listQuickOrder(): Promise<QuickOrderProduct[]> {
  return (await fetchActiveRows())
    .map((row) => {
      const name = `${row.name} ${row.variant === "Frozen" ? "Mentah" : row.variant}`;
      return {
        id: row.id,
        name,
        description: blurb(row),
        price: row.price,
        unit: `/ ${row.unit}`,
        pcs: row.pcs,
        image: { src: row.image_url, alt: `${name}, isi ${row.pcs} pcs` },
      };
    });
}

export async function getPurchasable(productId: unknown) {
  const row = typeof productId === "string" ? (await fetchActiveRows()).find((item) => item.id === productId) : undefined;
  return row ? { product: toMenuProduct(row), unitPrice: row.price } : null;
}
