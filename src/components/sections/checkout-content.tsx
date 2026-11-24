import { redirect } from "next/navigation";
import { connection } from "next/server";
import { CheckoutForm } from "@/components/sections/checkout-form";
import { SnapScript } from "@/components/shared/snap-script";
import { businessConfig, siteConfig } from "@/config/site";
import { paymentMethods } from "@/content/checkout";
import { getPurchasable, parseQuantity, wibDate } from "@/lib/checkout";
import { snapScriptUrl } from "@/lib/midtrans";

type CheckoutContentProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const clock = (value: string) => value.replace(".", ":");

export async function CheckoutContent({ searchParams }: CheckoutContentProps) {
  const params = await searchParams;
  await connection();
  const purchasable = getPurchasable(first(params.produk));
  const quantity = parseQuantity(first(params.jumlah));
  if (!purchasable || !quantity) redirect("/menu");

  const { product, unitPrice } = purchasable;
  const { card } = product;
  const { opens, closes } = businessConfig.hours;

  return (
    <>
      <SnapScript src={snapScriptUrl} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      <CheckoutForm
        productId={product.id}
        summary={{ name: card.name, variant: card.variant, quantity, image: card.image, lineTotal: unitPrice * quantity }}
        paymentMethods={paymentMethods}
        pickup={{
          address: `${businessConfig.address.fullLine}. ${businessConfig.hours.label}.`,
          minDate: wibDate(new Date()),
          opens: clock(opens),
          closes: clock(closes),
        }}
        whatsappMessage={`Halo Mbak Cun, saya mau pesan ${quantity} pack ${card.name} ${card.variant} (isi 10).`}
        note={`Dengan membayar, kamu menyetujui syarat dan ketentuan ${siteConfig.name}.`}
      />
    </>
  );
}
