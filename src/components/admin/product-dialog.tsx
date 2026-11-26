"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ProductForm } from "@/components/admin/product-form";
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import type { ProductRow } from "@/lib/products";

type ProductDialogProps = {
  product?: ProductRow;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ProductDialog({ product, trigger, open: controlledOpen, onOpenChange }: ProductDialogProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const open = controlledOpen ?? innerOpen;
  const setOpen = onOpenChange ?? setInnerOpen;

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen} title={product ? "Ubah produk" : "Tambah produk"} trigger={trigger}>
      <ProductForm
        product={product}
        onCancel={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          toast.success(product ? "Produk diperbarui." : "Produk ditambahkan.");
        }}
      />
    </ResponsiveDialog>
  );
}
