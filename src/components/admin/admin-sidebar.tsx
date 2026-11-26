import Image from "next/image";
import Link from "next/link";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { siteConfig } from "@/config/site";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-4 py-0 group-data-[collapsible=icon]:px-2">
        <Link href="/admin" aria-label={`${siteConfig.name}, panel admin`} className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
          <Image src="/images/brand/logo-footer.webp" alt="" width={500} height={458} className="h-9 w-10 shrink-0 object-contain" />
          <span className="flex flex-col gap-1 group-data-[collapsible=icon]:hidden">
            <span className="font-heading text-base leading-none font-bold whitespace-nowrap text-sidebar-foreground">{siteConfig.name}</span>
            <span className="text-[11px] leading-none font-semibold tracking-[0.08em] text-sidebar-foreground/70 uppercase">Panel Admin</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-4 group-data-[collapsible=icon]:p-2">
          <SidebarGroupLabel className="mb-1 h-7 px-3 text-[11px] font-extrabold tracking-[0.08em] text-sidebar-foreground/60 uppercase">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <AdminSidebarNav />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
