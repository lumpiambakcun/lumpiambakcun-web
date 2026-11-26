import type { Metadata } from "next";
import { ArticleForm } from "@/components/admin/article-form";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Tulis artikel" };

export default function NewArticlePage() {
  return (
    <>
      <PageHeader title="Tulis artikel" />
      <ArticleForm />
    </>
  );
}
