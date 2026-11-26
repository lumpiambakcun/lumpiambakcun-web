import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleEditContent } from "@/components/admin/article-edit-content";
import { PageHeader } from "@/components/admin/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Ubah artikel" };

export const instant = false;

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <>
      <PageHeader title="Ubah artikel" />
      <Suspense fallback={<Skeleton className="h-[640px] rounded-md" />}>
        <ArticleEditContent params={params} />
      </Suspense>
    </>
  );
}
