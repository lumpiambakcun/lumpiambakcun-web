import { ChevronDown, ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { signOut } from "@/app/admin/(auth)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { requireAdmin } from "@/lib/admin-auth";
import { getProfile } from "@/lib/profiles";

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export async function ProfileMenu() {
  await connection();
  const user = await requireAdmin();
  const profile = await getProfile(user.id);
  const email = profile?.email || user.email || "";
  const name = profile?.full_name || email.split("@")[0] || "Admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg p-1 pr-2 outline-none transition-colors hover:bg-cream focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-cream">
        <Avatar className="size-8">
          {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt="" />}
          <AvatarFallback className="bg-highlight text-xs font-bold text-ink">{initialsOf(name) || "A"}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-40 truncate text-sm font-semibold text-ink sm:block">{name}</span>
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
        <DropdownMenuItem asChild variant="destructive">
          <form action={signOut}>
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut aria-hidden="true" />
              Keluar
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
