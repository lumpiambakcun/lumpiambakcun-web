import { connection } from "next/server";
import { FaqList } from "@/components/admin/faq-list";
import { requireAdmin } from "@/lib/admin-auth";
import { listAllFaqs } from "@/lib/admin-faqs";

export async function FaqContent() {
  await connection();
  await requireAdmin();
  return <FaqList faqs={await listAllFaqs()} />;
}
