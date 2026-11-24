"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { createOrder, type CheckoutState } from "@/app/(site)/checkout/actions";
import { CheckoutCard } from "@/components/sections/checkout-card";
import { OrderSummary } from "@/components/sections/order-summary";
import { PaymentMethodOptions } from "@/components/sections/payment-method-options";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { payWithSnap } from "@/lib/snap";
import { cn } from "@/lib/utils";

type CheckoutFormProps = {
  productId: string;
  summary: React.ComponentProps<typeof OrderSummary>["item"];
  paymentMethods: React.ComponentProps<typeof PaymentMethodOptions>["options"];
  pickup: { address: string; minDate: string; opens: string; closes: string };
  whatsappMessage: string;
  note: string;
};

const FORM_ID = "checkout-form";

export function CheckoutForm({ productId, summary, paymentMethods, pickup, whatsappMessage, note }: CheckoutFormProps) {
  const router = useRouter();
  const [state, setState] = useState<CheckoutState>({});
  const [notice, setNotice] = useState<string>();
  const [pending, startTransition] = useTransition();
  const { errors = {}, order } = state;

  const pay = useCallback(
    (target: { code: string; token: string }) => {
      const finish = () => router.push(`/pesanan/${target.code}`);
      const opened = payWithSnap(target.token, {
        onSuccess: finish,
        onPending: finish,
        onClose: () => setNotice("Pembayaran belum selesai. Pesananmu sudah tersimpan, klik Bayar sekarang untuk melanjutkan."),
        onError: () => setNotice("Pembayaran gagal diproses. Coba lagi."),
      });
      if (!opened) setNotice("Jendela pembayaran belum siap. Tunggu sebentar lalu klik Bayar sekarang.");
    },
    [router],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(undefined);
    if (order) return pay(order);
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await createOrder(data);
      setState(result);
      setNotice(result.message ?? result.errors?.produk);
      if (result.order) pay(result.order);
    });
  };

  const invalid = (field: keyof typeof errors) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `${field}-error` } : {};

  return (
    <div className="grid gap-3 md:gap-4 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start lg:gap-8">
      <form id={FORM_ID} onSubmit={handleSubmit} noValidate>
        <input type="hidden" name="produk" value={productId} />
        <input type="hidden" name="jumlah" value={summary.quantity} />
        <fieldset disabled={Boolean(order) || pending} className="flex min-w-0 flex-col gap-4 disabled:opacity-80">
          <CheckoutCard number={1} title="Data pemesan">
            <div className="grid gap-3.5 md:grid-cols-2">
              <FormField id="nama" label="Nama lengkap" error={errors.nama}>
                <Input id="nama" name="nama" autoComplete="name" placeholder="Nama kamu" className={fieldControlClass} {...invalid("nama")} />
              </FormField>
              <FormField id="whatsapp" label="Nomor WhatsApp" error={errors.whatsapp}>
                <Input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="08xx-xxxx-xxxx" className={fieldControlClass} {...invalid("whatsapp")} />
              </FormField>
              <FormField id="email" label="Email (opsional)" error={errors.email} className="md:col-span-2">
                <Input id="email" name="email" type="email" autoComplete="email" placeholder="nama@email.com" className={fieldControlClass} {...invalid("email")} />
              </FormField>
            </div>
          </CheckoutCard>
          <CheckoutCard number={2} title="Pengambilan">
            <p className="w-fit rounded-2xl bg-highlight px-5 py-3 font-heading text-xs leading-[1.15] font-semibold tracking-[0.04em] text-ink uppercase">
              Ambil di tempat
            </p>
            <p className="rounded-[14px] bg-cream px-4 py-3.5 text-[13px] leading-[1.28] text-ink">{pickup.address}</p>
            <div className="grid gap-3.5 md:grid-cols-2">
              <FormField id="tanggal" label="Tanggal ambil" error={errors.tanggal}>
                <Input id="tanggal" name="tanggal" type="date" min={pickup.minDate} className={cn(fieldControlClass, "justify-start")} {...invalid("tanggal")} />
              </FormField>
              <FormField id="jam" label="Jam ambil" error={errors.jam}>
                <Input id="jam" name="jam" type="time" min={pickup.opens} max={pickup.closes} className={cn(fieldControlClass, "justify-start")} {...invalid("jam")} />
              </FormField>
              <FormField id="catatan" label="Catatan (opsional)" error={errors.catatan} className="md:col-span-2">
                <Input id="catatan" name="catatan" maxLength={200} placeholder="Contoh: pisahkan cabai rawit" className={fieldControlClass} {...invalid("catatan")} />
              </FormField>
            </div>
          </CheckoutCard>
          <CheckoutCard number={3} title="Metode pembayaran">
            <PaymentMethodOptions name="metode" options={paymentMethods} defaultValue={paymentMethods[0].id} error={errors.metode} />
          </CheckoutCard>
        </fieldset>
      </form>
      <OrderSummary
        item={summary}
        note={note}
        actions={
          <>
            {notice && (
              <p role="alert" className="rounded-lg bg-cream px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand">
                {notice}
              </p>
            )}
            <Button type="submit" form={FORM_ID} variant="brand" size="cta" loading={pending} className="h-[42px] w-full">
              Bayar sekarang
            </Button>
            <WhatsAppButton variant="outline-ink" message={whatsappMessage} className="h-11 w-full bg-white">
              Pesan via WhatsApp
            </WhatsAppButton>
          </>
        }
      />
    </div>
  );
}
