import "server-only";
import { z } from "zod";
import { pickImage, removeImageByUrl, uploadImage } from "@/lib/admin-storage";
import type { ArticleRow } from "@/lib/articles";
import type { CmsState } from "@/lib/cms";
import { fieldErrors, formToObject } from "@/lib/form-data";
import { htmlToText, sanitizeArticleHtml } from "@/lib/sanitize-article";
import { createAdminClient } from "@/lib/supabase/admin";

const MIN_BODY_CHARS = 50;

const articleSchema = z.object({
  id: z.string().optional(),
  slug: z
    .string("Isi slug.")
    .max(80, "Slug maksimal 80 karakter.")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug hanya huruf kecil, angka, dan tanda hubung. Contoh: cara-menggoreng-lumpia."),
  title: z.string("Isi judul.").min(5, "Judul minimal 5 karakter.").max(120, "Judul maksimal 120 karakter."),
  excerpt: z.string("Isi ringkasan.").min(20, "Ringkasan minimal 20 karakter.").max(160, "Ringkasan maksimal 160 karakter."),
  body: z.string("Isi artikel."),
  cover_alt: z.string().max(120, "Teks alt maksimal 120 karakter."),
  status: z.enum(["draft", "published"], "Pilih status."),
});

const publishedAt = (current: string | null, status: ArticleRow["status"]) => current ?? (status === "published" ? new Date().toISOString() : null);

export async function listAllArticles() {
  const { data, error } = await createAdminClient()
    .from("articles")
    .select("id, slug, title, cover_url, status, published_at, updated_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`listAllArticles: ${error.message}`);
  return data as Pick<ArticleRow, "id" | "slug" | "title" | "cover_url" | "status" | "published_at" | "updated_at">[];
}

export async function getArticleById(id: string) {
  const { data, error } = await createAdminClient().from("articles").select("*").eq("id", id).maybeSingle<ArticleRow>();
  if (error) return null;
  return data;
}

export async function saveArticle(formData: FormData): Promise<CmsState> {
  const parsed = articleSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { id, slug, ...fields } = parsed.data;
  const body = sanitizeArticleHtml(fields.body);
  if (htmlToText(body).length < MIN_BODY_CHARS) return { errors: { body: `Isi artikel minimal ${MIN_BODY_CHARS} karakter.` } };
  const { file: cover, error: coverError } = pickImage(formData.get("cover"));
  if (coverError) return { errors: { cover: coverError } };

  const supabase = createAdminClient();
  const existing = id ? await getArticleById(id) : null;
  if (id && !existing) return { message: "Artikel tidak ditemukan." };
  if (!existing) {
    const { data: taken } = await supabase.from("articles").select("id").eq("slug", slug).maybeSingle();
    if (taken) return { errors: { slug: "Slug sudah dipakai artikel lain." } };
  }

  let coverUrl = existing?.cover_url ?? null;
  if (cover) {
    coverUrl = await uploadImage("articles", existing?.slug ?? slug, cover);
    if (!coverUrl) return { message: "Foto belum bisa diunggah. Coba lagi sebentar." };
  }

  const row = {
    title: fields.title,
    excerpt: fields.excerpt,
    body,
    cover_alt: fields.cover_alt,
    status: fields.status,
    cover_url: coverUrl,
    published_at: publishedAt(existing?.published_at ?? null, fields.status),
    updated_at: new Date().toISOString(),
  };
  const { error } = existing
    ? await supabase.from("articles").update(row).eq("id", existing.id)
    : await supabase.from("articles").insert({ ...row, slug });
  if (error) {
    console.error("saveArticle: gagal menyimpan", error);
    return { message: "Belum bisa disimpan. Coba lagi sebentar." };
  }

  if (cover && existing) await removeImageByUrl("articles", existing.cover_url);
  return { ok: true };
}

export async function setArticleStatus(id: string, status: ArticleRow["status"]) {
  const existing = await getArticleById(id);
  if (!existing) return;
  const { error } = await createAdminClient()
    .from("articles")
    .update({ status, published_at: publishedAt(existing.published_at, status), updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) console.error("setArticleStatus: gagal memperbarui status", error);
}

export async function deleteArticle(id: string) {
  const existing = await getArticleById(id);
  if (!existing) return;
  const { error } = await createAdminClient().from("articles").delete().eq("id", id);
  if (error) {
    console.error("deleteArticle: gagal menghapus artikel", error);
    return;
  }
  await removeImageByUrl("articles", existing.cover_url);
}
