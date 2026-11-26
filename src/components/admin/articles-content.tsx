import { connection } from "next/server";
import { ArticleTable } from "@/components/admin/article-table";
import { listAllArticles } from "@/lib/admin-articles";
import { requireAdmin } from "@/lib/admin-auth";

export async function ArticlesContent() {
  await connection();
  await requireAdmin();
  return <ArticleTable articles={await listAllArticles()} />;
}
