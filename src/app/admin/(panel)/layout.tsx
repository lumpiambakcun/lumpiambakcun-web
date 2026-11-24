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
        <SidebarInset className="bg-canvas">
          <AdminHeader />
          <main className="flex-1 px-4 py-6 md:px-6">
            <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-6">{children}</div>
          </main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-center" />
    </TooltipProvider>
  );
}
