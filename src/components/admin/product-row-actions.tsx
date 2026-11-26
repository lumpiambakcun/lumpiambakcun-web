"use client";

import { Eye, EyeOff, LoaderCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteProductAction, setProductActiveAction } from "@/app/admin/(panel)/produk/actions";
import { ProductDialog } from "@/components/admin/product-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ProductChoices } from "@/lib/product-options";
import type { ProductRow } from "@/lib/products";

export function ProductRowActions({ product, choices }: { product: ProductRow; choices: ProductChoices }) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const label = `${product.name} ${product.variant}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={pending} aria-label={`Aksi untuk ${label}`}>
            {pending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <MoreHorizontal aria-hidden="true" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onSelect={() => setEditing(true)}>
            <Pencil aria-hidden="true" />
            Ubah produk
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() =>
              startTransition(async () => {
                await setProductActiveAction(product.id, !product.active);
                toast.success(product.active ? `${label} disembunyikan dari situs.` : `${label} tampil lagi di situs.`);
              })
            }
          >
            {product.active ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            {product.active ? "Sembunyikan dari situs" : "Tampilkan di situs"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmDelete(true)}>
            <Trash2 aria-hidden="true" />
            Hapus produk
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductDialog product={product} choices={choices} open={editing} onOpenChange={setEditing} />
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Hapus ${label}?`}</AlertDialogTitle>
            <AlertDialogDescription>
              Produk dan fotonya dihapus permanen dari situs. Pesanan yang sudah masuk tidak terpengaruh. Kalau hanya ingin berhenti menjual sementara, pilih Sembunyikan dari situs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmDelete(false);
                startTransition(async () => {
                  await deleteProductAction(product.id);
                  toast.success(`${label} dihapus.`);
                });
              }}
            >
              Hapus produk
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
