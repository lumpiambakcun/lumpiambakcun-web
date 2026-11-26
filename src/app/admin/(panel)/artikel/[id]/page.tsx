import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleEditContent } from "@/components/admin/article-edit-content";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Ubah artikel" };

export const instant = false;

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<Skeleton className="h-[640px] rounded-md" />}>
      <ArticleEditContent params={params} />
    </Suspense>
  );
}
