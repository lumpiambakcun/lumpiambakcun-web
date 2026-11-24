"use client";

import { CircleCheck, ExternalLink, LoaderCircle, MessageCircle, MoreHorizontal, XCircle } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cancelOrder, markPaid } from "@/app/admin/(panel)/actions";
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

type OrderRowActionsProps = {
  code: string;
  phone: string;
  canChangeStatus: boolean;
};

export function OrderRowActions({ code, phone, canChangeStatus }: OrderRowActionsProps) {
  const [pending, startTransition] = useTransition();
  const [confirmCancel, setConfirmCancel] = useState(false);

  const change = (action: (formData: FormData) => Promise<void>, message: string) => {
    const formData = new FormData();
    formData.set("kode", code);
    startTransition(async () => {
      await action(formData);
      toast.success(message);
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={pending} aria-label={`Aksi untuk pesanan ${code}`}>
            {pending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <MoreHorizontal aria-hidden="true" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href={`/pesanan/${code}`} target="_blank">
              <ExternalLink aria-hidden="true" />
              Lihat detail
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              Chat WhatsApp
            </a>
          </DropdownMenuItem>
          {canChangeStatus && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => change(markPaid, `Pesanan ${code} ditandai lunas.`)}>
                <CircleCheck aria-hidden="true" />
                Tandai lunas
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onSelect={() => setConfirmCancel(true)}>
                <XCircle aria-hidden="true" />
                Batalkan pesanan
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmCancel} onOpenChange={setConfirmCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Batalkan pesanan ${code}?`}</AlertDialogTitle>
            <AlertDialogDescription>Status berubah menjadi Dibatalkan dan tidak bisa dikembalikan dari panel ini.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmCancel(false);
                change(cancelOrder, `Pesanan ${code} dibatalkan.`);
              }}
            >
              Batalkan pesanan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
