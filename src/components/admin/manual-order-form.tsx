"use client";

import { useState, useTransition } from "react";
import { addManualOrder } from "@/app/admin/(panel)/actions";
import { DialogForm, FormMessage } from "@/components/admin/dialog-form";
import { DatePicker } from "@/components/shared/date-picker";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField, type SelectOption } from "@/components/shared/select-field";
import { TimeSelect } from "@/components/shared/time-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ManualOrderState } from "@/lib/admin-orders";
import { formatRupiah } from "@/lib/currency";

export type ProductOption = SelectOption & { price: number; unit: string };

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

  const selected = products.find((product) => product.value === productId);
  const unitPrice = selected?.price ?? 0;
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
    <DialogForm onSubmit={handleSubmit} footer={
        <>
          <FormMessage>{state.message}</FormMessage>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={pending} className="h-10 px-4">
              Batal
            </Button>
            <Button type="submit" loading={pending} className="h-10 px-5">
              Simpan pesanan
            </Button>
          </div>
        </>
      }>
        <FormField id="produk" label="Produk" error={errors.produk} tone="admin" className="sm:col-span-2">
          <SelectField id="produk" name="produk" options={products} placeholder="Pilih produk" onValueChange={setProductId} {...invalid("produk")} />
        </FormField>
        <FormField id="jumlah" label={selected ? `Jumlah (${selected.unit})` : "Jumlah"} error={errors.jumlah} tone="admin">
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
        <div className="flex flex-col gap-1.5" aria-live="polite">
          <span className="text-[13px] leading-[1.2] font-semibold text-ink">Total</span>
          <div className="flex h-[45px] items-center justify-between gap-3 rounded-lg bg-canvas px-4">
            <span className="text-xs text-ink-muted">{total > 0 ? `${count} × ${formatRupiah(unitPrice)}` : "Pilih produk"}</span>
            <span className="font-mono text-base font-semibold tabular-nums">{formatRupiah(total)}</span>
          </div>
        </div>
        <FormField id="nama" label="Nama pemesan" error={errors.nama} tone="admin">
          <Input id="nama" name="nama" autoComplete="off" className={fieldControlClass} {...invalid("nama")} />
        </FormField>
        <FormField id="whatsapp" label="Nomor WhatsApp" error={errors.whatsapp} tone="admin">
          <Input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="off" placeholder="08xx-xxxx-xxxx" className={fieldControlClass} {...invalid("whatsapp")} />
        </FormField>
        <FormField id="tanggal" label="Tanggal ambil" error={errors.tanggal} tone="admin">
          <DatePicker id="tanggal" name="tanggal" defaultValue={today} {...invalid("tanggal")} />
        </FormField>
        <FormField id="jam" label="Jam ambil" error={errors.jam} tone="admin">
          <TimeSelect id="jam" name="jam" opens={hours.opens} closes={hours.closes} {...invalid("jam")} />
        </FormField>
        <FormField id="metode" label="Metode bayar" error={errors.metode} tone="admin">
          <SelectField id="metode" name="metode" options={methods} defaultValue={methods[0].value} {...invalid("metode")} />
        </FormField>
        <FormField id="status" label="Status pembayaran" error={errors.status} tone="admin">
          <SelectField id="status" name="status" options={statusOptions} defaultValue="paid" {...invalid("status")} />
        </FormField>
        <FormField id="catatan" label="Catatan (opsional)" error={errors.catatan} tone="admin" className="sm:col-span-2">
          <textarea
            id="catatan"
            name="catatan"
            maxLength={200}
            rows={3}
            placeholder="Contoh: tanpa cabai, dibungkus terpisah"
            className={fieldTextareaClass}
            {...invalid("catatan")}
          />
        </FormField>
    </DialogForm>
  );
}
