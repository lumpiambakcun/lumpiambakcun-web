import { connection } from "next/server";
import { FaqTable } from "@/components/admin/faq-table";
import { requireAdmin } from "@/lib/admin-auth";
import { listAllFaqs } from "@/lib/admin-faqs";

export async function FaqContent() {
  await connection();
  await requireAdmin();
  return <FaqTable faqs={await listAllFaqs()} />;
}
