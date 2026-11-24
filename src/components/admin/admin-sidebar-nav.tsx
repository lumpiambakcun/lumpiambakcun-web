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
            className="h-10 text-[15px] data-active:bg-highlight data-active:font-semibold data-active:text-ink"
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
