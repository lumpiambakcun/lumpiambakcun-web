import { z } from "zod";
import { bulkOrder, businessConfig, maxOnlinePacks } from "@/config/site";
import { paymentMethods, type PaymentMethod } from "@/content/checkout";
import { getPurchasable } from "@/lib/products";
import { wibDate } from "@/lib/format";

export type CheckoutField = "nama" | "whatsapp" | "email" | "tanggal" | "jam" | "catatan" | "metode" | "produk";
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const MIN_LEAD_MINUTES = 60;
const MAX_LEAD_DAYS = 30;
const WIB_OFFSET = "+07:00";

export { wibDate };

const toMinutes = (clock: string) => {
  const [hours, minutes] = clock.split(/[.:]/).map(Number);
  return hours * 60 + minutes;
};

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("62") ? digits.slice(2) : digits.replace(/^0/, "");
  return /^8\d{8,11}$/.test(national) ? `62${national}` : null;
}

export const nameSchema = z
  .string("Isi nama lengkap (2 sampai 80 huruf).")
  .min(2, "Isi nama lengkap (2 sampai 80 huruf).")
  .max(80, "Isi nama lengkap (2 sampai 80 huruf).");

export const phoneSchema = z
  .string("Nomor WhatsApp tidak valid. Contoh: 0857-1364-4140.")
  .transform(normalizePhone)
  .pipe(z.string("Nomor WhatsApp tidak valid. Contoh: 0857-1364-4140."));

type Purchasable = NonNullable<Awaited<ReturnType<typeof getPurchasable>>>;
type Method = (typeof paymentMethods)[number];

export const purchasableSchema = z
  .string("Produk tidak valid. Kembali ke menu dan coba lagi.")
  .transform((id) => getPurchasable(id))
  .refine((value): value is Purchasable => value !== null, "Produk tidak valid. Kembali ke menu dan coba lagi.");

const methodSchema = z
  .string("Pilih metode pembayaran.")
  .transform((id) => paymentMethods.find((method) => method.id === id) ?? null)
  .refine((value): value is Method => value !== null, "Pilih metode pembayaran.");

export const quantitySchema = (pcs: number) =>
  z.coerce
    .number("Jumlah tidak valid.")
    .int("Jumlah tidak valid.")
    .min(1, "Jumlah tidak valid.")
    .max(maxOnlinePacks(pcs), `Pesanan ${bulkOrder.rule}`);

const { opens, closes } = businessConfig.hours;
const clock = z
  .string("Pilih jam ambil.")
  .regex(/^\d{2}:\d{2}$/, "Pilih jam ambil.")
  .refine((time) => toMinutes(time) >= toMinutes(opens) && toMinutes(time) <= toMinutes(closes), `Jam ambil antara ${opens} dan ${closes}.`);

const checkoutSchema = (now: Date) =>
  z
    .object({
      produk: purchasableSchema,
      jumlah: quantitySchema(1),
      nama: nameSchema,
      whatsapp: phoneSchema,
      email: z.union([z.literal(""), z.email().max(120)], "Format email tidak valid.").optional(),
      catatan: z.string().max(200, "Catatan maksimal 200 karakter.").optional(),
      metode: methodSchema,
      tanggal: z.string("Pilih tanggal ambil.").regex(/^\d{4}-\d{2}-\d{2}$/, "Pilih tanggal ambil."),
      jam: clock,
    })
    .transform((data, ctx) => {
      if (data.jumlah > maxOnlinePacks(data.produk.product.pack.pcs)) {
        ctx.issues.push({ code: "custom", message: `Pesanan ${bulkOrder.rule}`, input: data.jumlah, path: ["jumlah"] });
        return z.NEVER;
      }
      const pickupAt = new Date(`${data.tanggal}T${data.jam}:00${WIB_OFFSET}`);
      const problem = Number.isNaN(pickupAt.getTime())
        ? "Pilih tanggal ambil."
        : pickupAt.getTime() < now.getTime() + MIN_LEAD_MINUTES * 60_000
          ? "Waktu ambil minimal 1 jam dari sekarang."
          : pickupAt.getTime() > now.getTime() + MAX_LEAD_DAYS * 86_400_000
            ? `Waktu ambil maksimal ${MAX_LEAD_DAYS} hari ke depan.`
            : null;
      if (problem) {
        ctx.issues.push({ code: "custom", message: problem, input: data.tanggal, path: ["tanggal"] });
        return z.NEVER;
      }
      return {
        ...data.produk,
        quantity: data.jumlah,
        name: data.nama,
        phone: data.whatsapp,
        email: data.email || undefined,
        notes: data.catatan || undefined,
        pickupAt,
        method: data.metode.id as PaymentMethod,
        enabledPayments: data.metode.enabledPayments,
      };
    });

export async function validateCheckout(formData: FormData, now: Date) {
  const input = Object.fromEntries([...formData].map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
  const parsed = await checkoutSchema(now).safeParseAsync(input);
  if (parsed.success) return { ok: true as const, value: parsed.data };

  const errors: CheckoutErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] === "jumlah" ? "produk" : (issue.path[0] as CheckoutField);
    errors[field] ??= issue.message;
  }
  return { ok: false as const, errors };
}
