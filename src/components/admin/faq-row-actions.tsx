"use client";

import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteFaqAction, moveFaqAction } from "@/app/admin/(panel)/faq/actions";
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
import type { FaqRow } from "@/lib/faqs";

type FaqRowActionsProps = {
  faq: FaqRow;
  isFirst: boolean;
  isLast: boolean;
};

export function FaqRowActions({ faq, isFirst, isLast }: FaqRowActionsProps) {
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const move = (direction: "up" | "down") => startTransition(() => moveFaqAction(faq.id, direction));

  return (
    <div className="flex items-center justify-end gap-0.5">
      <Button variant="ghost" size="icon" disabled={pending || isFirst} onClick={() => move("up")} aria-label="Naikkan urutan">
        <ArrowUp aria-hidden="true" />
      </Button>
      <Button variant="ghost" size="icon" disabled={pending || isLast} onClick={() => move("down")} aria-label="Turunkan urutan">
        <ArrowDown aria-hidden="true" />
      </Button>
      <FaqDialog
        faq={faq}
        trigger={
          <Button variant="ghost" size="icon" aria-label="Ubah FAQ">
            <Pencil aria-hidden="true" />
          </Button>
        }
      />
      <Button variant="ghost" size="icon" disabled={pending} onClick={() => setConfirmDelete(true)} aria-label="Hapus FAQ">
        <Trash2 aria-hidden="true" />
      </Button>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus FAQ ini?</AlertDialogTitle>
            <AlertDialogDescription>{`"${faq.question}" dihapus permanen. Untuk menyembunyikan saja, ubah statusnya jadi Nonaktif.`}</AlertDialogDescription>
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
    </div>
  );
}
