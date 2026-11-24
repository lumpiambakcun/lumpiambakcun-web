import type { Metadata } from "next";
import { Suspense } from "react";
import { ManualOrderContent } from "@/components/admin/manual-order-content";

export const metadata: Metadata = { title: "Pesanan manual" };

export default function ManualOrderPage() {
  return (
    <div className="flex max-w-[720px] flex-col gap-4">
      <h1 className="font-heading text-[26px] leading-[1.08] font-bold">Pesanan manual</h1>
      <p className="text-sm text-ink-muted">Untuk pesanan lewat WhatsApp, tunai, atau transfer yang tidak lewat checkout.</p>
      <Suspense fallback={<div className="min-h-[420px]" />}>
        <ManualOrderContent />
      </Suspense>
    </div>
  );
}
