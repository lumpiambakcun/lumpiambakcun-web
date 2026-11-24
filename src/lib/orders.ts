import "server-only";
import { randomInt } from "node:crypto";
import { type MidtransNotification, type OrderStatus, getTransactionStatus, mapStatus } from "@/lib/midtrans";
import { createAdminClient } from "@/lib/supabase/admin";

export type Order = {
  id: string;
  code: string;
  product_id: string;
  product_name: string;
  variant: string;
  unit_price: number;
  quantity: number;
  total: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  pickup_at: string;
  notes: string | null;
  payment_method: string;
  status: OrderStatus;
  payment_type: string | null;
  snap_token: string | null;
  paid_at: string | null;
  created_at: string;
};

const codePattern = /^LMC-[A-Z2-9]{10}$/;

export function isOrderCode(code: string) {
  return codePattern.test(code);
}

const codeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateOrderCode() {
  return `LMC-${Array.from({ length: 10 }, () => codeAlphabet[randomInt(codeAlphabet.length)]).join("")}`;
}

export async function getOrderByCode(code: string) {
  const { data } = await createAdminClient().from("orders").select("*").eq("code", code).maybeSingle<Order>();
  return data;
}

export async function applyPaymentStatus(order: Order, notification: Pick<MidtransNotification, "transaction_status" | "fraud_status" | "payment_type">) {
  const status = mapStatus(notification);
  if (!status || order.status === "paid" || (status === order.status && !notification.payment_type)) return order;
  const now = new Date().toISOString();
  const { data } = await createAdminClient()
    .from("orders")
    .update({
      status,
      payment_type: notification.payment_type ?? order.payment_type,
      paid_at: status === "paid" ? now : null,
      updated_at: now,
    })
    .eq("id", order.id)
    .neq("status", "paid")
    .select("*")
    .maybeSingle<Order>();
  return data ?? order;
}

export async function syncOrderStatus(order: Order) {
  if (order.status !== "pending") return order;
  const remote = await getTransactionStatus(order.code).catch(() => null);
  return remote && remote.order_id === order.code ? applyPaymentStatus(order, remote) : order;
}
