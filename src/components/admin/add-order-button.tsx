import { AddOrderDialog } from "@/components/admin/add-order-dialog";
import { businessConfig } from "@/config/site";
import { manualPaymentMethods } from "@/content/checkout";
import { menuProducts, packagingOf } from "@/content/menu";
import { parseRupiah } from "@/lib/currency";

const products = menuProducts.flatMap(({ id, card }) =>
  card.price ? [{ value: id, label: `${card.name} ${card.variant} · ${card.price} / ${packagingOf(card.variant)}`, price: parseRupiah(card.price) }] : [],
);
const methods = manualPaymentMethods.map(({ id, label }) => ({ value: id, label }));

export function AddOrderButton() {
  return <AddOrderDialog products={products} methods={methods} hours={businessConfig.hours} />;
}
