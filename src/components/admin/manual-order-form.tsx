"use client";

import { useState, useTransition } from "react";
import { addManualOrder } from "@/app/admin/(panel)/actions";
import { DatePicker } from "@/components/shared/date-picker";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { SelectField, type SelectOption } from "@/components/shared/select-field";
import { TimeSelect } from "@/components/shared/time-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ManualOrderState } from "@/lib/admin-orders";

type ManualOrderFormProps = {
  products: readonly SelectOption[];
  methods: readonly SelectOption[];
  hours: { opens: string; closes: string };
  today: string;
};

const statusOptions = [
  { value: "paid", label: "Lunas" },
  { value: "pending", label: "Belum bayar" },
];

export function ManualOrderForm({ products, methods, hours, today }: ManualOrderFormProps) {
  const [state, setState] = useState<ManualOrderState>({});
  const [pending, startTransition] = useTransition();
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  // Tanpa <form action>: React 19 mengosongkan semua field setelah aksi selesai, termasuk saat validasi gagal.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => setState(await addManualOrder(data)));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-3.5 rounded-[20px] border border-border bg-white p-4 md:grid-cols-2 md:p-6">
      <FormField id="produk" label="Produk" error={errors.produk}>
        <SelectField id="produk" name="produk" options={products} placeholder="Pilih produk" {...invalid("produk")} />
      </FormField>
      <FormField id="jumlah" label="Jumlah (mika atau box)" error={errors.jumlah}>
        <Input id="jumlah" name="jumlah" type="number" inputMode="numeric" min={1} max={99} defaultValue={1} className={fieldControlClass} {...invalid("jumlah")} />
      </FormField>
      <FormField id="nama" label="Nama pemesan" error={errors.nama}>
        <Input id="nama" name="nama" autoComplete="off" className={fieldControlClass} {...invalid("nama")} />
      </FormField>
      <FormField id="whatsapp" label="Nomor WhatsApp" error={errors.whatsapp}>
        <Input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="off" placeholder="08xx-xxxx-xxxx" className={fieldControlClass} {...invalid("whatsapp")} />
      </FormField>
      <FormField id="tanggal" label="Tanggal ambil" error={errors.tanggal}>
        <DatePicker id="tanggal" name="tanggal" defaultValue={today} {...invalid("tanggal")} />
      </FormField>
      <FormField id="jam" label="Jam ambil" error={errors.jam}>
        <TimeSelect id="jam" name="jam" opens={hours.opens} closes={hours.closes} {...invalid("jam")} />
      </FormField>
      <FormField id="metode" label="Metode bayar" error={errors.metode}>
        <SelectField id="metode" name="metode" options={methods} defaultValue={methods[0].value} {...invalid("metode")} />
      </FormField>
      <FormField id="status" label="Status pembayaran" error={errors.status}>
        <SelectField id="status" name="status" options={statusOptions} defaultValue="paid" {...invalid("status")} />
      </FormField>
      <FormField id="catatan" label="Catatan (opsional)" error={errors.catatan} className="md:col-span-2">
        <Input id="catatan" name="catatan" maxLength={200} className={fieldControlClass} {...invalid("catatan")} />
      </FormField>
      {state.message && (
        <p role="alert" className="rounded-lg bg-cream px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand md:col-span-2">
          {state.message}
        </p>
      )}
      <Button type="submit" variant="brand" size="cta" disabled={pending} className="h-[42px] md:col-span-2 md:w-fit">
        {pending ? "Menyimpan..." : "Simpan pesanan"}
      </Button>
    </form>
  );
}
