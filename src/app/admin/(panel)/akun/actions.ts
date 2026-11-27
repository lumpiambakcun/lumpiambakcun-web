"use server";

import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import type { CmsState } from "@/lib/cms";
import { sendAuthLink } from "@/lib/email/auth-emails";
import { fieldErrors, formToObject } from "@/lib/form-data";
import { passwordMax, passwordMin } from "@/lib/password-rules";
import { createClient } from "@/lib/supabase/server";

const current = z.string().min(1, "Isi kata sandi saat ini.").max(200);
const emailSchema = z.object({ email: z.email("Format email tidak valid.").max(120), current });
const passwordSchema = z
  .object({
    current,
    password: z.string().min(passwordMin, `Kata sandi minimal ${passwordMin} karakter.`).max(passwordMax, `Kata sandi maksimal ${passwordMax} karakter.`),
    konfirmasi: z.string(),
  })
  .refine((data) => data.password === data.konfirmasi, { path: ["konfirmasi"], message: "Isian tidak sama dengan kata sandi baru." });

async function verifyCurrent(email: string | undefined, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: email ?? "", password });
  return error ? undefined : supabase;
}

export async function updateEmail(formData: FormData): Promise<CmsState> {
  const user = await requireAdmin();
  const parsed = emailSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { email, current: password } = parsed.data;
  if (email.toLowerCase() === user.email?.toLowerCase()) return { errors: { email: "Email baru sama dengan email saat ini." } };

  const supabase = await verifyCurrent(user.email, password);
  if (!supabase) return { errors: { current: "Kata sandi saat ini salah." } };

  return requestEmailChange(user.email ?? "", email);
}

async function requestEmailChange(email: string, newEmail: string): Promise<CmsState> {
  try {
    const result = await sendAuthLink({ type: "email_change", email, newEmail });
    if (result === "email_taken") return { errors: { email: "Email ini sudah dipakai akun lain." } };
    if (result === "unknown_user") return { message: "Akun tidak ditemukan. Masuk ulang lalu coba lagi." };
    return { ok: true };
  } catch (error) {
    console.error("requestEmailChange: gagal mengirim tautan konfirmasi", error);
    return { message: "Link konfirmasi belum bisa dikirim. Coba lagi beberapa menit lagi." };
  }
}

export async function updatePassword(formData: FormData): Promise<CmsState> {
  const user = await requireAdmin();
  const parsed = passwordSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const supabase = await verifyCurrent(user.email, parsed.data.current);
  if (!supabase) return { errors: { current: "Kata sandi saat ini salah." } };

  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    console.error("updatePassword: gagal mengganti kata sandi", error);
    return { message: "Kata sandi belum bisa diganti. Coba lagi beberapa menit lagi." };
  }
  return { ok: true };
}

export async function resendEmailChange(): Promise<CmsState> {
  const user = await requireAdmin();
  if (!user.new_email) return { message: "Tidak ada perubahan email yang menunggu konfirmasi." };

  return requestEmailChange(user.email ?? "", user.new_email);
}
