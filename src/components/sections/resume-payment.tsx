"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { payWithSnap } from "@/lib/snap";

type ResumePaymentProps = {
  token: string;
};

export function ResumePayment({ token }: ResumePaymentProps) {
  const router = useRouter();
  const [notice, setNotice] = useState<string>();

  const pay = () => {
    setNotice(undefined);
    const refresh = () => router.refresh();
    const opened = payWithSnap(token, {
      onSuccess: refresh,
      onPending: refresh,
      onClose: () => setNotice("Pembayaran belum selesai."),
      onError: () => setNotice("Pembayaran gagal diproses. Coba lagi."),
    });
    if (!opened) setNotice("Jendela pembayaran belum siap. Tunggu sebentar lalu coba lagi.");
  };

  return (
    <>
      {notice && (
        <p role="alert" className="basis-full text-[13px] leading-[1.28] font-semibold text-brand">
          {notice}
        </p>
      )}
      <Button type="button" onClick={pay} size="lg" className="h-10 px-5 text-sm">
        Lanjutkan pembayaran
      </Button>
    </>
  );
}
