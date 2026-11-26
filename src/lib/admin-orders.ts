import "server-only";
import { z } from "zod";
import { manualPaymentMethods, type OrderStatus } from "@/content/checkout";
import { nameSchema, phoneSchema, purchasableSchema, wibDate } from "@/lib/checkout";
import { fieldErrors, formToObject } from "@/lib/form-data";
import { insertOrder, isOrderCode, type Order } from "@/lib/orders";
import { createAdminClient } from "@/lib/supabase/admin";

export const ORDER_PAGE_SIZE = 25;

const statuses: readonly OrderStatus[] = ["pending", "paid", "failed", "expired", "cancelled"];

export type OrderFilters = {
  status?: OrderStatus;
  rentang: "mendatang" | "semua";
  q: string;
  halaman: number;
};

type SearchParams = Record<string, string | string[] | undefined>;

export function parseOrderFilters(params: SearchParams): OrderFilters {
  const one = (key: string) => (typeof params[key] === "string" ? (params[key] as string) : "");
  const page = Number.parseInt(one("halaman"), 10);
  return {
    status: statuses.find((status) => status === one("status")),
    rentang: one("rentang") === "semua" ? "semua" : "mendatang",
    q: one("q").replace(/[,()%*_\\"']/g, " ").trim().slice(0, 60),
    halaman: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export async function listOrders({ status, rentang, q, halaman }: OrderFilters) {
  let query = createAdminClient().from("orders").select("*", { count: "exact" });
  if (status) query = query.eq("status", status);
  query =
    rentang === "mendatang"
      ? query.gte("pickup_at", new Date(`${wibDate(new Date())}T00:00:00+07:00`).toISOString()).order("pickup_at", { ascending: true })
      : query.order("created_at", { ascending: false });
  if (q) {
    const digits = q.replace(/\D/g, "").replace(/^0/, "62");
    const clauses = [`code.ilike.%${q}%`, `customer_name.ilike.%${q}%`, ...(digits.length >= 3 ? [`customer_phone.ilike.%${digits}%`] : [])];
    query = query.or(clauses.join(","));
  }

  const from = (halaman - 1) * ORDER_PAGE_SIZE;
  const { data, count, error } = await query.range(from, from + ORDER_PAGE_SIZE - 1);
  if (error?.code === "PGRST103") return { orders: [], total: 0 };
  if (error) throw new Error(`listOrders: ${error.message}`);
  return { orders: (data ?? []) as Order[], total: count ?? 0 };
}

const manualOrderSchema = z
  .object({
    produk: purchasableSchema,
    jumlah: z.coerce
      .number("Jumlah tidak valid.")
      .int("Jumlah tidak valid.")
      .min(1, "Jumlah tidak valid.")
      .max(99, "Maksimal 99 per pesanan."),
    nama: nameSchema,
    whatsapp: phoneSchema,
    catatan: z.string().max(200, "Catatan maksimal 200 karakter.").optional(),
    metode: z.enum(manualPaymentMethods.map((method) => method.id) as [string, ...string[]], "Pilih metode pembayaran."),
    status: z.enum(["paid", "pending"], "Pilih status pembayaran."),
    tanggal: z.string("Pilih tanggal ambil.").regex(/^\d{4}-\d{2}-\d{2}$/, "Pilih tanggal ambil."),
    jam: z.string("Pilih jam ambil.").regex(/^\d{2}:\d{2}$/, "Pilih jam ambil."),
  })
  .transform((data, ctx) => {
    const pickupAt = new Date(`${data.tanggal}T${data.jam}:00+07:00`);
    if (Number.isNaN(pickupAt.getTime())) {
      ctx.issues.push({ code: "custom", message: "Pilih tanggal ambil.", input: data.tanggal, path: ["tanggal"] });
      return z.NEVER;
    }
    return { ...data, pickupAt };
  });

export type ManualOrderState = { errors?: Record<string, string>; message?: string; code?: string };

export async function createManualOrder(formData: FormData): Promise<ManualOrderState> {
  const parsed = await manualOrderSchema.safeParseAsync(formToObject(formData));
  if (!parsed.success) return { errors: fieldErrors(parsed.error) };

  const { produk, jumlah, nama, whatsapp, catatan, metode, status, pickupAt } = parsed.data;
  const code = await insertOrder({
    product_id: produk.product.id,
    product_name: produk.product.card.name,
    variant: produk.product.card.variant,
    unit: produk.product.pack.unit,
    unit_price: produk.unitPrice,
    quantity: jumlah,
    total: produk.unitPrice * jumlah,
    customer_name: nama,
    customer_phone: whatsapp,
    customer_email: null,
    pickup_at: pickupAt.toISOString(),
    notes: catatan || null,
    payment_method: metode,
    source: "manual",
    status,
    paid_at: status === "paid" ? new Date().toISOString() : undefined,
  });
  return code ? { code } : { message: "Pesanan belum bisa disimpan. Coba lagi sebentar." };
}

export async function setManualOrderStatus(code: string, status: "paid" | "cancelled") {
  if (!isOrderCode(code)) return;
  const now = new Date().toISOString();
  const { error } = await createAdminClient()
    .from("orders")
    .update({ status, paid_at: status === "paid" ? now : null, updated_at: now })
    .eq("code", code)
    .eq("source", "manual")
    .eq("status", "pending");
  if (error) console.error("setManualOrderStatus: gagal memperbarui pesanan", error);
}
