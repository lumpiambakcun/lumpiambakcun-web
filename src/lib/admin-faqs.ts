import "server-only";
import { z } from "zod";
import type { CmsState } from "@/lib/cms";
import type { FaqRow } from "@/lib/faqs";
import { fieldErrors, formToObject } from "@/lib/form-data";
import { createAdminClient } from "@/lib/supabase/admin";

const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string("Isi pertanyaan.").min(5, "Pertanyaan minimal 5 karakter.").max(200, "Pertanyaan maksimal 200 karakter."),
  answer: z.string("Isi jawaban.").min(5, "Jawaban minimal 5 karakter.").max(1000, "Jawaban maksimal 1000 karakter."),
  active: z.enum(["1", "0"]),
});

export async function listAllFaqs() {
  const { data, error } = await createAdminClient().from("faqs").select("*").order("sort").order("created_at");
  if (error) throw new Error(`listAllFaqs: ${error.message}`);
  return data as FaqRow[];
}

export async function saveFaq(formData: FormData): Promise<CmsState> {
  const parsed = faqSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { id, question, answer, active } = parsed.data;
  const supabase = createAdminClient();
  const values = { question, answer, active: active === "1", updated_at: new Date().toISOString() };

  let error;
  if (id) {
    ({ error } = await supabase.from("faqs").update(values).eq("id", id));
  } else {
    const { data: last } = await supabase.from("faqs").select("sort").order("sort", { ascending: false }).limit(1).maybeSingle();
    ({ error } = await supabase.from("faqs").insert({ ...values, sort: (last?.sort ?? 0) + 1 }));
  }
  if (error) {
    console.error("saveFaq: gagal menyimpan", error);
    return { message: "Belum bisa disimpan. Coba lagi sebentar." };
  }
  return { ok: true };
}

export async function deleteFaq(id: string) {
  const { error } = await createAdminClient().from("faqs").delete().eq("id", id);
  if (error) console.error("deleteFaq: gagal menghapus", error);
}

export async function moveFaq(id: string, direction: "up" | "down") {
  const rows = await listAllFaqs();
  const from = rows.findIndex((row) => row.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from < 0 || to < 0 || to >= rows.length) return;
  [rows[from], rows[to]] = [rows[to], rows[from]];
  const supabase = createAdminClient();
  const results = await Promise.all(
    rows.map((row, index) => (row.sort === index + 1 ? null : supabase.from("faqs").update({ sort: index + 1 }).eq("id", row.id))),
  );
  for (const result of results) if (result?.error) console.error("moveFaq: gagal mengurutkan", result.error);
}
