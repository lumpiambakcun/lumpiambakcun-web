import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusCard } from "@/components/sections/order-status-card";
import { ResumePayment } from "@/components/sections/resume-payment";
import { SnapScript } from "@/components/shared/snap-script";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { snapScriptUrl } from "@/lib/midtrans";
import { absoluteUrl } from "@/lib/seo";
import { getOrderByCode, isOrderCode, syncOrderStatus } from "@/lib/orders";

type OrderStatusContentProps = {
  params: Promise<{ kode: string }>;
};

export async function OrderStatusContent({ params }: OrderStatusContentProps) {
  const { kode } = await params;
  if (!isOrderCode(kode)) notFound();
  const found = await getOrderByCode(kode);
  if (!found) notFound();

  const order = await syncOrderStatus(found);
  const retry = order.status === "failed" || order.status === "expired" || order.status === "cancelled";

  const paid = order.status === "paid";
  const question = `Halo Mbak Cun, saya mau tanya pesanan ${order.code}.`;

  return (
    <>
      {order.status === "pending" && <SnapScript src={snapScriptUrl} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />}
      <OrderStatusCard
        order={order}
        actions={
          <>
            {order.status === "pending" && order.snap_token && <ResumePayment token={order.snap_token} />}
            {paid && (
              <Button asChild size="lg" className="h-10 px-5 text-sm">
                <a href={`/pesanan/${order.code}/nota`} download={`nota-${order.code}.png`}>
                  Simpan bukti pembayaran
                </a>
              </Button>
            )}
            {retry && (
              <Button asChild size="lg" className="h-10 px-5 text-sm">
                <Link href="/menu">Pesan ulang</Link>
              </Button>
            )}
            <WhatsAppButton variant="outline" size="lg" hideIcon message={paid ? `${question}\n${absoluteUrl(`/pesanan/${order.code}`)}` : question} className="h-10 px-5 text-sm">
              Tanya via WhatsApp
            </WhatsAppButton>
          </>
        }
      />
    </>
  );
}
