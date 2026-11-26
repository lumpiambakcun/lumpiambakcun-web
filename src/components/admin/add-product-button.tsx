import { Plus } from "lucide-react";
import { connection } from "next/server";
import { ProductDialog } from "@/components/admin/product-dialog";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin-auth";
import { listAllProducts } from "@/lib/admin-products";
import { productChoices } from "@/lib/product-options";

export async function AddProductButton() {
  await connection();
  await requireAdmin();
  return (
    <ProductDialog
      choices={productChoices(await listAllProducts())}
      trigger={
        <Button className="h-10 px-4">
          <Plus data-icon="inline-start" aria-hidden="true" />
          Tambah produk
        </Button>
      }
    />
  );
}
