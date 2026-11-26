"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { adminNav } from "@/config/admin";

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const isActive = (href: string) => pathname === href || (href !== "/admin" && pathname.startsWith(`${href}/`));

  return (
    <SidebarMenu>
      {adminNav.map(({ label, href, icon: Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            asChild
            isActive={isActive(href)}
            tooltip={label}
            className="h-9 text-sm text-ink-muted data-active:bg-brand/8 data-active:font-semibold data-active:text-brand"
          >
            <Link href={href} onClick={() => setOpenMobile(false)} aria-current={isActive(href) ? "page" : undefined}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
