import { brandColors, siteConfig } from "@/config/site";

type EmailContent = {
  preheader: string;
  title: string;
  paragraphs: readonly string[];
  button: { label: string; href: string };
  note: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string);

const font = "font-family:Arial,Helvetica,sans-serif;";

// Layout tabel dengan style inline: Gmail dan Outlook tidak memahami CSS variable maupun class Tailwind.
export function renderEmail({ preheader, title, paragraphs, button, note }: EmailContent) {
  const { brand, highlight, cream, ink } = brandColors;
  const href = escapeHtml(button.href);

  const html = `<!doctype html>
<html lang="${siteConfig.language}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${cream};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${cream};">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
    <tr><td align="center" bgcolor="${brand}" style="background:${brand};padding:22px 24px;border-radius:12px 12px 0 0;${font}font-size:22px;font-weight:bold;color:${highlight};">${escapeHtml(siteConfig.name)}</td></tr>
    <tr><td bgcolor="white" style="background:white;padding:32px 28px;border:1px solid ${highlight};border-top:0;border-radius:0 0 12px 12px;${font}color:${ink};">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.25;color:${ink};">${escapeHtml(title)}</h1>
      ${paragraphs.map((text) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.55;color:${ink};">${escapeHtml(text)}</p>`).join("\n      ")}
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;"><tr>
        <td bgcolor="${highlight}" style="background:${highlight};border-radius:8px;"><a href="${href}" style="display:inline-block;padding:14px 28px;${font}font-size:15px;font-weight:bold;color:${ink};text-decoration:none;">${escapeHtml(button.label)}</a></td>
      </tr></table>
      <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:${ink};">Jika tombol tidak berfungsi, salin tautan ini ke browser:</p>
      <p style="margin:0 0 24px;font-size:13px;line-height:1.5;word-break:break-all;"><a href="${href}" style="color:${brand};">${href}</a></p>
      <p style="margin:0;padding-top:16px;border-top:2px solid ${cream};font-size:12px;line-height:1.5;color:${ink};">${escapeHtml(note)}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [title, ...paragraphs, `${button.label}: ${button.href}`, note].join("\n\n");
  return { html, text };
}
