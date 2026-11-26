"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { saveFooter } from "@/lib/admin-site-settings";
import type { CmsState } from "@/lib/cms";
import { SITE_SETTINGS_TAG } from "@/lib/site-settings";

export async function saveFooterAction(formData: FormData): Promise<CmsState> {
  await requireAdmin();
  const result = await saveFooter(formData);
  if (result.ok) {
    updateTag(SITE_SETTINGS_TAG);
    revalidatePath("/", "layout");
  }
  return result;
}
