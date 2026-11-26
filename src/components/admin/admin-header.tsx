import { Suspense } from "react";
import { ProfileMenu } from "@/components/admin/profile-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card px-4 md:px-6">
      <SidebarTrigger aria-label="Buka atau tutup sidebar" />
      <div className="ml-auto">
        <Suspense fallback={<Skeleton className="size-9 rounded-full" />}>
          <ProfileMenu />
        </Suspense>
      </div>
    </header>
  );
}
