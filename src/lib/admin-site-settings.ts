import "server-only";
import type { z } from "zod";
import { pickImage, removeImageByUrl, uploadImage } from "@/lib/admin-storage";
import type { CmsState } from "@/lib/cms";
import { pathErrors } from "@/lib/form-data";
import { readSettings } from "@/lib/site-settings";
import { footerSchema, headerSchema } from "@/lib/site-settings-schema";
import { defaultFooter, defaultHeader } from "@/config/site-defaults";
import { createAdminClient } from "@/lib/supabase/admin";

type Key = "header" | "footer";

function readPayload(formData: FormData): unknown {
  const raw = formData.get("payload");
  if (typeof raw !== "string") return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function save<T>(
  key: Key,
  schema: z.ZodType<T, unknown>,
  formData: FormData,
  current: { logoUrl: string },
  withLogo: (data: T, logoUrl: string) => T,
): Promise<CmsState> {
  const parsed = schema.safeParse(readPayload(formData));
  if (!parsed.success) return { errors: pathErrors(parsed.error), message: "Periksa isian yang bertanda merah." };

  const { file: logo, error: logoError } = pickImage(formData.get("logo"));
  if (logoError) return { errors: { logo: logoError } };

  let logoUrl = current.logoUrl;
  if (logo) {
    const uploaded = await uploadImage("branding", `${key}-logo`, logo);
    if (!uploaded) return { message: "Logo belum bisa diunggah. Coba lagi sebentar." };
    logoUrl = uploaded;
  }

  const { error } = await createAdminClient()
    .from("site_settings")
    .upsert({ key, data: withLogo(parsed.data, logoUrl), updated_at: new Date().toISOString() });
  if (error) {
    console.error(`saveSettings(${key}): gagal menyimpan`, error);
    return { message: "Belum bisa disimpan. Coba lagi sebentar." };
  }

  if (logo) await removeImageByUrl("branding", current.logoUrl);
  return { ok: true };
}

export async function saveHeader(formData: FormData) {
  const current = headerSchema.safeParse(await readSettings("header"));
  const brand = (current.success ? current.data : defaultHeader).brand;
  return save("header", headerSchema, formData, brand, (data, logoUrl) => ({ ...data, brand: { ...data.brand, logoUrl } }));
}

export async function saveFooter(formData: FormData) {
  const current = footerSchema.safeParse(await readSettings("footer"));
  const footer = current.success ? current.data : defaultFooter;
  return save("footer", footerSchema, formData, footer, (data, logoUrl) => ({ ...data, logoUrl }));
}
