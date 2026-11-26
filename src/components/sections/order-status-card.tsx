import { businessConfig } from "@/config/site";
import { orderStages, orderStatusInfo } from "@/content/checkout";
import { formatRupiah } from "@/lib/currency";
import { formatPickupTime, maskPhone } from "@/lib/format";
import type { Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

type OrderStatusCardProps = {
  order: Pick<
    Order,
    "code" | "status" | "product_name" | "variant" | "unit" | "unit_price" | "quantity" | "total" | "customer_name" | "customer_phone" | "pickup_at"
  >;
  actions: React.ReactNode;
};

const dashed = "border-dashed border-ink/25";
const figure = "font-mono tabular-nums";
const tornEdge = "[mask:conic-gradient(from_-45deg_at_bottom,transparent,black_1deg_89deg,transparent_90deg)_50%/20px_100%]";

export function OrderStatusCard({ order, actions }: OrderStatusCardProps) {
  const info = orderStatusInfo[order.status];
  const stage = orderStages[order.status];

  return (
    <article aria-label={`Nota pesanan ${order.code}`} className="drop-shadow-md">
      <div className="bg-white px-5 pt-6 pb-5 md:px-6 md:pt-5 md:pb-4">
        <div className="grid gap-5 md:grid-cols-2 md:gap-0">
          <div className="flex flex-col gap-3.5 md:gap-2 md:pr-6">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 md:gap-y-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm leading-none text-ink-muted">Nomor pesanan</span>
                <span className={cn(figure, "text-[26px] leading-none font-bold tracking-tight text-ink sm:text-[34px] md:text-[38px]")}>{order.code}</span>
              </div>
              <p className="-rotate-3 border-4 border-double border-brand px-3 py-1 font-heading text-2xl leading-none text-brand uppercase mix-blend-multiply">
                {info.label}
              </p>
            </div>
            {stage && <p className={cn(figure, "mb-3 text-sm text-ink md:mb-3.5")}>{stage}</p>}
            <p className="text-[15px] leading-[1.45] md:leading-[1.35] text-ink">{info.description}</p>
            {stage && (
              <p className="text-[15px] leading-[1.45] md:leading-[1.35] text-ink">
                Ambil {formatPickupTime(order.pickup_at)} di{" "}
                <a
                  href={businessConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline decoration-ink/40 underline-offset-2 hover:text-brand"
                >
                  {businessConfig.address.fullLine}
                </a>
                .
              </p>
            )}
          </div>

          <section aria-label="Rincian pesanan" className={cn("flex flex-col gap-3 border-t pt-5 md:gap-2 md:border-t-0 md:border-l md:pt-0 md:pl-6", dashed)}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="text-base leading-[1.25] font-bold text-ink">
                  {order.product_name} {order.variant}
                </p>
                <p className={cn(figure, "text-sm text-ink-muted")}>
                  {order.quantity} {order.unit} × {formatRupiah(order.unit_price)}
                </p>
              </div>
              <p className={cn(figure, "text-base text-ink")}>{formatRupiah(order.total)}</p>
            </div>
            <div className={cn("flex flex-col gap-3 border-t pt-3 md:gap-2 md:pt-2", dashed)}>
              <p className="flex justify-between gap-4 text-[15px] text-ink">
                <span>Subtotal</span>
                <span className={figure}>{formatRupiah(order.total)}</span>
              </p>
              <p className={cn("flex items-baseline justify-between gap-4 border-t pt-3 text-ink md:pt-2", dashed)}>
                <span className="font-heading text-xl leading-none font-bold">Total</span>
                <span className={cn(figure, "text-[28px] leading-none font-bold")}>{formatRupiah(order.total)}</span>
              </p>
            </div>
            <p className="flex justify-between gap-4 text-sm text-ink-muted">
              <span>Atas nama</span>
              <span className="text-right text-ink">
                {order.customer_name.split(" ")[0]} ({maskPhone(order.customer_phone)})
              </span>
            </p>
          </section>
        </div>

        <div className={cn("mt-5 flex flex-wrap items-center gap-3 border-t pt-4 md:mt-3.5 md:gap-2 md:pt-3", dashed)}>{actions}</div>
      </div>
      <div aria-hidden="true" className={cn("h-3 bg-white", tornEdge)} />
    </article>
  );
}
