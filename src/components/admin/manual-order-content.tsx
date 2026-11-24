import { connection } from "next/server";
import { ManualOrderForm } from "@/components/admin/manual-order-form";
import { businessConfig } from "@/config/site";
import { manualPaymentMethods } from "@/content/checkout";
import { menuProducts, packagingOf } from "@/content/menu";
import { requireAdmin } from "@/lib/admin-auth";
import { wibDate } from "@/lib/checkout";

const products = menuProducts.map(({ id, card }) => ({
  value: id,
  label: `${card.name} ${card.variant} · ${card.price} / ${packagingOf(card.variant)}`,
}));
const methods = manualPaymentMethods.map(({ id, label }) => ({ value: id, label }));

export async function ManualOrderContent() {
  await connection();
  await requireAdmin();
  return <ManualOrderForm products={products} methods={methods} hours={businessConfig.hours} today={wibDate(new Date())} />;
}
