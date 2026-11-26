import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleTableSkeleton } from "@/components/admin/article-table";
import { ArticlesContent } from "@/components/admin/articles-content";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Artikel" };

export default function AdminArticlesPage() {
  return (
    <>
      <PageHeader
        title="Artikel"
        actions={
          <Button asChild className="h-10 px-4">
            <Link href="/admin/artikel/baru">
              <Plus data-icon="inline-start" aria-hidden="true" />
              Tulis artikel
            </Link>
          </Button>
        }
      />
      <Suspense fallback={<ArticleTableSkeleton />}>
        <ArticlesContent />
      </Suspense>
    </>
  );
}
