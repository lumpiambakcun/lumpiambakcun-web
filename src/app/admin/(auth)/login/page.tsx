import type { Metadata } from "next";
import { signIn } from "@/app/admin/(auth)/actions";
import { AuthForm } from "@/components/admin/auth-form";
import { AuthShell } from "@/components/admin/auth-shell";

export const metadata: Metadata = { title: "Masuk" };

const fields = [
  { name: "email", label: "Email", type: "email", autoComplete: "username" },
  { name: "password", label: "Kata sandi", type: "password", autoComplete: "current-password" },
] as const;

export default function LoginPage() {
  return (
    <AuthShell title="Masuk Akun">
      <AuthForm action={signIn} fields={fields} submitLabel="Masuk" forgotHref="/admin/lupa-password" />
    </AuthShell>
  );
}
