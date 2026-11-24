"use client";

import { ChevronDown, ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { signOut } from "@/app/admin/(auth)/actions";
import { SubmitButton } from "@/components/shared/submit-button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ProfileMenuViewProps = {
  name: string;
  email: string;
  avatarUrl?: string;
};

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export function ProfileMenuView({ name, email, avatarUrl }: ProfileMenuViewProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          ref={triggerRef}
          className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors outline-none hover:bg-canvas focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-canvas"
        >
          <Avatar className="size-8">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
            <AvatarFallback className="bg-canvas text-xs font-semibold text-ink">{initialsOf(name) || "A"}</AvatarFallback>
          </Avatar>
          <span className="hidden max-w-40 truncate text-sm font-medium text-ink sm:block">{name}</span>
          <ChevronDown className="size-4 text-ink-muted" aria-hidden="true" />
          <span className="sr-only">Menu profil</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col gap-0.5 font-normal">
            <span className="truncate text-sm font-semibold text-ink">{name}</span>
            <span className="truncate text-xs text-ink-muted">{email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/" target="_blank" rel="noopener">
              <ExternalLink aria-hidden="true" />
              Lihat Situs
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={() => setConfirmOpen(true)}>
            <LogOut aria-hidden="true" />
            Keluar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Keluar dari panel admin?</AlertDialogTitle>
            <AlertDialogDescription>Anda perlu masuk lagi untuk membuka panel ini.</AlertDialogDescription>
          </AlertDialogHeader>
          <form action={signOut}>
            <AlertDialogFooter className="m-0 -mx-4 -mb-4 mt-0">
              <AlertDialogCancel type="button">Batal</AlertDialogCancel>
              <SubmitButton variant="destructive">Keluar</SubmitButton>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
