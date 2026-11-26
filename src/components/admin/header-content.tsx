import { connection } from "next/server";
import { SiteHeaderForm } from "@/components/admin/site-header-form";
import { requireAdmin } from "@/lib/admin-auth";
import { getHeader } from "@/lib/site-settings";

export async function HeaderContent() {
  await connection();
  await requireAdmin();
  return <SiteHeaderForm initial={await getHeader()} />;
}
