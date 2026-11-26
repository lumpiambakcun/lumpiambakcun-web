import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArticleForm } from "@/components/admin/article-form";
import { getArticleById } from "@/lib/admin-articles";
import { requireAdmin } from "@/lib/admin-auth";

export async function ArticleEditContent({ params }: { params: Promise<{ id: string }> }) {
  await connection();
  await requireAdmin();
  const article = await getArticleById((await params).id);
  if (!article) notFound();
  return <ArticleForm article={article} />;
}
