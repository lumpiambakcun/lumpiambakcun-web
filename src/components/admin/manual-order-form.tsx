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
import { formatRupiah } from "@/lib/currency";

export type ProductOption = SelectOption & { price: number };

type ManualOrderFormProps = {
  products: readonly ProductOption[];
  methods: readonly SelectOption[];
  hours: { opens: string; closes: string };
  today: string;
  onSaved: (code: string) => void;
  onCancel: () => void;
};

const statusOptions = [
  { value: "paid", label: "Lunas" },
  { value: "pending", label: "Belum bayar" },
];

export function ManualOrderForm({ products, methods, hours, today, onSaved, onCancel }: ManualOrderFormProps) {
  const [state, setState] = useState<ManualOrderState>({});
  const [pending, startTransition] = useTransition();
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const unitPrice = products.find((product) => product.value === productId)?.price ?? 0;
  const count = Number.parseInt(quantity, 10);
  const total = unitPrice > 0 && count > 0 ? unitPrice * count : 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await addManualOrder(data);
      if (result.code) onSaved(result.code);
      else setState(result);
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-x-4 gap-y-3.5 sm:grid-cols-2">
      <FormField id="produk" label="Produk" error={errors.produk} tone="admin" className="sm:col-span-2">
        <SelectField id="produk" name="produk" options={products} placeholder="Pilih produk" onValueChange={setProductId} {...invalid("produk")} />
      </FormField>
      <FormField id="nama" label="Nama pemesan" error={errors.nama} tone="admin">
        <Input id="nama" name="nama" autoComplete="off" className={fieldControlClass} {...invalid("nama")} />
      </FormField>
      <FormField id="whatsapp" label="Nomor WhatsApp" error={errors.whatsapp} tone="admin">
        <Input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="off" placeholder="08xx-xxxx-xxxx" className={fieldControlClass} {...invalid("whatsapp")} />
      </FormField>
      <FormField id="jumlah" label="Jumlah (mika atau box)" error={errors.jumlah} tone="admin">
        <Input
          id="jumlah"
          name="jumlah"
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className={fieldControlClass}
          {...invalid("jumlah")}
        />
      </FormField>
      <FormField id="metode" label="Metode bayar" error={errors.metode} tone="admin">
        <SelectField id="metode" name="metode" options={methods} defaultValue={methods[0].value} {...invalid("metode")} />
      </FormField>
      <FormField id="tanggal" label="Tanggal ambil" error={errors.tanggal} tone="admin">
        <DatePicker id="tanggal" name="tanggal" defaultValue={today} {...invalid("tanggal")} />
      </FormField>
      <FormField id="jam" label="Jam ambil" error={errors.jam} tone="admin">
        <TimeSelect id="jam" name="jam" opens={hours.opens} closes={hours.closes} {...invalid("jam")} />
      </FormField>
      <FormField id="status" label="Status pembayaran" error={errors.status} tone="admin">
        <SelectField id="status" name="status" options={statusOptions} defaultValue="paid" {...invalid("status")} />
      </FormField>
      <FormField id="catatan" label="Catatan (opsional)" error={errors.catatan} tone="admin">
        <Input id="catatan" name="catatan" maxLength={200} className={fieldControlClass} {...invalid("catatan")} />
      </FormField>
      <div className="flex items-baseline justify-between gap-3 border-t border-border pt-3.5 sm:col-span-2" aria-live="polite">
        <span className="text-sm text-ink-muted">{total > 0 ? `${count} × ${formatRupiah(unitPrice)}` : "Pilih produk dan jumlah"}</span>
        <span className="text-sm font-semibold">
          Total <span className="ml-1 font-mono text-lg tabular-nums">{formatRupiah(total)}</span>
        </span>
      </div>
      {state.message && (
        <p role="alert" className="rounded-lg bg-canvas px-4 py-3 text-[13px] leading-[1.28] font-semibold text-brand sm:col-span-2">
          {state.message}
        </p>
      )}
      <div className="flex flex-col-reverse gap-2 sm:col-span-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel} disabled={pending} className="h-10 px-4">
          Batal
        </Button>
        <Button type="submit" loading={pending} className="h-10 px-5">
          Simpan pesanan
        </Button>
      </div>
    </form>
  );
}
