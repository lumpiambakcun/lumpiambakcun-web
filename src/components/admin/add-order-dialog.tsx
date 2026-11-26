"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ManualOrderForm, type ProductOption } from "@/components/admin/manual-order-form";
import { ResponsiveDialog } from "@/components/shared/responsive-dialog";
import type { SelectOption } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { wibDate } from "@/lib/format";

type AddOrderDialogProps = {
  products: readonly ProductOption[];
  methods: readonly SelectOption[];
  hours: { opens: string; closes: string };
};

const title = "Tambah pesanan";

export function AddOrderDialog({ products, methods, hours }: AddOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (next) setToday(wibDate(new Date()));
    setOpen(next);
  };

  const form = (
    <ManualOrderForm
      products={products}
      methods={methods}
      hours={hours}
      today={today}
      onCancel={() => setOpen(false)}
      onSaved={(code) => {
        setOpen(false);
        toast.success(`Pesanan ${code} disimpan.`);
      }}
    />
  );

  return (
    <>
      <Button onClick={() => handleOpenChange(true)} className="h-10 px-4">
        <Plus data-icon="inline-start" aria-hidden="true" />
        {title}
      </Button>
      <ResponsiveDialog open={open} onOpenChange={handleOpenChange} title={title}>
        {form}
      </ResponsiveDialog>
    </>
  );
}
