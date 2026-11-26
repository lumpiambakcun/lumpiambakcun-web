"use server";

import { siteConfig } from "@/config/site";
import { type CheckoutErrors, validateCheckout } from "@/lib/checkout";
import { createSnapTransaction } from "@/lib/midtrans";
import { insertOrder } from "@/lib/orders";
import { createAdminClient } from "@/lib/supabase/admin";

export type CheckoutState = {
  errors?: CheckoutErrors;
  message?: string;
  order?: { code: string; token: string };
};

const failure = (message: string): CheckoutState => ({ message });

export async function createOrder(formData: FormData): Promise<CheckoutState> {
  try {
    return await placeOrder(formData);
  } catch (error) {
    console.error("createOrder: kesalahan tak terduga", error);
    return failure("Pesanan belum bisa diproses. Coba lagi sebentar atau pesan via WhatsApp.");
  }
}

async function placeOrder(formData: FormData): Promise<CheckoutState> {
  const result = await validateCheckout(formData, new Date());
  if (!result.ok) return { errors: result.errors };

  const { product, unitPrice, quantity, name, phone, email, notes, pickupAt, method, enabledPayments } = result.value;
  const total = unitPrice * quantity;
  const label = `${product.card.name} ${product.card.variant}`;
  const supabase = createAdminClient();

  const code = await insertOrder({
    product_id: product.id,
    product_name: product.card.name,
    variant: product.card.variant,
    unit: product.pack.unit,
    unit_price: unitPrice,
    quantity,
    total,
    customer_name: name,
    customer_phone: phone,
    customer_email: email ?? null,
    pickup_at: pickupAt.toISOString(),
    notes: notes ?? null,
    payment_method: method,
  });
  if (!code) return failure("Pesanan belum bisa disimpan. Coba lagi sebentar atau pesan via WhatsApp.");

  try {
    const token = await createSnapTransaction({
      orderCode: code,
      amount: total,
      item: { id: product.id, name: label, price: unitPrice, quantity },
      customer: { name, phone, email },
      enabledPayments,
      finishUrl: `${siteConfig.url}/pesanan/${code}`,
    });
    await supabase.from("orders").update({ snap_token: token }).eq("code", code);
    return { order: { code, token } };
  } catch (error) {
    console.error("createOrder: gagal membuat transaksi Midtrans", error);
    await supabase.from("orders").update({ status: "failed", updated_at: new Date().toISOString() }).eq("code", code);
    return failure("Pembayaran belum bisa dimulai. Coba lagi sebentar atau pesan via WhatsApp.");
  }
}
