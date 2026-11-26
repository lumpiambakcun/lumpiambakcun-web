import { redirect } from "next/navigation";
import { connection } from "next/server";
import { CheckoutForm } from "@/components/sections/checkout-form";
import { SnapScript } from "@/components/shared/snap-script";
import { siteConfig } from "@/config/site";
import { paymentMethods } from "@/content/checkout";
import { quantitySchema, wibDate } from "@/lib/checkout";
import { getPurchasable } from "@/lib/products";
import { snapScriptUrl } from "@/lib/midtrans";
import { getContact } from "@/lib/site-settings";

type CheckoutContentProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const clock = (value: string) => value.replace(".", ":");

export async function CheckoutContent({ searchParams }: CheckoutContentProps) {
  const params = await searchParams;
  await connection();
  const purchasable = await getPurchasable(first(params.produk));
  if (!purchasable) redirect("/");
  const parsedQuantity = quantitySchema(purchasable.product.pack.pcs).safeParse(first(params.jumlah));
  if (!parsedQuantity.success) redirect(purchasable.product.card.href);
  const quantity = parsedQuantity.data;

  const { product, unitPrice } = purchasable;
  const { card } = product;
  const { hours: { opens, closes }, hoursLabel, fullLine } = await getContact();

  return (
    <>
      <SnapScript src={snapScriptUrl} clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      <CheckoutForm
        productId={product.id}
        summary={{ name: card.name, variant: card.variant, quantity, unit: product.pack.unit, image: card.image, lineTotal: unitPrice * quantity }}
        paymentMethods={paymentMethods}
        pickup={{
          address: `${fullLine}. ${hoursLabel}.`,
          minDate: wibDate(new Date()),
          opens: clock(opens),
          closes: clock(closes),
        }}
        whatsappMessage={`Halo Mbak Cun, saya mau pesan ${quantity} ${product.pack.unit} ${card.name} ${card.variant} (isi ${product.pack.pcs}).`}
        note={`Dengan membayar, kamu menyetujui syarat dan ketentuan ${siteConfig.name}.`}
      />
    </>
  );
}
