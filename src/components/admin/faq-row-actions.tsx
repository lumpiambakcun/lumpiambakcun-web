"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteFaqAction } from "@/app/admin/(panel)/faq/actions";
import { FaqDialog } from "@/components/admin/faq-dialog";
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { FaqRow } from "@/lib/faqs";

type FaqRowActionsProps = {
  faq: FaqRow;
  editing: boolean;
  onEditingChange: (open: boolean) => void;
};

export function FaqRowActions({ faq, editing, onEditingChange }: FaqRowActionsProps) {
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon" disabled={pending} aria-label={`Aksi untuk ${faq.question}`}>
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onSelect={() => onEditingChange(true)}>
            <Pencil aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmDelete(true)}>
            <Trash2 aria-hidden="true" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FaqDialog faq={faq} open={editing} onOpenChange={onEditingChange} />
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus FAQ ini?</AlertDialogTitle>
            <AlertDialogDescription>{`"${faq.question}" dihapus permanen. Untuk menyembunyikan saja, matikan saklarnya.`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmDelete(false);
                startTransition(async () => {
                  await deleteFaqAction(faq.id);
                  toast.success("FAQ dihapus.");
                });
              }}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
