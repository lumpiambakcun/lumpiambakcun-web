import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { updatePassword } from "@/app/admin/(auth)/actions";
import { AuthForm } from "@/components/admin/auth-form";
import { AuthShell } from "@/components/admin/auth-shell";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Atur kata sandi" };

const fields = [
  { name: "password", label: "Kata sandi baru", type: "password", autoComplete: "new-password" },
  { name: "konfirmasi", label: "Ulangi kata sandi baru", type: "password", autoComplete: "new-password" },
] as const;

async function NewPasswordForm() {
  await connection();
  await requireAdmin();
  return <AuthForm action={updatePassword} fields={fields} submitLabel="Simpan kata sandi" />;
}

export default function NewPasswordPage() {
  return (
    <AuthShell title="Atur Kata Sandi Baru" description="Minimal 10 karakter.">
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
