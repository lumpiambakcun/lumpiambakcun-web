"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { adminNav } from "@/config/admin";

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      {adminNav.map(({ label, href, icon: Icon }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === href}
            tooltip={label}
            className="relative h-9 text-sm text-ink-muted data-active:bg-brand/8 data-active:font-semibold data-active:text-brand data-active:before:absolute data-active:before:inset-y-1.5 data-active:before:left-0 data-active:before:w-[3px] data-active:before:rounded-full data-active:before:bg-brand"
          >
            <Link href={href} onClick={() => setOpenMobile(false)} aria-current={pathname === href ? "page" : undefined}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
