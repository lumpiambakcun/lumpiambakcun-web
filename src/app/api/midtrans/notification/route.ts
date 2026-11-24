import { NextResponse } from "next/server";
import { parseNotification, verifySignature } from "@/lib/midtrans";
import { applyPaymentStatus, getOrderByCode } from "@/lib/orders";

export async function POST(request: Request) {
  const notification = parseNotification(await request.json().catch(() => null));
  if (!notification) return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  if (!verifySignature(notification)) {
    return NextResponse.json({ error: "Tanda tangan tidak valid" }, { status: 401 });
  }

  const order = await getOrderByCode(notification.order_id);
  if (!order) return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
  if (Number(notification.gross_amount) !== order.total) {
    return NextResponse.json({ error: "Nominal tidak cocok" }, { status: 400 });
  }

  await applyPaymentStatus(order, notification);
  return NextResponse.json({ ok: true });
}
