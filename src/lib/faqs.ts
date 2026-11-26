import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

export type FaqRow = { id: string; question: string; answer: string; sort: number; active: boolean };

export const FAQS_TAG = "faqs";

export async function listActiveFaqs() {
  "use cache";
  cacheTag(FAQS_TAG);
  cacheLife("max");
  const { data, error } = await createAdminClient().from("faqs").select("*").eq("active", true).order("sort").order("created_at");
  if (error) throw new Error(`listActiveFaqs: ${error.message}`);
  return (data as FaqRow[]).map(({ question, answer }) => ({ question, answer }));
}
