import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderStatusCard } from "@/components/sections/order-status-card";
import { ResumePayment } from "@/components/sections/resume-payment";
import { SnapScript } from "@/components/shared/snap-script";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { Button } from "@/components/ui/button";
import { snapScriptUrl } from "@/lib/midtrans";
import { getOrderByCode, syncOrderStatus } from "@/lib/orders";

type OrderStatusContentProps = {
  params: Promise<{ kode: string }>;
};

const CODE_PATTERN = /^LMC-[A-Z2-9]{10}$/;

export async function OrderStatusContent({ params }: OrderStatusContentProps) {
  const { kode } = await params;
  if (!CODE_PATTERN.test(kode)) notFound();
  const found = await getOrderByCode(kode);
  if (!found) notFound();

  const order = await syncOrderStatus(found);
  const retry = order.status === "failed" || order.status === "expired" || order.status === "cancelled";

  return (
    <>
      {order.status === "pending" && <SnapScript src={snapScriptUrl} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />}
      <OrderStatusCard
        order={order}
        actions={
          <>
            {order.status === "pending" && order.snap_token && <ResumePayment token={order.snap_token} />}
            {retry && (
              <Button asChild variant="brand" size="cta" className="h-[42px] w-full">
                <Link href="/menu">Pesan ulang</Link>
              </Button>
            )}
            <WhatsAppButton variant="outline-ink" message={`Halo Mbak Cun, saya mau tanya pesanan ${order.code}.`} className="h-11 w-full bg-white">
              Tanya via WhatsApp
            </WhatsAppButton>
          </>
        }
      />
    </>
  );
}
