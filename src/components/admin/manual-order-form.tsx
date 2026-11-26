"use client";

import { CalendarClock, Package, StickyNote, UserRound, Wallet } from "lucide-react";
import { useState, useTransition } from "react";
import { addManualOrder } from "@/app/admin/(panel)/actions";
import { ChoiceChips } from "@/components/admin/choice-chips";
import { DialogForm, FormMessage, dialogFooterClass } from "@/components/admin/dialog-form";
import { FormSection } from "@/components/admin/form-section";
import { PhoneField } from "@/components/admin/phone-field";
import { PickupPicker } from "@/components/admin/pickup-picker";
import { ProductPicker, type ProductOption } from "@/components/admin/product-picker";
import { QuantityStepper } from "@/components/admin/quantity-stepper";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import type { SelectOption } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ManualOrderState } from "@/lib/admin-orders";
import { formatRupiah } from "@/lib/currency";

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
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState(methods[0].value);
  const [status, setStatus] = useState("paid");
  const [noteOpen, setNoteOpen] = useState(false);
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const selected = products.find((product) => product.value === productId);
  const total = selected ? selected.price * quantity : 0;

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
    <DialogForm
      onSubmit={handleSubmit}
      className="grid-cols-1 gap-y-4 sm:grid-cols-1"
      footerClassName={dialogFooterClass}
      footer={
        <>
          <FormMessage>{state.message}</FormMessage>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite" className="flex flex-col gap-0.5">
              <span className="text-xs leading-[1.2] text-ink-muted">{selected ? `${quantity} × ${formatRupiah(selected.price)}` : "Pilih produk"}</span>
              <span className="text-xl leading-[1.1] font-bold text-ink tabular-nums">{formatRupiah(total)}</span>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onCancel} disabled={pending} className="h-10 flex-1 bg-white px-4 sm:flex-none">
                Batal
              </Button>
              <Button type="submit" loading={pending} className="h-10 flex-1 px-5 sm:flex-none">
                Simpan pesanan
              </Button>
            </div>
          </div>
        </>
      }
    >
      <FormSection icon={Package} title="Produk" error={errors.produk ?? errors.jumlah} errorId={errors.produk ? "produk-error" : "jumlah-error"}>
        <ProductPicker products={products} value={productId} onChange={setProductId} name="produk" />
        <QuantityStepper
          id="jumlah"
          name="jumlah"
          label={selected ? `Jumlah ${selected.unit}` : "Jumlah"}
          value={quantity}
          onChange={setQuantity}
          invalid={Boolean(errors.jumlah)}
          describedBy={errors.jumlah ? "jumlah-error" : undefined}
        />
      </FormSection>

      <FormSection icon={UserRound} title="Pemesan">
        <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
          <FormField id="nama" label="Nama pemesan" error={errors.nama} tone="admin">
            <Input id="nama" name="nama" autoComplete="off" className={fieldControlClass} {...invalid("nama")} />
          </FormField>
          <FormField id="whatsapp" label="Nomor WhatsApp" error={errors.whatsapp} tone="admin">
            <PhoneField id="whatsapp" name="whatsapp" invalid={Boolean(errors.whatsapp)} describedBy={errors.whatsapp ? "whatsapp-error" : undefined} />
          </FormField>
        </div>
      </FormSection>

      <FormSection icon={CalendarClock} title="Ambil" error={errors.tanggal ?? errors.jam} errorId={errors.tanggal ? "tanggal-error" : "jam-error"}>
        <PickupPicker today={today} hours={hours} />
      </FormSection>

      <FormSection icon={Wallet} title="Pembayaran" error={errors.metode ?? errors.status} errorId={errors.metode ? "metode-error" : "status-error"}>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <ChoiceChips label="Metode bayar" name="metode" value={method} onChange={setMethod} options={methods} className="w-auto" />
          <ChoiceChips label="Status pembayaran" name="status" value={status} onChange={setStatus} options={statusOptions} className="w-auto" />
        </div>
      </FormSection>

      <FormSection icon={StickyNote} title="Catatan" error={errors.catatan} errorId="catatan-error">
        {noteOpen ? (
          <textarea
            id="catatan"
            name="catatan"
            aria-label="Catatan"
            maxLength={200}
            rows={2}
            autoFocus
            placeholder="Contoh: tanpa cabai, dibungkus terpisah"
            className={fieldTextareaClass}
            {...invalid("catatan")}
          />
        ) : (
          <Button type="button" variant="ghost" onClick={() => setNoteOpen(true)} className="h-9 w-fit px-2 font-semibold text-brand hover:text-brand">
            + Tambah catatan
          </Button>
        )}
      </FormSection>
    </DialogForm>
  );
}
