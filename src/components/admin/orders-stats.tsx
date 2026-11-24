import { formatRupiah } from "@/lib/currency";
import { wibDate } from "@/lib/format";
import type { Order } from "@/lib/orders";

type OrdersStatsProps = {
  orders: readonly Order[];
  total: number;
};

export function OrdersStats({ orders, total }: OrdersStatsProps) {
  const today = wibDate(new Date());
  const stats = [
    { label: "Ambil hari ini", value: String(orders.filter((order) => wibDate(new Date(order.pickup_at)) === today).length) },
    { label: "Belum dibayar", value: String(orders.filter((order) => order.status === "pending").length) },
    { label: "Total lunas", value: formatRupiah(orders.reduce((sum, order) => sum + (order.status === "paid" ? order.total : 0), 0)) },
  ];

  return (
    <section aria-label="Ringkasan" className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-card px-3 py-2.5 shadow-card sm:px-4 sm:py-3">
            <p className="text-xs font-medium text-ink-muted">{label}</p>
            <p className="mt-1 font-mono text-base font-semibold tabular-nums sm:text-xl">{value}</p>
          </div>
        ))}
      </div>
      {orders.length < total && <p className="text-xs text-ink-muted">{`Dihitung dari ${orders.length} pesanan di halaman ini.`}</p>}
    </section>
  );
}
