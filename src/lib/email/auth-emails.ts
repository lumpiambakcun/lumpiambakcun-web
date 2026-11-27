import "server-only";
import { siteConfig } from "@/config/site";
import { renderEmail } from "@/lib/email/layout";
import { sendEmail } from "@/lib/email/resend";
import { createAdminClient } from "@/lib/supabase/admin";

type AuthLink = { type: "recovery"; email: string } | { type: "email_change"; email: string; newEmail: string };

export type AuthLinkResult = "sent" | "unknown_user" | "email_taken";

const note = `Jika Anda tidak merasa meminta ini, abaikan email ini; akun Anda tidak berubah. Tautan berlaku 1 jam dan hanya bisa dipakai sekali.`;

export async function sendAuthLink(input: AuthLink): Promise<AuthLinkResult> {
  const params =
    input.type === "recovery"
      ? ({ type: "recovery", email: input.email } as const)
      : ({ type: "email_change_new", email: input.email, newEmail: input.newEmail } as const);

  const { data, error } = await createAdminClient().auth.admin.generateLink(params);
  if (error) {
    if (error.code === "user_not_found") return "unknown_user";
    if (error.code === "email_exists") return "email_taken";
    throw error;
  }

  const link = new URL("/auth/confirm", siteConfig.url);
  link.searchParams.set("token_hash", data.properties.hashed_token);
  link.searchParams.set("type", input.type);
  link.searchParams.set("next", input.type === "recovery" ? "/admin/atur-password" : "/admin/akun");

  const content =
    input.type === "recovery"
      ? {
          subject: `Atur kata sandi baru ${siteConfig.name}`,
          preheader: "Klik tombol untuk mengatur kata sandi baru panel admin.",
          title: "Atur kata sandi baru",
          paragraphs: ["Kami menerima permintaan untuk mengatur ulang kata sandi panel admin Anda. Klik tombol di bawah untuk membuat kata sandi baru."],
          button: { label: "Atur kata sandi baru", href: link.toString() },
          to: input.email,
        }
      : {
          subject: `Konfirmasi email baru ${siteConfig.name}`,
          preheader: "Klik tombol untuk mengonfirmasi email baru panel admin.",
          title: "Konfirmasi email baru",
          paragraphs: [`Anda meminta mengganti email panel admin menjadi ${input.newEmail}. Klik tombol di bawah untuk mengonfirmasinya. Email lama tetap berlaku sampai Anda mengklik tombol ini.`],
          button: { label: "Konfirmasi email baru", href: link.toString() },
          to: input.newEmail,
        };

  const { html, text } = renderEmail({ ...content, note });
  await sendEmail({ to: content.to, subject: content.subject, html, text });
  return "sent";
}
