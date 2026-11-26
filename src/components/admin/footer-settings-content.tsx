import { connection } from "next/server";
import { SiteFooterForm } from "@/components/admin/site-footer-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getFooter } from "@/lib/site-settings";

export async function FooterSettingsContent() {
  await connection();
  await requireAdmin();
  return <SiteFooterForm initial={await getFooter()} />;
}
