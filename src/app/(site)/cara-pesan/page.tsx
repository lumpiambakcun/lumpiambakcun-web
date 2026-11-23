import { DeliveryOptions } from "@/components/sections/delivery-options";
import { OrderMethods } from "@/components/sections/order-methods";
import { OrderSection } from "@/components/sections/order-section";
import { OrderSteps } from "@/components/sections/order-steps";
import { caraPesanPage } from "@/content/cara-pesan";
import { doodleLayout } from "@/content/doodles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/cara-pesan");

export default function CaraPesanPage() {
  const { methods, steps, delivery, help } = caraPesanPage;
  return (
    <>
      <h1 className="sr-only">{caraPesanPage.heading}</h1>
      <OrderMethods id="metode" {...methods} doodles={doodleLayout.caraPesanMetode} />
      <OrderSteps id="langkah" {...steps} doodles={doodleLayout.caraPesanLangkah} />
      <DeliveryOptions id="pengiriman" {...delivery} doodles={doodleLayout.caraPesanPengiriman} />
      <OrderSection {...help} />
    </>
  );
}
