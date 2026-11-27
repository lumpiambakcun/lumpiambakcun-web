"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { sendAuthLink } from "@/lib/email/auth-emails";
import { fieldErrors, formToObject } from "@/lib/form-data";
import { passwordMax, passwordMin } from "@/lib/password-rules";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { errors?: Record<string, string>; message?: string; notice?: string; email?: string };

const email = z.email("Format email tidak valid.").max(120);
const loginSchema = z.object({ email, password: z.string().min(1, "Isi kata sandi.").max(200) });
const resetSchema = z.object({ email });
const newPasswordSchema = z
  .object({
    password: z.string().min(passwordMin, `Kata sandi minimal ${passwordMin} karakter.`).max(passwordMax, `Kata sandi maksimal ${passwordMax} karakter.`),
    konfirmasi: z.string(),
  })
  .refine((data) => data.password === data.konfirmasi, { path: ["konfirmasi"], message: "Isian tidak sama dengan kata sandi baru." });

export async function signIn(_state: AuthState, formData: FormData): Promise<AuthState> {
  const input = formToObject(formData);
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), email: input.email };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || data.user?.app_metadata?.role !== "admin") {
    if (data?.user) await supabase.auth.signOut();
    return { message: "Email atau kata sandi salah.", email: parsed.data.email };
  }
  redirect("/admin");
}

export async function requestReset(_state: AuthState, formData: FormData): Promise<AuthState> {
  const input = formToObject(formData);
  const parsed = resetSchema.safeParse(input);
  if (!parsed.success) return { errors: fieldErrors(parsed.error), email: input.email };

  try {
    // Hasil "unknown_user" sengaja dijawab sama agar tidak membocorkan email yang terdaftar.
    await sendAuthLink({ type: "recovery", email: parsed.data.email });
  } catch (error) {
    console.error("requestReset: gagal meminta reset kata sandi", error);
    return { message: "Permintaan belum bisa diproses. Coba lagi beberapa menit lagi.", email: parsed.data.email };
  }
  return { notice: "Jika email terdaftar, tautan untuk mengatur kata sandi baru sudah dikirim. Cek kotak masuk dan folder spam." };
}

export async function updatePassword(_state: AuthState, formData: FormData): Promise<AuthState> {
  await requireAdmin();
  const parsed = newPasswordSchema.safeParse(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    console.error("updatePassword: gagal mengganti kata sandi", error);
    return { message: "Kata sandi belum bisa diganti. Minta tautan baru lalu coba lagi." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
