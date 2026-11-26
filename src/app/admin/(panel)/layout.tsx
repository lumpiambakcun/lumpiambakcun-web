import { AdminHeader } from "@/components/admin/admin-header";
import { adminPagePad } from "@/components/admin/styles";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="h-svh overflow-hidden bg-canvas">
          <AdminHeader />
          <div className={`scroll-slim flex min-h-0 flex-1 flex-col overflow-y-auto ${adminPagePad}`}>
            <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-4">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="bottom-right" />
    </TooltipProvider>
  );
}
