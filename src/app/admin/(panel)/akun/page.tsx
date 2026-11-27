import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountContent } from "@/components/admin/account-content";
import { PageHeader } from "@/components/admin/page-header";
import { SettingsSkeleton } from "@/components/admin/settings-skeleton";

export const metadata: Metadata = { title: "Akun" };

export default function AdminAccountPage() {
  return (
    <>
      <PageHeader title="Akun" />
      <Suspense fallback={<SettingsSkeleton />}>
        <AccountContent />
      </Suspense>
    </>
  );
}
