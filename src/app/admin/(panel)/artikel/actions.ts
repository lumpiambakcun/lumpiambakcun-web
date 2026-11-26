"use server";

import { revalidatePath, updateTag } from "next/cache";
import { deleteArticle, saveArticle, setArticleStatus } from "@/lib/admin-articles";
import { requireAdmin } from "@/lib/admin-auth";
import { ARTICLES_TAG, type ArticleRow } from "@/lib/articles";
import type { CmsState } from "@/lib/cms";

function refresh() {
  updateTag(ARTICLES_TAG);
  revalidatePath("/admin/artikel");
}

export async function saveArticleAction(formData: FormData): Promise<CmsState> {
  await requireAdmin();
  const result = await saveArticle(formData);
  if (result.ok) refresh();
  return result;
}

export async function setArticleStatusAction(id: string, status: ArticleRow["status"]) {
  await requireAdmin();
  await setArticleStatus(id, status);
  refresh();
}

export async function deleteArticleAction(id: string) {
  await requireAdmin();
  await deleteArticle(id);
  refresh();
}
