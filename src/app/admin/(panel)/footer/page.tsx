import type { Metadata } from "next";
import { Suspense } from "react";
import { FooterSettingsContent } from "@/components/admin/footer-settings-content";
import { PageHeader } from "@/components/admin/page-header";
import { SettingsSkeleton } from "@/components/admin/settings-skeleton";

export const metadata: Metadata = { title: "Footer" };

export default function AdminFooterPage() {
  return (
    <>
      <PageHeader title="Footer" />
      <Suspense fallback={<SettingsSkeleton />}>
        <FooterSettingsContent />
      </Suspense>
    </>
  );
}
