import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requestReset } from "@/app/admin/(auth)/actions";
import { AuthForm } from "@/components/admin/auth-form";
import { AuthShell } from "@/components/admin/auth-shell";
import { ResetLinkNotice } from "@/components/admin/reset-link-notice";

export const metadata: Metadata = { title: "Lupa kata sandi" };

const fields = [{ name: "email", label: "Email", type: "email", autoComplete: "username" }] as const;

export default function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ galat?: string }> }) {
  return (
    <AuthShell title="Lupa Kata Sandi" description="Masukkan email akunmu. Kami kirim tautan untuk mengatur kata sandi baru.">
      <Suspense>
        <ResetLinkNotice searchParams={searchParams} />
      </Suspense>
      <AuthForm action={requestReset} fields={fields} submitLabel="Kirim tautan" />
      <Link href="/admin/login" className="text-center text-sm font-bold text-brand underline-offset-4 hover:underline">
        Kembali ke halaman masuk
      </Link>
    </AuthShell>
  );
}
