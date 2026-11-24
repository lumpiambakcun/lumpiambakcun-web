import { AdminHeader } from "@/components/admin/admin-header";
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
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-6 md:px-6">
            <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col gap-3">{children}</div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}
