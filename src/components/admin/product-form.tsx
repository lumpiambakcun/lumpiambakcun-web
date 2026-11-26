"use client";

import { useState, useTransition } from "react";
import { saveProductAction } from "@/app/admin/(panel)/produk/actions";
import { DialogForm, FormMessage } from "@/components/admin/dialog-form";
import { PhotoField } from "@/components/admin/photo-field";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsState } from "@/lib/cms";
import type { ProductRow } from "@/lib/products";

type ProductFormProps = {
  product?: ProductRow;
  onSaved: () => void;
  onCancel: () => void;
};

const yesNo = (yes: string, no: string) => [
  { value: "1", label: yes },
  { value: "0", label: no },
];
const flag = (value: boolean | undefined, fallback: boolean) => ((value ?? fallback) ? "1" : "0");

export function ProductForm({ product, onSaved, onCancel }: ProductFormProps) {
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await saveProductAction(data);
      if (result.ok) onSaved();
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
              Simpan
            </Button>
          </div>
        </>
      }>
      {product && <input type="hidden" name="editing" value="1" />}
        <PhotoField
          id="foto"
          name="foto"
          label={product ? "Foto produk (pilih file untuk mengganti)" : "Foto produk"}
          initialSrc={product?.image_url}
          error={errors.foto}
        />
        <FormField id="name" label="Nama produk" error={errors.name} tone="admin">
          <Input id="name" name="name" defaultValue={product?.name} placeholder="Lumpia" autoComplete="off" className={fieldControlClass} {...invalid("name")} />
        </FormField>
        <FormField id="category" label="Kategori" error={errors.category} tone="admin">
          <Input id="category" name="category" defaultValue={product?.category} placeholder="Lumpia" autoComplete="off" className={fieldControlClass} {...invalid("category")} />
        </FormField>
        <FormField id="variant" label="Varian" error={errors.variant} tone="admin">
          <Input id="variant" name="variant" list="variant-list" defaultValue={product?.variant} placeholder="Frozen" autoComplete="off" maxLength={30} className={fieldControlClass} {...invalid("variant")} />
          <datalist id="variant-list">
            <option value="Frozen" />
            <option value="Goreng" />
          </datalist>
        </FormField>
        <FormField id="price" label="Harga (Rp)" error={errors.price} tone="admin">
          <Input id="price" name="price" type="number" inputMode="numeric" min={1000} step={500} defaultValue={product?.price} className={fieldControlClass} {...invalid("price")} />
        </FormField>
        <FormField id="unit" label="Satuan jual" error={errors.unit} tone="admin">
          <Input id="unit" name="unit" list="unit-list" defaultValue={product?.unit} placeholder="mika" autoComplete="off" maxLength={20} className={fieldControlClass} {...invalid("unit")} />
          <datalist id="unit-list">
            <option value="mika" />
            <option value="box" />
            <option value="pack" />
          </datalist>
        </FormField>
        <FormField id="pcs" label="Isi per satuan (pcs)" error={errors.pcs} tone="admin">
          <Input id="pcs" name="pcs" type="number" inputMode="numeric" min={1} max={1000} defaultValue={product?.pcs ?? 10} className={fieldControlClass} {...invalid("pcs")} />
        </FormField>
        <FormField id="summary" label="Keterangan singkat kartu (opsional)" error={errors.summary} tone="admin" className="sm:col-span-2">
          <Input id="summary" name="summary" defaultValue={product?.summary} placeholder="Isi 10 pcs, frozen, tinggal goreng." maxLength={80} autoComplete="off" className={fieldControlClass} {...invalid("summary")} />
          <p className="text-xs text-ink-muted">Kosongkan untuk teks otomatis: isi dan satuan.</p>
        </FormField>
        <FormField id="id" label="ID produk" error={errors.id} tone="admin" className="sm:col-span-2">
          <Input
            id="id"
            name="id"
            defaultValue={product?.id}
            readOnly={Boolean(product)}
            placeholder="lumpia-frozen"
            autoComplete="off"
            className={`${fieldControlClass} read-only:bg-canvas read-only:text-ink-muted`}
            {...invalid("id")}
          />
          {!product && <p className="text-xs text-ink-muted">Dipakai untuk tautan dan pesanan; tidak bisa diubah setelah disimpan.</p>}
        </FormField>
        <FormField id="description" label="Deskripsi" error={errors.description} tone="admin" className="sm:col-span-2">
          <textarea id="description" name="description" defaultValue={product?.description} maxLength={500} rows={3} className={fieldTextareaClass} {...invalid("description")} />
        </FormField>
        <FormField id="ingredients" label="Bahan (opsional)" error={errors.ingredients} tone="admin" className="sm:col-span-2">
          <Input id="ingredients" name="ingredients" defaultValue={product?.ingredients} maxLength={200} autoComplete="off" className={fieldControlClass} {...invalid("ingredients")} />
        </FormField>
        <FormField id="chili" label="Gratis cabai rawit" error={errors.chili} tone="admin">
          <SelectField id="chili" name="chili" options={yesNo("Ya", "Tidak")} defaultValue={flag(product?.chili, false)} />
        </FormField>
        <FormField id="active" label="Status" error={errors.active} tone="admin">
          <SelectField id="active" name="active" options={yesNo("Aktif (bisa dipesan)", "Nonaktif (disembunyikan)")} defaultValue={flag(product?.active, true)} />
        </FormField>
    </DialogForm>
  );
}
