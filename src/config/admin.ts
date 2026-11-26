import { ClipboardList, MessageCircleQuestion, Newspaper, PackageOpen, type LucideIcon } from "lucide-react";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon };

export const adminNav: readonly AdminNavItem[] = [
  { label: "Pesanan", href: "/admin", icon: ClipboardList },
  { label: "Produk", href: "/admin/produk", icon: PackageOpen },
  { label: "Artikel", href: "/admin/artikel", icon: Newspaper },
  { label: "FAQ", href: "/admin/faq", icon: MessageCircleQuestion },
];
