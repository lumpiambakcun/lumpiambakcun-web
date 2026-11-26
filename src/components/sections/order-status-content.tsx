import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusCard } from "@/components/sections/order-status-card";
import { ResumePayment } from "@/components/sections/resume-payment";
import { SnapScript } from "@/components/shared/snap-script";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { snapScriptUrl } from "@/lib/midtrans";
import { getOrderByCode, isOrderCode, syncOrderStatus } from "@/lib/orders";
import { getContact } from "@/lib/site-settings";

type OrderStatusContentProps = {
  params: Promise<{ kode: string }>;
};

export async function OrderStatusContent({ params }: OrderStatusContentProps) {
  const { kode } = await params;
  if (!isOrderCode(kode)) notFound();
  const found = await getOrderByCode(kode);
  if (!found) notFound();

  const [order, contact] = await Promise.all([syncOrderStatus(found), getContact()]);
  const retry = order.status === "failed" || order.status === "expired" || order.status === "cancelled";

  const paid = order.status === "paid";

  return (
    <>
      {order.status === "pending" && <SnapScript src={snapScriptUrl} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />}
      <OrderStatusCard
        order={order}
        pickup={{ mapsUrl: contact.mapsUrl, address: contact.fullLine }}
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
                <Link href="/#menu">Pesan ulang</Link>
              </Button>
            )}
            <WhatsAppButton
              variant="accent"
              size="lg"
              hideIcon
              message={`Halo Mbak Cun, saya mau tanya pesanan ${order.code}.`}
              className="h-10 px-5 text-sm font-semibold tracking-normal normal-case"
            >
              Tanya via WhatsApp
            </WhatsAppButton>
          </>
        }
      />
    </>
  );
}
