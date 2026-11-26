import { SearchX } from "lucide-react";
import Link from "next/link";
import { OrderRowActions } from "@/components/admin/order-row-actions";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { TableCard } from "@/components/admin/table-card";
import { actionCellClass, cellClass, SkeletonLines, TableHeadRow, TableSkeleton, type TableColumn } from "@/components/admin/table-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { paymentLabel } from "@/content/checkout";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime } from "@/lib/format";
import type { Order } from "@/lib/orders";

const kode: TableColumn = { label: "Kode", cellClassName: cellClass, skeleton: <SkeletonLines widths={["w-24"]} /> };
const pemesan: TableColumn = { label: "Pemesan", cellClassName: cellClass, skeleton: <SkeletonLines widths={["w-32", "w-28"]} /> };
const pesanan: TableColumn = { label: "Pesanan", cellClassName: cellClass, skeleton: <SkeletonLines widths={["w-36", "w-16"]} /> };
const ambil: TableColumn = { label: "Ambil", cellClassName: cellClass, skeleton: <SkeletonLines widths={["w-28"]} /> };
const total: TableColumn = {
  label: "Total",
  headClassName: "text-right",
  cellClassName: `${cellClass} text-right`,
  skeleton: (
    <div className="flex h-5 items-center justify-end">
      <Skeleton className="h-3.5 w-20" />
    </div>
  ),
};
const status: TableColumn = {
  label: "Status",
  cellClassName: cellClass,
  skeleton: (
    <>
      <Skeleton className="h-[22px] w-20 rounded-md" />
      <div className="mt-1 flex h-4 items-center">
        <Skeleton className="h-3 w-14" />
      </div>
    </>
  ),
};
const aksi: TableColumn = {
  label: "Aksi",
  hideLabel: true,
  headClassName: "w-12",
  cellClassName: actionCellClass,
  skeleton: <Skeleton className="size-8 rounded-lg" />,
};

export const ordersColumns = [kode, pemesan, pesanan, ambil, total, status, aksi] as const;

export function OrdersTableSkeleton({ footer }: { footer?: React.ReactNode }) {
  return <TableSkeleton label="Memuat pesanan" columns={ordersColumns} rows={8} footer={footer} />;
}

type OrdersTableProps = {
  orders: readonly Order[];
  filtered: boolean;
  footer?: React.ReactNode;
};

export function OrdersTable({ orders, filtered, footer }: OrdersTableProps) {
  return (
    <TableCard footer={orders.length > 0 ? footer : undefined}>
      {orders.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title={filtered ? "Tidak ada pesanan yang cocok" : "Belum ada pesanan"}
          description={filtered ? "Coba kata kunci lain atau longgarkan filter." : "Pesanan dari checkout dan yang Anda tambah manual akan muncul di sini."}
          action={
            filtered && (
              <Button asChild variant="outline" size="lg">
                <Link href="/admin">Reset filter</Link>
              </Button>
            )
          }
        />
      ) : (
        <Table containerClassName="scroll-slim min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableHeadRow columns={ordersColumns} />
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="align-top hover:bg-muted/50">
                <TableCell className={kode.cellClassName}>
                  <Link href={`/pesanan/${order.code}`} target="_blank" className="font-mono text-xs font-medium tabular-nums hover:underline">
                    {order.code}
                  </Link>
                  {order.source === "manual" && <div className="mt-1 text-[11px] font-medium text-ink-muted">Manual</div>}
                </TableCell>
                <TableCell className={`${pemesan.cellClassName} whitespace-normal`}>
                  <div className="font-medium">{order.customer_name}</div>
                  <a
                    href={`https://wa.me/${order.customer_phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-ink-muted tabular-nums underline-offset-2 hover:text-ink hover:underline"
                  >
                    {`+${order.customer_phone}`}
                  </a>
                </TableCell>
                <TableCell className={`${pesanan.cellClassName} whitespace-normal`}>
                  <div>{`${order.product_name} ${order.variant}`}</div>
                  <div className="text-xs text-ink-muted">{`${order.quantity} ${order.unit}`}</div>
                  {order.notes && <div className="mt-1 max-w-48 text-xs text-ink-muted italic">{order.notes}</div>}
                </TableCell>
                <TableCell className={`${ambil.cellClassName} whitespace-normal`}>{formatPickupTime(order.pickup_at)}</TableCell>
                <TableCell className={`${total.cellClassName} tabular-nums`}>{formatRupiah(order.total)}</TableCell>
                <TableCell className={status.cellClassName}>
                  <OrderStatusBadge status={order.status} />
                  <div className="mt-1 text-xs text-ink-muted">{paymentLabel(order.payment_method)}</div>
                </TableCell>
                <TableCell className={aksi.cellClassName}>
                  <OrderRowActions code={order.code} phone={order.customer_phone} canChangeStatus={order.source === "manual" && order.status === "pending"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableCard>
  );
}
