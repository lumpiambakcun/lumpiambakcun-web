import { z } from "zod";

export const topBarIcons = ["truck", "check", "info"] as const;
export const socialPlatforms = ["instagram", "tiktok", "facebook", "youtube", "website"] as const;
export const socialLabels: Record<(typeof socialPlatforms)[number], string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  youtube: "YouTube",
  website: "Situs web",
};

const text = (label: string, max: number) =>
  z.string(`Isi ${label}.`).trim().min(1, `Isi ${label}.`).max(max, `${label[0].toUpperCase()}${label.slice(1)} maksimal ${max} karakter.`);

const httpsUrl = (label: string) =>
  z
    .string(`Isi ${label}.`)
    .trim()
    .max(300, `${label[0].toUpperCase()}${label.slice(1)} terlalu panjang.`)
    .regex(/^https:\/\/\S+$/, `${label[0].toUpperCase()}${label.slice(1)} harus diawali https://`);

const imagePath = z.string().trim().min(1, "Logo belum ada.").max(500);

export const linkKinds = ["internal", "external", "whatsapp"] as const;

export const linkSchema = z
  .object({
    label: text("label", 40),
    kind: z.enum(linkKinds, "Pilih jenis tautan."),
    value: z.string("Isi tujuan tautan.").trim().min(1, "Isi tujuan tautan.").max(300, "Tujuan tautan terlalu panjang."),
  })
  .superRefine((link, ctx) => {
    if (link.kind === "internal" && !/^\/(?!\/)[\w\-#/?=&.]*$/.test(link.value)) {
      ctx.addIssue({ code: "custom", path: ["value"], message: "Alamat halaman diawali /, contoh: /artikel atau /#menu." });
    }
    if (link.kind === "external" && !/^https:\/\/\S+$/.test(link.value)) {
      ctx.addIssue({ code: "custom", path: ["value"], message: "Tautan luar harus diawali https://" });
    }
  });

export const headerSchema = z.object({
  brand: z.object({ name: text("nama brand", 40), tagline: text("tagline", 60), logoUrl: imagePath }),
  topBar: z
    .array(z.object({ icon: z.enum(topBarIcons), text: text("pesan", 140), active: z.boolean() }))
    .max(6, "Maksimal 6 pesan."),
  nav: z.array(linkSchema).max(8, "Maksimal 8 menu."),
  cta: z.object({ label: text("teks tombol", 30), message: text("pesan WhatsApp", 200) }),
  extraCtas: z
    .array(z.object({ link: linkSchema, style: z.enum(["primary", "outline"]), showInHeader: z.boolean() }))
    .max(3, "Maksimal 3 tombol tambahan."),
});

const clock = z.string("Isi jam.").trim().regex(/^\d{2}\.\d{2}$/, "Format jam HH.MM, contoh 09.00.");

const coordinate = (label: string, limit: number) => {
  const name = `${label[0].toUpperCase()}${label.slice(1)}`;
  return z
    .union([z.string().trim().min(1, `Isi ${label}.`), z.number()], `Isi ${label}.`)
    .transform(Number)
    .pipe(z.number(`${name} harus angka.`).min(-limit, `${name} ${-limit} sampai ${limit}.`).max(limit, `${name} ${-limit} sampai ${limit}.`));
};

export const footerSchema = z.object({
  logoUrl: imagePath,
  description: text("deskripsi", 200),
  copyright: text("teks hak cipta", 120),
  columns: z
    .array(z.object({ title: text("judul kolom", 30), links: z.array(linkSchema).max(10, "Maksimal 10 tautan per kolom.") }))
    .max(3, "Maksimal 3 kolom."),
  social: z
    .array(z.object({ platform: z.enum(socialPlatforms, "Pilih platform."), url: httpsUrl("URL") }))
    .max(8, "Maksimal 8 media sosial."),
  halal: z.object({ number: text("nomor halal", 40) }),
  contact: z.object({
    phoneDisplay: text("nomor tampilan", 30),
    phoneIntl: z.string("Isi nomor WhatsApp.").trim().regex(/^62\d{8,13}$/, "Nomor diawali 62, hanya angka, contoh 6285713644140."),
    mapsUrl: httpsUrl("tautan peta"),
    address: z.object({
      street: text("jalan", 100),
      district: text("kecamatan", 80),
      city: text("kota", 60),
      postalLine: text("alamat lengkap", 200),
    }),
    hours: z.object({ opens: clock, closes: clock }),
    geo: z.object({
      lat: coordinate("lintang", 90),
      lng: coordinate("bujur", 180),
    }),
  }),
});

export type SiteLink = z.infer<typeof linkSchema>;
export type HeaderSettings = z.infer<typeof headerSchema>;
export type FooterSettings = z.infer<typeof footerSchema>;
export type SocialPlatform = (typeof socialPlatforms)[number];

export type Contact = FooterSettings["contact"] & {
  fullLine: string;
  hoursLabel: string;
  halalNumber: string;
  instagramUrl: string | null;
};

export function deriveContact(footer: FooterSettings): Contact {
  const { contact } = footer;
  const { street, district, city } = contact.address;
  return {
    ...contact,
    fullLine: `${street}, ${district}, ${city}`,
    hoursLabel: `Buka setiap hari, ${contact.hours.opens} sampai ${contact.hours.closes}`,
    halalNumber: footer.halal.number,
    instagramUrl: footer.social.find((item) => item.platform === "instagram")?.url ?? null,
  };
}
