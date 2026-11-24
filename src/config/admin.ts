import { ClipboardList, FilePlus2, type LucideIcon } from "lucide-react";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon };

export const adminNav: readonly AdminNavItem[] = [
  { label: "Pesanan", href: "/admin", icon: ClipboardList },
  { label: "Pesanan Manual", href: "/admin/pesanan/baru", icon: FilePlus2 },
];
