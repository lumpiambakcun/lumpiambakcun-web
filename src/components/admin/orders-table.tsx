import Link from "next/link";
import { cancelOrder, markPaid } from "@/app/admin/(panel)/actions";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { paymentLabel } from "@/content/checkout";
import { packagingOf } from "@/content/menu";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime } from "@/lib/format";
import type { Order } from "@/lib/orders";

type OrdersTableProps = {
  orders: readonly Order[];
};

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return <p className="rounded-card border border-cream-line bg-white px-5 py-10 text-center text-sm text-ink-muted">Belum ada pesanan yang cocok.</p>;
  }

  return (
    <div className="rounded-card border border-cream-line bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">Kode</TableHead>
            <TableHead>Pemesan</TableHead>
            <TableHead>Pesanan</TableHead>
            <TableHead>Ambil</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="px-4">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="align-top">
              <TableCell className="px-4 py-3">
                <Link href={`/pesanan/${order.code}`} className="font-mono text-xs font-semibold tabular-nums hover:underline">
                  {order.code}
                </Link>
                {order.source === "manual" && (
                  <Badge variant="outline" className="mt-1 block text-[11px]">
                    Manual
                  </Badge>
                )}
              </TableCell>
              <TableCell className="py-3 whitespace-normal">
                <div className="font-semibold">{order.customer_name}</div>
                <a
                  href={`https://wa.me/${order.customer_phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-brand tabular-nums underline-offset-2 hover:underline"
                >
                  +{order.customer_phone}
                </a>
              </TableCell>
              <TableCell className="py-3 whitespace-normal">
                <div>{`${order.product_name} ${order.variant}`}</div>
                <div className="text-xs text-ink-muted">{`${order.quantity} ${packagingOf(order.variant)}`}</div>
                {order.notes && <div className="mt-1 max-w-48 text-xs text-ink-muted italic">{order.notes}</div>}
              </TableCell>
              <TableCell className="py-3 whitespace-normal">{formatPickupTime(order.pickup_at)}</TableCell>
              <TableCell className="py-3 text-right font-mono tabular-nums">{formatRupiah(order.total)}</TableCell>
              <TableCell className="py-3">
                <OrderStatusBadge status={order.status} />
                <div className="mt-1 text-xs text-ink-muted">{paymentLabel(order.payment_method)}</div>
              </TableCell>
              <TableCell className="px-4 py-3">
                {order.source === "manual" && order.status === "pending" && (
                  <div className="flex gap-1.5">
                    <form action={markPaid}>
                      <input type="hidden" name="kode" value={order.code} />
                      <Button type="submit" size="sm">
                        Tandai lunas
                      </Button>
                    </form>
                    <form action={cancelOrder}>
                      <input type="hidden" name="kode" value={order.code} />
                      <Button type="submit" size="sm" variant="outline">
                        Batalkan
                      </Button>
                    </form>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
