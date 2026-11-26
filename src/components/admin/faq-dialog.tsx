"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FaqForm } from "@/components/admin/faq-form";
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import type { FaqRow } from "@/lib/faqs";

type FaqDialogProps = {
  faq?: FaqRow;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function FaqDialog({ faq, trigger, open: controlledOpen, onOpenChange }: FaqDialogProps) {
  const [ownOpen, setOwnOpen] = useState(false);
  const open = controlledOpen ?? ownOpen;
  const setOpen = onOpenChange ?? setOwnOpen;

  return (
    <ResponsiveDialog open={open} onOpenChange={setOpen} title={faq ? "Ubah FAQ" : "Tambah FAQ"} trigger={trigger} className="sm:max-w-lg">
      <FaqForm
        faq={faq}
        onCancel={() => setOpen(false)}
        onSaved={() => {
          setOpen(false);
          toast.success(faq ? "FAQ diperbarui." : "FAQ ditambahkan.");
        }}
      />
    </ResponsiveDialog>
  );
}
