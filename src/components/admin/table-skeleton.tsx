import { TableCard, tableHeadClass } from "@/components/admin/table-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type TableColumn = {
  label: string;
  hideLabel?: boolean;
  headClassName?: string;
  cellClassName: string;
  skeleton: React.ReactNode;
};

export const cellClass = "px-3 py-2.5";
export const actionCellClass = "px-2 py-2";

export function SkeletonLines({ widths }: { widths: readonly string[] }) {
  return (
    <>
      {widths.map((width, index) => (
        <div key={index} className={cn("flex items-center", index === 0 ? "h-5" : "h-4")}>
          <Skeleton className={cn(index === 0 ? "h-3.5" : "h-3", width)} />
        </div>
      ))}
    </>
  );
}

type TableHeadRowProps = { columns: readonly TableColumn[] };

export function TableHeadRow({ columns }: TableHeadRowProps) {
  return (
    <TableRow className="border-0 hover:bg-transparent">
      {columns.map(({ label, hideLabel, headClassName }) => (
        <TableHead key={label} className={cn(tableHeadClass, headClassName)}>
          {hideLabel ? <span className="sr-only">{label}</span> : label}
        </TableHead>
      ))}
    </TableRow>
  );
}

type TableSkeletonProps = {
  label: string;
  columns: readonly TableColumn[];
  rows?: number;
  footer?: React.ReactNode;
};

export function TableSkeleton({ label, columns, rows = 6, footer }: TableSkeletonProps) {
  return (
    <TableCard footer={footer}>
      <div aria-busy="true" aria-label={label} className="flex min-h-0 flex-1 flex-col">
        <Table containerClassName="min-h-0 flex-1 overflow-hidden">
          <TableHeader>
            <TableHeadRow columns={columns} />
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }, (_, row) => (
              <TableRow key={row} className="align-top hover:bg-transparent">
                {columns.map(({ label: column, cellClassName, skeleton }) => (
                  <TableCell key={column} className={cn(cellClassName, "whitespace-normal")}>
                    {skeleton}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableCard>
  );
}
