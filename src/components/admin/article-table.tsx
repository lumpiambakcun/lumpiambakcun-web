import { Newspaper } from "lucide-react";
import Image from "next/image";
import { ActiveBadge } from "@/components/admin/active-badge";
import { ArticleRowActions } from "@/components/admin/article-row-actions";
import { TableCard } from "@/components/admin/table-card";
import { actionCellClass, cellClass, TableHeadRow, TableSkeleton, type TableColumn } from "@/components/admin/table-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { listAllArticles } from "@/lib/admin-articles";
import { formatDay } from "@/lib/format";

type ArticleListItem = Awaited<ReturnType<typeof listAllArticles>>[number];

const artikel: TableColumn = {
  label: "Artikel",
  cellClassName: cellClass,
  skeleton: (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 shrink-0 rounded-md" />
      <div className="flex flex-col">
        <div className="flex h-5 items-center">
          <Skeleton className="h-3.5 w-56" />
        </div>
        <div className="flex h-4 items-center">
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  ),
};
const status: TableColumn = {
  label: "Status",
  cellClassName: cellClass,
  skeleton: (
    <div className="flex h-10 items-center">
      <Skeleton className="h-[22px] w-16 rounded-md" />
    </div>
  ),
};
const terbit: TableColumn = {
  label: "Terbit",
  cellClassName: cellClass,
  skeleton: (
    <div className="flex h-10 items-center">
      <Skeleton className="h-3.5 w-28" />
    </div>
  ),
};
const aksi: TableColumn = {
  label: "Aksi",
  hideLabel: true,
  headClassName: "w-12",
  cellClassName: actionCellClass,
  skeleton: <Skeleton className="size-8 rounded-lg" />,
};

const articleColumns = [artikel, status, terbit, aksi] as const;

export function ArticleTableSkeleton() {
  return <TableSkeleton label="Memuat artikel" columns={articleColumns} rows={5} />;
}

export function ArticleTable({ articles }: { articles: readonly ArticleListItem[] }) {
  return (
    <TableCard>
      {articles.length === 0 ? (
        <EmptyState icon={Newspaper} title="Belum ada artikel" description="Tulis artikel pertama. Artikel berstatus Terbit tampil di halaman Artikel." />
      ) : (
        <Table containerClassName="scroll-slim min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableHeadRow columns={articleColumns} />
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id} className="hover:bg-canvas">
                <TableCell className={`${artikel.cellClassName} whitespace-normal`}>
                  <div className="flex items-center gap-3">
                    {article.cover_url ? (
                      <Image src={article.cover_url} alt="" width={40} height={40} sizes="40px" className="size-10 shrink-0 rounded-md bg-canvas object-cover" />
                    ) : (
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-canvas text-ink-muted">
                        <Newspaper className="size-4" aria-hidden="true" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <div className="font-medium">{article.title}</div>
                      <div className="font-mono text-xs text-ink-muted">{article.slug}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={status.cellClassName}>
                  <ActiveBadge active={article.status === "published"} activeLabel="Terbit" inactiveLabel="Draf" />
                </TableCell>
                <TableCell className={`${terbit.cellClassName} text-ink-muted`}>{article.published_at ? formatDay(article.published_at) : "Belum terbit"}</TableCell>
                <TableCell className={aksi.cellClassName}>
                  <ArticleRowActions id={article.id} slug={article.slug} title={article.title} status={article.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableCard>
  );
}
