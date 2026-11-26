import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type ImageBucket = "products" | "articles" | "branding";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
const imageExtensions: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };

export function pickImage(entry: FormDataEntryValue | null): { file: File | null; error?: string } {
  if (!(entry instanceof File) || entry.size === 0) return { file: null };
  if (!imageExtensions[entry.type]) return { file: null, error: "Foto harus JPG, PNG, atau WebP." };
  if (entry.size > MAX_IMAGE_BYTES) return { file: null, error: "Ukuran foto maksimal 2 MB." };
  return { file: entry };
}

export async function uploadImage(bucket: ImageBucket, name: string, file: File) {
  const supabase = createAdminClient();
  const path = `${name}-${Date.now()}.${imageExtensions[file.type]}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, { contentType: file.type });
  if (error) {
    console.error("uploadImage: gagal mengunggah foto", error);
    return null;
  }
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export async function removeImageByUrl(bucket: ImageBucket, url: string | null) {
  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url ? url.indexOf(marker) : -1;
  if (!url || index < 0) return;
  await createAdminClient().storage.from(bucket).remove([url.slice(index + marker.length)]);
}
