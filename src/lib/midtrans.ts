import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

import { z } from "zod";
import type { OrderStatus } from "@/content/checkout";

export type { OrderStatus };

const notificationSchema = z.object({
  order_id: z.string(),
  status_code: z.string(),
  gross_amount: z.string(),
  signature_key: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string().optional(),
  payment_type: z.string().optional(),
});

const snapResponseSchema = z.object({ token: z.string().optional(), error_messages: z.array(z.string()).optional() });

export type MidtransNotification = z.infer<typeof notificationSchema>;

export const parseNotification = (data: unknown) => notificationSchema.safeParse(data).data ?? null;

type SnapRequest = {
  orderCode: string;
  amount: number;
  item: { id: string; name: string; price: number; quantity: number };
  customer: { name: string; phone: string; email?: string };
  enabledPayments: readonly string[];
  finishUrl: string;
};

const production = process.env.MIDTRANS_IS_PRODUCTION === "true";
const snapBase = production ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";
const apiBase = production ? "https://api.midtrans.com" : "https://api.sandbox.midtrans.com";

export const snapScriptUrl = `${snapBase}/snap/snap.js`;

function serverKey() {
  const key = process.env.MIDTRANS_SERVER_KEY;
  if (!key) throw new Error("MIDTRANS_SERVER_KEY belum diisi");
  return key;
}

function authHeader() {
  return `Basic ${Buffer.from(`${serverKey()}:`).toString("base64")}`;
}

export async function createSnapTransaction({ orderCode, amount, item, customer, enabledPayments, finishUrl }: SnapRequest) {
  const response = await fetch(`${snapBase}/snap/v1/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: authHeader() },
    body: JSON.stringify({
      transaction_details: { order_id: orderCode, gross_amount: amount },
      item_details: [{ id: item.id, name: item.name.slice(0, 50), price: item.price, quantity: item.quantity }],
      customer_details: { first_name: customer.name, phone: customer.phone, ...(customer.email && { email: customer.email }) },
      enabled_payments: enabledPayments,
      expiry: { unit: "hours", duration: 24 },
      callbacks: { finish: finishUrl },
    }),
    cache: "no-store",
  });
  const data = snapResponseSchema.safeParse(await response.json().catch(() => null)).data;
  if (!response.ok || !data?.token) {
    throw new Error(`Midtrans menolak transaksi (${response.status}): ${(data?.error_messages ?? []).join("; ")}`);
  }
  return data.token;
}

export async function getTransactionStatus(orderCode: string): Promise<MidtransNotification | null> {
  const response = await fetch(`${apiBase}/v2/${encodeURIComponent(orderCode)}/status`, {
    headers: { Accept: "application/json", Authorization: authHeader() },
    cache: "no-store",
  });
  return parseNotification(await response.json().catch(() => null));
}

export function verifySignature(notification: MidtransNotification) {
  const { order_id, status_code, gross_amount, signature_key } = notification;
  const expected = createHash("sha512").update(`${order_id}${status_code}${gross_amount}${serverKey()}`).digest();
  const actual = Buffer.from(signature_key, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function mapStatus({ transaction_status, fraud_status }: Pick<MidtransNotification, "transaction_status" | "fraud_status">): OrderStatus | null {
  switch (transaction_status) {
    case "settlement":
      return "paid";
    case "capture":
      return fraud_status === "challenge" ? "pending" : "paid";
    case "pending":
      return "pending";
    case "deny":
    case "failure":
      return "failed";
    case "cancel":
      return "cancelled";
    case "expire":
      return "expired";
    default:
      return null;
  }
}
