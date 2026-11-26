import type { Metadata } from "next";
import { Suspense } from "react";
import { HeaderContent } from "@/components/admin/header-content";
import { PageHeader } from "@/components/admin/page-header";
import { SettingsSkeleton } from "@/components/admin/settings-skeleton";

export const metadata: Metadata = { title: "Header" };

export default function AdminHeaderPage() {
  return (
    <>
      <PageHeader title="Header" />
      <Suspense fallback={<SettingsSkeleton />}>
        <HeaderContent />
      </Suspense>
    </>
  );
}
