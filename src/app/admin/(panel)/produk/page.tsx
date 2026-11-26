import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { ProductDialog } from "@/components/admin/product-dialog";
import { ProductTableSkeleton } from "@/components/admin/product-table";
import { ProductsContent } from "@/components/admin/products-content";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Produk" };

export default function AdminProductsPage() {
  return (
    <>
      <PageHeader
        title="Produk"
        actions={
          <ProductDialog
            trigger={
              <Button className="h-10 px-4">
                <Plus data-icon="inline-start" aria-hidden="true" />
                Tambah produk
              </Button>
            }
          />
        }
      />
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
