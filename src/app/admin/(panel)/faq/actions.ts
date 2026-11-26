"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteFaq, reorderFaqs, saveFaq } from "@/lib/admin-faqs";
import type { CmsState } from "@/lib/cms";
import { FAQS_TAG } from "@/lib/faqs";

function refresh() {
  updateTag(FAQS_TAG);
  revalidatePath("/admin/faq");
}

export async function saveFaqAction(formData: FormData): Promise<CmsState> {
  await requireAdmin();
  const result = await saveFaq(formData);
  if (result.ok) refresh();
  return result;
}

export async function deleteFaqAction(id: string) {
  await requireAdmin();
  await deleteFaq(id);
  refresh();
}

export async function reorderFaqAction(ids: string[]) {
  await requireAdmin();
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== "string")) return;
  await reorderFaqs(ids);
  refresh();
}
