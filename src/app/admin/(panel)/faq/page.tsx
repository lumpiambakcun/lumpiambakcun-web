import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqContent } from "@/components/admin/faq-content";
import { FaqDialog } from "@/components/admin/faq-dialog";
import { FaqTableSkeleton } from "@/components/admin/faq-table";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "FAQ" };

export default function AdminFaqPage() {
  return (
    <>
      <PageHeader
        title="FAQ"
        actions={
          <FaqDialog
            trigger={
              <Button className="h-10 px-4">
                <Plus data-icon="inline-start" aria-hidden="true" />
                Tambah FAQ
              </Button>
            }
          />
        }
      />
      <Suspense fallback={<FaqTableSkeleton />}>
        <FaqContent />
      </Suspense>
    </>
  );
}
