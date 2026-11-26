import { connection } from "next/server";
import { ProductTable } from "@/components/admin/product-table";
import { requireAdmin } from "@/lib/admin-auth";
import { listAllProducts } from "@/lib/admin-products";

export async function ProductsContent() {
  await connection();
  await requireAdmin();
  return <ProductTable products={await listAllProducts()} />;
}
