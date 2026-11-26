import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/admin/page-header";
import { AddProductButton } from "@/components/admin/add-product-button";
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
          <Suspense
            fallback={
              <Button disabled className="h-10 px-4">
                <Plus data-icon="inline-start" aria-hidden="true" />
                Tambah produk
              </Button>
            }
          >
            <AddProductButton />
          </Suspense>
        }
      />
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductsContent />
      </Suspense>
    </>
  );
}
