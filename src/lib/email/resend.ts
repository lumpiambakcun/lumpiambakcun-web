import "server-only";
import { Resend } from "resend";

type Email = { to: string; subject: string; html: string; text: string };

export async function sendEmail({ to, subject, html, text }: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) throw new Error("RESEND_API_KEY atau RESEND_FROM belum diisi");

  const { error } = await new Resend(apiKey).emails.send({ from, to, subject, html, text });
  if (error) throw new Error(`Resend ${error.name}: ${error.message}`);
}
