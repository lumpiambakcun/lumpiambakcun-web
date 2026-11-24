import { businessConfig } from "@/config/site";
import { paymentMethods, type PaymentMethod } from "@/content/checkout";
import { getProduct } from "@/content/menu";
import { parseRupiah } from "@/lib/currency";

export const quantityLimits = { min: 1, max: 99 } as const;

export type CheckoutField = "nama" | "whatsapp" | "email" | "tanggal" | "jam" | "catatan" | "metode" | "produk";
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

const MIN_LEAD_MINUTES = 60;
const MAX_LEAD_DAYS = 30;
const WIB_OFFSET = "+07:00";

export const wibDate = (date: Date) => new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Jakarta" }).format(date);

const toMinutes = (clock: string) => {
  const [hours, minutes] = clock.split(/[.:]/).map(Number);
  return hours * 60 + minutes;
};

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("62") ? digits.slice(2) : digits.replace(/^0/, "");
  return /^8\d{8,11}$/.test(national) ? `62${national}` : null;
}

export function parseQuantity(value: unknown) {
  const quantity = Number(value);
  return Number.isInteger(quantity) && quantity >= quantityLimits.min && quantity <= quantityLimits.max ? quantity : null;
}

export function getPurchasable(productId: unknown) {
  const product = typeof productId === "string" ? getProduct(productId) : undefined;
  return product?.card.price ? { product, unitPrice: parseRupiah(product.card.price) } : null;
}

export function validateCheckout(formData: FormData, now: Date) {
  const text = (key: string) => String(formData.get(key) ?? "").trim();
  const errors: CheckoutErrors = {};

  const purchasable = getPurchasable(text("produk"));
  const quantity = parseQuantity(text("jumlah"));
  if (!purchasable || !quantity) errors.produk = "Produk atau jumlah tidak valid. Kembali ke menu dan coba lagi.";

  const name = text("nama");
  if (name.length < 2 || name.length > 80) errors.nama = "Isi nama lengkap (2 sampai 80 huruf).";

  const phone = normalizePhone(text("whatsapp"));
  if (!phone) errors.whatsapp = "Nomor WhatsApp tidak valid. Contoh: 0857-1364-4140.";

  const email = text("email");
  if (email && (email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) errors.email = "Format email tidak valid.";

  const notes = text("catatan");
  if (notes.length > 200) errors.catatan = "Catatan maksimal 200 karakter.";

  const method = paymentMethods.find((item) => item.id === text("metode"));
  if (!method) errors.metode = "Pilih metode pembayaran.";

  const date = text("tanggal");
  const time = text("jam");
  const pickupAt = new Date(`${date}T${time}:00${WIB_OFFSET}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(pickupAt.getTime())) {
    errors.tanggal = "Pilih tanggal ambil.";
  } else if (pickupAt.getTime() < now.getTime() + MIN_LEAD_MINUTES * 60_000) {
    errors.tanggal = "Waktu ambil minimal 1 jam dari sekarang.";
  } else if (pickupAt.getTime() > now.getTime() + MAX_LEAD_DAYS * 86_400_000) {
    errors.tanggal = `Waktu ambil maksimal ${MAX_LEAD_DAYS} hari ke depan.`;
  }
  const { opens, closes } = businessConfig.hours;
  if (!/^\d{2}:\d{2}$/.test(time) || toMinutes(time) < toMinutes(opens) || toMinutes(time) > toMinutes(closes)) {
    errors.jam = `Jam ambil antara ${opens} dan ${closes}.`;
  }

  if (Object.keys(errors).length > 0 || !purchasable || !quantity || !phone || !method) return { ok: false as const, errors };
  return {
    ok: true as const,
    value: {
      ...purchasable,
      quantity,
      name,
      phone,
      email: email || undefined,
      notes: notes || undefined,
      pickupAt,
      method: method.id as PaymentMethod,
      enabledPayments: method.enabledPayments,
    },
  };
}
