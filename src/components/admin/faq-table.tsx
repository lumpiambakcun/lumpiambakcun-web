import { MessageCircleQuestion } from "lucide-react";
import { ActiveBadge } from "@/components/admin/active-badge";
import { FaqRowActions } from "@/components/admin/faq-row-actions";
import { TableCard } from "@/components/admin/table-card";
import { actionCellClass, cellClass, SkeletonLines, TableHeadRow, TableSkeleton, type TableColumn } from "@/components/admin/table-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import type { FaqRow } from "@/lib/faqs";

const pertanyaan: TableColumn = { label: "Pertanyaan", cellClassName: cellClass, skeleton: <SkeletonLines widths={["w-64", "w-96 max-w-full"]} /> };
const status: TableColumn = {
  label: "Status",
  cellClassName: cellClass,
  skeleton: <Skeleton className="h-[22px] w-16 rounded-md" />,
};
const aksi: TableColumn = {
  label: "Aksi",
  hideLabel: true,
  headClassName: "w-48",
  cellClassName: actionCellClass,
  skeleton: (
    <div className="flex justify-end gap-0.5">
      {[0, 1, 2, 3].map((item) => (
        <Skeleton key={item} className="size-8 rounded-lg" />
      ))}
    </div>
  ),
};

const faqColumns = [pertanyaan, status, aksi] as const;

export function FaqTableSkeleton() {
  return <TableSkeleton label="Memuat FAQ" columns={faqColumns} rows={4} />;
}

export function FaqTable({ faqs }: { faqs: readonly FaqRow[] }) {
  return (
    <TableCard>
      {faqs.length === 0 ? (
        <EmptyState icon={MessageCircleQuestion} title="Belum ada FAQ" description="Tambah pertanyaan yang sering ditanyakan pelanggan. Hasilnya tampil di beranda." />
      ) : (
        <Table containerClassName="scroll-slim min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableHeadRow columns={faqColumns} />
          </TableHeader>
          <TableBody>
            {faqs.map((faq, index) => (
              <TableRow key={faq.id} className="align-top hover:bg-canvas">
                <TableCell className={`${pertanyaan.cellClassName} whitespace-normal`}>
                  <div className="font-medium">{faq.question}</div>
                  <div className="line-clamp-2 max-w-xl text-xs text-ink-muted">{faq.answer}</div>
                </TableCell>
                <TableCell className={status.cellClassName}>
                  <ActiveBadge active={faq.active} />
                </TableCell>
                <TableCell className={aksi.cellClassName}>
                  <FaqRowActions faq={faq} isFirst={index === 0} isLast={index === faqs.length - 1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableCard>
  );
}
