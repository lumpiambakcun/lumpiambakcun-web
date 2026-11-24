import Image from "next/image";
import Link from "next/link";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-3">
        <Link href="/admin" aria-label={`${siteConfig.name}, panel admin`} className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
          <Image src="/images/brand/emblem.webp" alt="" width={59} height={55} className="h-8 w-auto shrink-0" />
          <span className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-base leading-none font-bold whitespace-nowrap text-brand">{siteConfig.name}</span>
            <span className="text-xs leading-none text-ink-muted">Panel Admin</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <AdminSidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
