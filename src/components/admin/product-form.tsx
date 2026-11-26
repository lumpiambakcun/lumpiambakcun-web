"use client";

import { useState, useTransition } from "react";
import { saveProductAction } from "@/app/admin/(panel)/produk/actions";
import { ChoiceChipsWithCustom } from "@/components/admin/choice-chips";
import { DialogForm, FormMessage, dialogFooterClass } from "@/components/admin/dialog-form";
import { PhotoDropzone } from "@/components/admin/photo-dropzone";
import { SelectWithCustom } from "@/components/admin/select-with-custom";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { CmsState } from "@/lib/cms";
import { formatRupiah } from "@/lib/currency";
import type { ProductChoices } from "@/lib/product-options";
import type { ProductRow } from "@/lib/products";
import { slugify } from "@/lib/slug";

type ProductFormProps = {
  product?: ProductRow;
  choices: ProductChoices;
  onSaved: () => void;
  onCancel: () => void;
};

const digitsOf = (value: string) => value.replace(/\D/g, "").slice(0, 8);
const thousands = (digits: string) => (digits ? Number(digits).toLocaleString("id-ID") : "");

export function ProductForm({ product, choices, onSaved, onCancel }: ProductFormProps) {
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(product?.name ?? "");
  const [variant, setVariant] = useState(product?.variant ?? "");
  const [category, setCategory] = useState(product?.category ?? choices.categories[0] ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [pcs, setPcs] = useState(String(product?.pcs ?? 10));
  const [unit, setUnit] = useState(product?.unit ?? "mika");
  const [slugDraft, setSlugDraft] = useState<string | null>(null);
  const [slugEditing, setSlugEditing] = useState(false);
  const [ingredientsOpen, setIngredientsOpen] = useState(Boolean(product?.ingredients));
  const [active, setActive] = useState(product?.active ?? true);
  const [chili, setChili] = useState(product?.chili ?? false);
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const slug = product ? product.id : (slugDraft ?? slugify(`${name} ${variant}`));
  const priceValue = Number(price);
  const pcsValue = Number.parseInt(pcs, 10);
  const perPiece = priceValue > 0 && pcsValue > 0 ? formatRupiah(Math.round(priceValue / pcsValue)) : "";
  const showCategory = choices.categories.length !== 1 || Boolean(product && !choices.categories.includes(product.category));

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
    <DialogForm
      onSubmit={handleSubmit}
      className="grid-cols-1 gap-y-5 sm:grid-cols-1"
      footerClassName={dialogFooterClass}
      footer={
        <>
          <FormMessage>{state.message}</FormMessage>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2">
                <Switch id="active-switch" checked={active} onCheckedChange={setActive} />
                <Label htmlFor="active-switch" className="text-sm font-semibold text-ink">
                  Aktif
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="chili-switch" checked={chili} onCheckedChange={setChili} />
                <Label htmlFor="chili-switch" className="text-sm font-semibold text-ink">
                  Gratis cabai rawit
                </Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onCancel} disabled={pending} className="h-10 flex-1 bg-white px-4 sm:flex-none">
                Batal
              </Button>
              <Button type="submit" loading={pending} className="h-10 flex-1 px-5 sm:flex-none">
                Simpan produk
              </Button>
            </div>
          </div>
        </>
      }
    >
      {product && <input type="hidden" name="editing" value="1" />}
      <input type="hidden" name="id" value={slug} />
      <input type="hidden" name="price" value={price} />
      <input type="hidden" name="active" value={active ? "1" : "0"} />
      <input type="hidden" name="chili" value={chili ? "1" : "0"} />
      {!showCategory && <input type="hidden" name="category" value={category} />}
      {!ingredientsOpen && <input type="hidden" name="ingredients" value="" />}

      <div className="grid gap-x-5 gap-y-4 md:grid-cols-[16rem_minmax(0,1fr)]">
        <PhotoDropzone
          id="foto"
          name="foto"
          label="Foto produk"
          hideLabel
          initialSrc={product?.image_url}
          error={errors.foto}
          boxClassName="aspect-square w-full sm:max-w-64 md:max-w-none"
          sizes="256px"
        />

        <div className="flex min-w-0 flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1.5">
            <FormField id="name" label="Nama produk" error={errors.name} tone="admin">
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Lumpia"
                autoComplete="off"
                className={fieldControlClass}
                {...invalid("name")}
              />
            </FormField>
            {slugEditing && !product ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink-muted">/menu/</span>
                <Input
                  aria-label="ID produk untuk tautan"
                  value={slug}
                  maxLength={60}
                  autoComplete="off"
                  onChange={(event) => setSlugDraft(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-{2,}/g, "-"))}
                  className="h-8 min-w-0 flex-1 rounded-md border-border bg-white px-2 font-mono text-xs"
                  {...invalid("id")}
                />
                <button type="button" onClick={() => setSlugEditing(false)} className="text-xs font-semibold text-brand underline-offset-2 hover:underline">
                  selesai
                </button>
              </div>
            ) : (
              <p className="flex items-center gap-2 text-xs leading-[1.3]">
                <span className="min-w-0 truncate font-mono text-ink-muted">{`/menu/${slug || "…"}`}</span>
                {!product && (
                  <button type="button" onClick={() => setSlugEditing(true)} className="shrink-0 font-semibold text-brand underline-offset-2 hover:underline">
                    ubah
                  </button>
                )}
              </p>
            )}
            {errors.id && (
              <p id="id-error" role="alert" className="text-xs leading-[1.28] text-brand">
                {errors.id}
              </p>
            )}
          </div>

          <FormField id="variant" label="Varian" error={errors.variant} tone="admin">
            <ChoiceChipsWithCustom
              id="variant"
              label="Varian"
              name="variant"
              value={variant}
              onChange={setVariant}
              options={choices.variants}
              placeholder="Nama varian"
              maxLength={30}
              invalid={Boolean(errors.variant)}
              describedBy={errors.variant ? "variant-error" : undefined}
            />
          </FormField>

          <div className="grid gap-x-3 gap-y-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <FormField
              id="price"
              label="Harga"
              error={errors.price}
              tone="admin"
              labelAction={perPiece && <span className="text-xs text-ink-muted tabular-nums">{`${perPiece} / pcs`}</span>}
            >
              <div className="flex h-(--control-h) items-center rounded-(--control-radius) border border-border bg-white focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 has-[[aria-invalid=true]]:border-destructive">
                <span aria-hidden="true" className="pl-4 text-sm font-semibold text-ink-muted">
                  Rp
                </span>
                <Input
                  id="price"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="25.000"
                  value={thousands(price)}
                  onChange={(event) => setPrice(digitsOf(event.target.value))}
                  className="h-full rounded-none border-0 bg-transparent px-2 text-sm tabular-nums shadow-none focus-visible:ring-0"
                  {...invalid("price")}
                />
              </div>
            </FormField>
            <FormField id="pcs" label="Kemasan" error={errors.pcs ?? errors.unit} tone="admin">
              <div className="flex h-(--control-h) items-center rounded-(--control-radius) border border-border bg-white focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                <Input
                  id="pcs"
                  name="pcs"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={1000}
                  aria-label="Isi per kemasan (pcs)"
                  value={pcs}
                  onChange={(event) => setPcs(event.target.value)}
                  className="h-full w-16 shrink-0 [appearance:textfield] rounded-none border-0 bg-transparent px-3 text-center text-sm tabular-nums shadow-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  {...invalid("pcs")}
                />
                <span aria-hidden="true" className="shrink-0 text-sm text-ink-muted">
                  pcs /
                </span>
                <SelectWithCustom
                  id="unit"
                  name="unit"
                  label="Satuan kemasan"
                  value={unit}
                  onChange={setUnit}
                  options={choices.units}
                  placeholder="Satuan"
                  maxLength={20}
                  invalid={Boolean(errors.unit)}
                  describedBy={errors.unit ? "pcs-error" : undefined}
                />
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-5">
        <FormField id="summary" label="Keterangan di kartu" error={errors.summary} tone="admin">
          <Input
            id="summary"
            name="summary"
            defaultValue={product?.summary}
            placeholder={`Isi ${pcsValue > 0 ? pcsValue : "…"} pcs per ${unit || "satuan"}.`}
            maxLength={80}
            autoComplete="off"
            className={fieldControlClass}
            {...invalid("summary")}
          />
        </FormField>
        <FormField id="description" label="Deskripsi" error={errors.description} tone="admin">
          <textarea id="description" name="description" defaultValue={product?.description} maxLength={500} rows={3} className={`${fieldTextareaClass} resize-y`} {...invalid("description")} />
        </FormField>
        {ingredientsOpen ? (
          <FormField id="ingredients" label="Bahan" error={errors.ingredients} tone="admin">
            <Input id="ingredients" name="ingredients" defaultValue={product?.ingredients} maxLength={200} autoComplete="off" autoFocus={!product?.ingredients} className={fieldControlClass} {...invalid("ingredients")} />
          </FormField>
        ) : (
          <Button type="button" variant="ghost" onClick={() => setIngredientsOpen(true)} className="h-9 w-fit px-2 font-semibold text-brand hover:text-brand">
            + Tambah bahan
          </Button>
        )}
        {showCategory && (
          <FormField id="category" label="Kategori" error={errors.category} tone="admin">
            <ChoiceChipsWithCustom
              id="category"
              label="Kategori"
              name="category"
              value={category}
              onChange={setCategory}
              options={choices.categories}
              placeholder="Nama kategori"
              maxLength={40}
              invalid={Boolean(errors.category)}
              describedBy={errors.category ? "category-error" : undefined}
            />
          </FormField>
        )}
      </div>
    </DialogForm>
  );
}
