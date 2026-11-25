import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { formatRupiah } from "@/lib/currency";
import type { QuickOrderProduct } from "./quick-order-product-card";

type QuickOrderPanelProps = {
  product: QuickOrderProduct;
  qty: number;
  min: number;
  max: number;
  onChange: (qty: number) => void;
};

const stepButton =
  "flex size-11 items-center justify-center rounded-full bg-cream-tint text-ink transition-colors hover:bg-highlight disabled:opacity-40 disabled:hover:bg-cream-tint motion-reduce:transition-none";

export function QuickOrderPanel({ product, qty, min, max, onChange }: QuickOrderPanelProps) {
  const total = product.price * qty;
  const message = `Halo Mbak Cun, saya mau pesan ${qty} paket ${product.name} (isi ${product.pcs} per paket). Total ${formatRupiah(total)}. Mohon info ketersediaannya ya.`;

  return (
    <div className="flex flex-col gap-5 rounded-card border-[1.5px] border-cream-line bg-white p-6 shadow-card md:p-7">
      <h3 className="font-heading text-2xl leading-none font-bold text-ink">Pesananmu</h3>

      <div className="flex items-center gap-3.5">
        <Image
          src={product.image.src}
          alt=""
          width={56}
          height={56}
          className="size-14 shrink-0 rounded-[14px] object-cover"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-xs leading-none font-extrabold tracking-[0.08em] text-ink-muted uppercase">Paket</span>
          <span className="text-lg leading-[1.2] font-extrabold text-ink">{product.name}</span>
          <span className="text-sm text-ink-muted">
            {formatRupiah(product.price)} / {product.pcs} pcs
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-bold text-ink">Jumlah paket</span>
        <div className="flex items-center gap-1 rounded-full border-2 border-cream-line p-1">
          <button
            type="button"
            aria-label="Kurangi jumlah"
            className={stepButton}
            disabled={qty <= min}
            onClick={() => onChange(Math.max(min, qty - 1))}
          >
            <Minus aria-hidden="true" className="size-[18px]" strokeWidth={3} />
          </button>
          <span className="min-w-10 text-center text-xl font-extrabold text-ink tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label="Tambah jumlah"
            className={stepButton}
            disabled={qty >= max}
            onClick={() => onChange(Math.min(max, qty + 1))}
          >
            <Plus aria-hidden="true" className="size-[18px]" strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-3 border-t-2 border-dashed border-cream-line pt-4">
        <span className="text-[15px] font-bold text-ink">Total</span>
        <span className="font-heading text-[32px] leading-none font-bold text-brand tabular-nums">
          {formatRupiah(total)}
        </span>
      </div>
      <p className="-mt-3 text-right text-xs text-ink-muted">Belum termasuk ongkir</p>

      <WhatsAppButton message={message} className="h-14 w-full rounded-full text-base text-white normal-case">
        Beli via WhatsApp
      </WhatsAppButton>
    </div>
  );
}
