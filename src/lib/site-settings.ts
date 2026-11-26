import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { defaultFooter, defaultHeader } from "@/config/site-defaults";
import { createAdminClient } from "@/lib/supabase/admin";
import { deriveContact, footerSchema, headerSchema, type FooterSettings, type HeaderSettings } from "@/lib/site-settings-schema";

export const SITE_SETTINGS_TAG = "site-settings";

type SettingsKey = "header" | "footer";

export async function readSettings(key: SettingsKey) {
  const { data, error } = await createAdminClient().from("site_settings").select("data").eq("key", key).maybeSingle<{ data: unknown }>();
  if (error) throw new Error(`readSettings(${key}): ${error.message}`);
  return data?.data;
}

export async function getHeader(): Promise<HeaderSettings> {
  "use cache";
  cacheTag(SITE_SETTINGS_TAG);
  cacheLife("max");
  const parsed = headerSchema.safeParse(await readSettings("header"));
  return parsed.success ? parsed.data : defaultHeader;
}

export async function getFooter(): Promise<FooterSettings> {
  "use cache";
  cacheTag(SITE_SETTINGS_TAG);
  cacheLife("max");
  const parsed = footerSchema.safeParse(await readSettings("footer"));
  return parsed.success ? parsed.data : defaultFooter;
}

export async function getContact() {
  return deriveContact(await getFooter());
}
