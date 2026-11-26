import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/article-form";

export const metadata: Metadata = { title: "Tulis artikel" };

export default function NewArticlePage() {
  return <ArticleForm />;
}
