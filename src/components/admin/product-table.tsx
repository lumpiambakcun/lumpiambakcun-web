import { PackageOpen } from "lucide-react";
import Image from "next/image";
import { ActiveBadge } from "@/components/admin/active-badge";
import { productChoices } from "@/lib/product-options";
import { ProductRowActions } from "@/components/admin/product-row-actions";
import { TableCard } from "@/components/admin/table-card";
import { actionCellClass, cellClass, TableHeadRow, TableSkeleton, type TableColumn } from "@/components/admin/table-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/lib/currency";
import type { ProductRow } from "@/lib/products";

const produk: TableColumn = {
  label: "Produk",
  cellClassName: cellClass,
  skeleton: (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 shrink-0 rounded-md" />
      <div className="flex flex-col">
        <div className="flex h-5 items-center">
          <Skeleton className="h-3.5 w-32" />
        </div>
        <div className="flex h-4 items-center">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  ),
};
const kategori: TableColumn = {
  label: "Kategori",
  cellClassName: cellClass,
  skeleton: (
    <div className="flex h-10 items-center">
      <Skeleton className="h-3.5 w-16" />
    </div>
  ),
};
const harga: TableColumn = {
  label: "Harga",
  headClassName: "text-right",
  cellClassName: `${cellClass} text-right`,
  skeleton: (
    <div className="flex h-10 items-center justify-end">
      <Skeleton className="h-3.5 w-24" />
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
const aksi: TableColumn = {
  label: "Aksi",
  hideLabel: true,
  headClassName: "w-12",
  cellClassName: actionCellClass,
  skeleton: <Skeleton className="size-8 rounded-lg" />,
};

const productColumns = [produk, kategori, harga, status, aksi] as const;

export function ProductTableSkeleton() {
  return <TableSkeleton label="Memuat produk" columns={productColumns} rows={2} />;
}

export function ProductTable({ products }: { products: readonly ProductRow[] }) {
  const choices = productChoices(products);
  return (
    <TableCard>
      {products.length === 0 ? (
        <EmptyState icon={PackageOpen} title="Belum ada produk" description="Tambah produk pertama. Produk aktif bisa dipesan lewat checkout dan pesanan manual." />
      ) : (
        <Table containerClassName="scroll-slim min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableHeadRow columns={productColumns} />
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/50">
                <TableCell className={`${produk.cellClassName} whitespace-normal`}>
                  <div className="flex items-center gap-3">
                    <Image src={product.image_url} alt="" width={40} height={40} sizes="40px" className="size-10 shrink-0 rounded-md bg-canvas object-cover" />
                    <div>
                      <div className="font-medium">{`${product.name} ${product.variant}`}</div>
                      <div className="font-mono text-xs text-ink-muted">{product.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className={kategori.cellClassName}>{product.category}</TableCell>
                <TableCell className={`${harga.cellClassName} tabular-nums`}>
                  {formatRupiah(product.price)}
                  <span className="text-xs text-ink-muted">{` / ${product.unit}`}</span>
                </TableCell>
                <TableCell className={status.cellClassName}>
                  <ActiveBadge active={product.active} />
                </TableCell>
                <TableCell className={aksi.cellClassName}>
                  <ProductRowActions product={product} choices={choices} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableCard>
  );
}
