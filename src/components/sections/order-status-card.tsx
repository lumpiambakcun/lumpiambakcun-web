import { businessConfig } from "@/config/site";
import { orderStatusInfo } from "@/content/checkout";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime, maskPhone } from "@/lib/format";
import type { Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

type OrderStatusCardProps = {
  order: Pick<Order, "code" | "status" | "product_name" | "variant" | "quantity" | "total" | "customer_name" | "customer_phone" | "pickup_at">;
  actions: React.ReactNode;
};

const toneClass = {
  pending: "bg-highlight text-ink",
  paid: "bg-ink text-highlight",
  failed: "bg-brand text-white",
} as const;

export function OrderStatusCard({ order, actions }: OrderStatusCardProps) {
  const info = orderStatusInfo[order.status];
  const rows = [
    ["Kode pesanan", order.code],
    ["Pesanan", `${order.product_name} ${order.variant} · ${order.quantity} pack`],
    ["Total", formatRupiah(order.total)],
    ["Atas nama", `${order.customer_name.split(" ")[0]} (${maskPhone(order.customer_phone)})`],
    ["Ambil di tempat", formatPickupTime(order.pickup_at)],
    ["Alamat", businessConfig.address.fullLine],
  ];

  return (
    <article className="mx-auto flex max-w-[704px] flex-col gap-4 rounded-[20px] border border-border bg-white p-4 md:p-6">
      <p
        className={cn(
          "w-fit rounded-2xl px-5 py-[11px] font-heading text-xs leading-[1.15] font-semibold tracking-[0.04em] uppercase",
          toneClass[info.tone],
        )}
      >
        {info.label}
      </p>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading text-[22px] leading-[1.08] font-bold text-ink">{info.title}</h2>
        <p className="text-[15px] leading-[1.45] text-ink">{info.description}</p>
      </div>
      <dl className="flex flex-col gap-3 border-y border-border py-4">
        {rows.map(([term, detail]) => (
          <div key={term} className="flex flex-col gap-0.5 md:flex-row md:gap-4">
            <dt className="text-[11px] leading-[1.2] font-extrabold tracking-[0.08em] text-brand uppercase md:w-40 md:shrink-0 md:pt-0.5">
              {term}
            </dt>
            <dd className="text-[15px] leading-[1.32] text-ink">{detail}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-col gap-3">{actions}</div>
    </article>
  );
}
