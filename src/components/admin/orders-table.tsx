import { SearchX } from "lucide-react";
import Link from "next/link";
import { OrderRowActions } from "@/components/admin/order-row-actions";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { paymentLabel } from "@/content/checkout";
import { packagingOf } from "@/content/menu";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime } from "@/lib/format";
import type { Order } from "@/lib/orders";

type OrdersTableProps = {
  orders: readonly Order[];
  filtered: boolean;
};

const head = "sticky top-0 z-10 h-10 bg-card px-3 text-xs font-semibold text-ink-muted shadow-[inset_0_-1px_0_var(--border)]";

export function OrdersTable({ orders, filtered }: OrdersTableProps) {
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
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
        <Table containerClassName="min-h-0 flex-1 overflow-auto">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className={head}>Kode</TableHead>
              <TableHead className={head}>Pemesan</TableHead>
              <TableHead className={head}>Pesanan</TableHead>
              <TableHead className={head}>Ambil</TableHead>
              <TableHead className={`${head} text-right`}>Total</TableHead>
              <TableHead className={head}>Status</TableHead>
              <TableHead className={`${head} w-12`}>
                <span className="sr-only">Aksi</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="align-top hover:bg-canvas">
                <TableCell className="px-3 py-2.5">
                  <Link href={`/pesanan/${order.code}`} target="_blank" className="font-mono text-xs font-medium tabular-nums hover:underline">
                    {order.code}
                  </Link>
                  {order.source === "manual" && <div className="mt-1 text-[11px] font-medium text-ink-muted">Manual</div>}
                </TableCell>
                <TableCell className="px-3 py-2.5 whitespace-normal">
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
                <TableCell className="px-3 py-2.5 whitespace-normal">
                  <div>{`${order.product_name} ${order.variant}`}</div>
                  <div className="text-xs text-ink-muted">{`${order.quantity} ${packagingOf(order.variant)}`}</div>
                  {order.notes && <div className="mt-1 max-w-48 text-xs text-ink-muted italic">{order.notes}</div>}
                </TableCell>
                <TableCell className="px-3 py-2.5 whitespace-normal">{formatPickupTime(order.pickup_at)}</TableCell>
                <TableCell className="px-3 py-2.5 text-right font-mono tabular-nums">{formatRupiah(order.total)}</TableCell>
                <TableCell className="px-3 py-2.5">
                  <OrderStatusBadge status={order.status} />
                  <div className="mt-1 text-xs text-ink-muted">{paymentLabel(order.payment_method)}</div>
                </TableCell>
                <TableCell className="px-2 py-2">
                  <OrderRowActions code={order.code} phone={order.customer_phone} canChangeStatus={order.source === "manual" && order.status === "pending"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
