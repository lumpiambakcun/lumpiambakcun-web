import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

import type { OrderStatus } from "@/content/checkout";

export type { OrderStatus };

export type MidtransNotification = {
  order_id: string;
  status_code: string;
  gross_amount: string;
  signature_key: string;
  transaction_status: string;
  fraud_status?: string;
  payment_type?: string;
};

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
  const data = await response.json().catch(() => ({}));
  if (!response.ok || typeof data.token !== "string") {
    throw new Error(`Midtrans menolak transaksi (${response.status}): ${(data.error_messages ?? []).join("; ")}`);
  }
  return data.token as string;
}

export async function getTransactionStatus(orderCode: string): Promise<MidtransNotification | null> {
  const response = await fetch(`${apiBase}/v2/${encodeURIComponent(orderCode)}/status`, {
    headers: { Accept: "application/json", Authorization: authHeader() },
    cache: "no-store",
  });
  const data = await response.json().catch(() => null);
  if (!data || data.status_code === "404" || typeof data.transaction_status !== "string") return null;
  return data;
}

export function verifySignature(notification: MidtransNotification) {
  const { order_id, status_code, gross_amount, signature_key } = notification;
  if (![order_id, status_code, gross_amount, signature_key].every((value) => typeof value === "string")) return false;
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
