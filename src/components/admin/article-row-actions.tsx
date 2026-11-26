"use client";

import { Eye, EyeOff, ExternalLink, LoaderCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteArticleAction, setArticleStatusAction } from "@/app/admin/(panel)/artikel/actions";
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
import type { ArticleRow } from "@/lib/articles";

type ArticleRowActionsProps = {
  id: string;
  slug: string;
  title: string;
  status: ArticleRow["status"];
};

export function ArticleRowActions({ id, slug, title, status }: ArticleRowActionsProps) {
  const [pending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const published = status === "published";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={pending} aria-label={`Aksi untuk artikel ${title}`}>
            {pending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <MoreHorizontal aria-hidden="true" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href={`/admin/artikel/${id}`}>
              <Pencil aria-hidden="true" />
              Ubah artikel
            </Link>
          </DropdownMenuItem>
          {published && (
            <DropdownMenuItem asChild>
              <Link href={`/artikel/${slug}`} target="_blank">
                <ExternalLink aria-hidden="true" />
                Lihat di situs
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onSelect={() =>
              startTransition(async () => {
                await setArticleStatusAction(id, published ? "draft" : "published");
                toast.success(published ? "Artikel dijadikan draf." : "Artikel diterbitkan.");
              })
            }
          >
            {published ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            {published ? "Jadikan draf" : "Terbitkan"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmDelete(true)}>
            <Trash2 aria-hidden="true" />
            Hapus artikel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{`Hapus "${title}"?`}</AlertDialogTitle>
            <AlertDialogDescription>
              Artikel dan foto sampulnya dihapus permanen. Kalau hanya ingin menyembunyikan dari situs, pilih Jadikan draf.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Kembali</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmDelete(false);
                startTransition(async () => {
                  await deleteArticleAction(id);
                  toast.success("Artikel dihapus.");
                });
              }}
            >
              Hapus artikel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
