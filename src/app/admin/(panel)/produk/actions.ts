"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteProduct, saveProduct, setProductActive } from "@/lib/admin-products";
import type { CmsState } from "@/lib/cms";
import { PRODUCTS_TAG } from "@/lib/products";

function refresh() {
  updateTag(PRODUCTS_TAG);
  revalidatePath("/admin/produk");
}

export async function saveProductAction(formData: FormData): Promise<CmsState> {
  await requireAdmin();
  const result = await saveProduct(formData);
  if (result.ok) refresh();
  return result;
}

export async function deleteProductAction(id: string) {
  await requireAdmin();
  await deleteProduct(id);
  refresh();
}

export async function setProductActiveAction(id: string, active: boolean) {
  await requireAdmin();
  await setProductActive(id, active);
  refresh();
}
