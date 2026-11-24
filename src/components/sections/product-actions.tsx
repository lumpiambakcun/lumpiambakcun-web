"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { bulkOrder } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;

type ProductActionsProps = {
  productId: string;
  purchasable: boolean;
  itemLabel: string;
  askMessage: string;
};

function StepButton({ label, children, ...props }: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <Button type="button" aria-label={label} variant="accent" className="size-11 rounded-[10px]" {...props}>
      {children}
    </Button>
  );
}

export function ProductActions({ productId, purchasable, itemLabel, askMessage }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const decrease = useCallback(() => setQuantity((value) => Math.max(MIN_QUANTITY, value - 1)), []);
  const bulk = quantity >= bulkOrder.minPacks;
  const increase = useCallback(() => setQuantity((value) => Math.min(MAX_QUANTITY, value + 1)), []);

  return (
    <div className="flex flex-col gap-3 pt-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center justify-between gap-3 md:w-[168px] md:shrink-0">
          <StepButton label="Kurangi jumlah" onClick={decrease} disabled={quantity <= MIN_QUANTITY}>
            <Minus aria-hidden="true" className="size-5" />
          </StepButton>
          <output aria-live="polite" aria-label="Jumlah" className="font-heading text-lg leading-none font-bold text-ink">
            {quantity}
          </output>
          <StepButton label="Tambah jumlah" onClick={increase} disabled={quantity >= MAX_QUANTITY}>
            <Plus aria-hidden="true" className="size-5" />
          </StepButton>
        </div>
        {bulk && purchasable ? (
          <p className="rounded-[10px] bg-cream px-4 py-2.5 text-[13px] leading-[1.28] font-semibold text-ink md:flex-1">
            Pesanan {bulkOrder.rule}
          </p>
        ) : (
          <Button asChild={purchasable} disabled={!purchasable} variant="brand" size="cta" className="h-11 w-full md:flex-1">
            {purchasable ? (
              <Link href={`/checkout?${new URLSearchParams({ produk: productId, jumlah: String(quantity) })}`} prefetch={false}>
                <ShoppingCart aria-hidden="true" />
                Beli sekarang
              </Link>
            ) : (
              <>
                <ShoppingCart aria-hidden="true" />
                Beli sekarang
              </>
            )}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <WhatsAppButton
          variant={bulk && purchasable ? "brand" : "accent"}
          message={`Halo Mbak Cun, saya mau pesan ${quantity} pack ${itemLabel}${bulk ? `, total ${quantity * bulkOrder.packSize} pcs` : ""}.`}
          className="h-11 w-full md:flex-1"
        >
          Pesan via WhatsApp
        </WhatsAppButton>
        <Button asChild variant="outline-ink" size="cta" className="h-11 w-full bg-white md:flex-1">
          <a href={whatsappUrl(askMessage)} target="_blank" rel="noopener noreferrer">
            Tanya dulu
          </a>
        </Button>
      </div>
    </div>
  );
}
