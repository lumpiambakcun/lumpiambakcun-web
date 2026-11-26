"use server";

import { revalidatePath, updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { saveHeader } from "@/lib/admin-site-settings";
import type { CmsState } from "@/lib/cms";
import { SITE_SETTINGS_TAG } from "@/lib/site-settings";

export async function saveHeaderAction(formData: FormData): Promise<CmsState> {
  await requireAdmin();
  const result = await saveHeader(formData);
  if (result.ok) {
    updateTag(SITE_SETTINGS_TAG);
    revalidatePath("/", "layout");
  }
  return result;
}
