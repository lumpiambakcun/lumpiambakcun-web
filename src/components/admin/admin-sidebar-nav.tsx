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
    <SidebarMenu className="gap-1">
      {adminNav.map(({ label, href, icon: Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            asChild
            isActive={isActive(href)}
            tooltip={label}
            className="h-10 gap-3 rounded-lg px-3 text-sm font-medium text-sidebar-foreground/85 data-active:bg-sidebar-primary data-active:font-bold data-active:text-sidebar-primary-foreground data-active:hover:bg-sidebar-primary"
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
