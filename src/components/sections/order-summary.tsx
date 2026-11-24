import Image from "next/image";
import { formatRupiah } from "@/lib/currency";

type OrderSummaryProps = {
  item: { name: string; variant: string; quantity: number; unit?: string; image: { src: string; alt: string }; lineTotal: number };
  actions: React.ReactNode;
  note?: string;
};

export function OrderSummary({ item, actions, note }: OrderSummaryProps) {
  return (
    <aside
      aria-labelledby="ringkasan-judul"
      className="flex flex-col gap-3.5 rounded-[20px] border border-border bg-white p-4 md:p-6"
    >
      <h2 id="ringkasan-judul" className="font-heading text-[22px] leading-[1.08] font-bold text-ink">
        Ringkasan pesanan
      </h2>
      <div className="flex items-center gap-3.5">
        <Image src={item.image.src} alt={item.image.alt} width={68} height={68} className="size-[68px] shrink-0 rounded-xl object-cover" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="font-heading text-base leading-[1.12] font-bold text-ink">{item.name}</p>
          <p className="text-[13px] leading-[1.28] text-ink">
            {item.variant} · {item.quantity} {item.unit ?? "pack"}
          </p>
        </div>
        <p className="font-heading text-base leading-[1.3] font-bold text-brand">{formatRupiah(item.lineTotal)}</p>
      </div>
      <hr className="border-border" />
      <p className="flex justify-between text-[15px] leading-[1.32] text-ink">
        <span>Subtotal</span>
        <span>{formatRupiah(item.lineTotal)}</span>
      </p>
      <hr className="border-border" />
      <p className="flex items-center justify-between text-ink">
        <span className="font-heading text-lg leading-[1.12] font-bold">Total</span>
        <span className="font-heading text-2xl leading-[1.3] font-bold text-brand">{formatRupiah(item.lineTotal)}</span>
      </p>
      <div className="flex flex-col gap-3">{actions}</div>
      {note && <p className="text-center text-[13px] leading-[1.28] text-ink-muted">{note}</p>}
    </aside>
  );
}
