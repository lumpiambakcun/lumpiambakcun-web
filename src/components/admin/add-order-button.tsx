import { AddOrderDialog } from "@/components/admin/add-order-dialog";
import { manualPaymentMethods } from "@/content/checkout";
import { parseRupiah } from "@/lib/currency";
import { listProducts } from "@/lib/products";
import { getContact } from "@/lib/site-settings";

const methods = manualPaymentMethods.map(({ id, label }) => ({ value: id, label }));

export async function AddOrderButton() {
  const [productList, { hours }] = await Promise.all([listProducts(), getContact()]);
  const products = productList.flatMap(({ id, card, pack }) =>
    card.price ? [{ value: id, name: `${card.name} ${card.variant}`, price: parseRupiah(card.price), unit: pack.unit, pcs: pack.pcs, image: card.image.src }] : [],
  );
  return <AddOrderDialog products={products} methods={methods} hours={hours} />;
}
