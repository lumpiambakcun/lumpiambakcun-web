import "server-only";
import { z } from "zod";
import type { CmsState } from "@/lib/cms";
import { pickImage, removeImageByUrl, uploadImage } from "@/lib/admin-storage";
import { fieldErrors, formToObject } from "@/lib/form-data";
import type { ProductRow } from "@/lib/products";
import { createAdminClient } from "@/lib/supabase/admin";

const flag = z.enum(["1", "0"]);

const productSchema = z.object({
  editing: z.string().optional(),
  id: z
    .string("Isi ID produk.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "ID hanya huruf kecil, angka, dan tanda hubung. Contoh: lumpia-frozen."),
  category: z.string("Isi kategori.").min(2, "Kategori minimal 2 karakter.").max(40, "Kategori maksimal 40 karakter."),
  variant: z.string("Isi varian.").min(1, "Isi varian, misalnya Frozen atau Goreng.").max(30, "Varian maksimal 30 karakter."),
  unit: z.string("Isi satuan.").min(2, "Satuan minimal 2 huruf, misalnya mika atau box.").max(20, "Satuan maksimal 20 karakter."),
  pcs: z.coerce.number("Isi per satuan tidak valid.").int("Isi per satuan tidak valid.").min(1, "Isi minimal 1 pcs.").max(1000, "Isi maksimal 1000 pcs."),
  summary: z.string().max(80, "Keterangan maksimal 80 karakter."),
  name: z.string("Isi nama produk.").min(2, "Nama minimal 2 karakter.").max(60, "Nama maksimal 60 karakter."),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter."),
  ingredients: z.string().max(200, "Isi maksimal 200 karakter."),
  price: z.coerce.number("Harga tidak valid.").int("Harga tidak valid.").min(1000, "Harga minimal Rp1.000.").max(10_000_000, "Harga terlalu besar."),
  chili: flag,
  active: flag,
});

export async function listAllProducts() {
  const { data, error } = await createAdminClient().from("products").select("*").order("sort").order("id");
  if (error) throw new Error(`listAllProducts: ${error.message}`);
  return data as ProductRow[];
}

export async function saveProduct(formData: FormData): Promise<CmsState> {
  const parsed = productSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { editing, ...fields } = parsed.data;
  const { file: photo, error: photoError } = pickImage(formData.get("foto"));
  if (photoError) return { errors: { foto: photoError } };

  const supabase = createAdminClient();
  const { data: existing } = await supabase.from("products").select("image_url").eq("id", fields.id).maybeSingle<{ image_url: string }>();
  if (editing && !existing) return { message: "Produk tidak ditemukan." };
  if (!editing && existing) return { errors: { id: "ID sudah dipakai produk lain." } };
  if (!editing && !photo) return { errors: { foto: "Unggah foto produk." } };

  let imageUrl = existing?.image_url ?? "";
  if (photo) {
    const uploaded = await uploadImage("products", fields.id, photo);
    if (!uploaded) return { message: "Foto belum bisa diunggah. Coba lagi sebentar." };
    imageUrl = uploaded;
  }

  const row = {
    ...fields,
    unit: fields.unit.toLowerCase(),
    chili: fields.chili === "1",
    active: fields.active === "1",
    image_url: imageUrl,
    updated_at: new Date().toISOString(),
  };
  let error;
  if (editing) {
    ({ error } = await supabase.from("products").update(row).eq("id", fields.id));
  } else {
    const { data: last } = await supabase.from("products").select("sort").order("sort", { ascending: false }).limit(1).maybeSingle();
    ({ error } = await supabase.from("products").insert({ ...row, sort: (last?.sort ?? 0) + 1 }));
  }
  if (error) {
    console.error("saveProduct: gagal menyimpan", error);
    return { message: "Belum bisa disimpan. Coba lagi sebentar." };
  }

  if (photo && existing) await removeImageByUrl("products", existing.image_url);
  return { ok: true };
}

export async function deleteProduct(id: string) {
  const supabase = createAdminClient();
  const { data } = await supabase.from("products").select("image_url").eq("id", id).maybeSingle<{ image_url: string }>();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error("deleteProduct: gagal menghapus produk", error);
    return;
  }
  await removeImageByUrl("products", data?.image_url ?? null);
}

export async function setProductActive(id: string, active: boolean) {
  const { error } = await createAdminClient().from("products").update({ active, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) console.error("setProductActive: gagal memperbarui produk", error);
}
