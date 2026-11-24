"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ManualOrderForm, type ProductOption } from "@/components/admin/manual-order-form";
import type { SelectOption } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { wibDate } from "@/lib/format";

type AddOrderDialogProps = {
  products: readonly ProductOption[];
  methods: readonly SelectOption[];
  hours: { opens: string; closes: string };
};

const title = "Tambah pesanan";
const description = "Catat pesanan dari WhatsApp, tunai, atau transfer yang tidak lewat checkout.";

export function AddOrderDialog({ products, methods, hours }: AddOrderDialogProps) {
  const isMobile = useIsMobile();
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
      {isMobile ? (
        <Sheet open={open} onOpenChange={handleOpenChange}>
          <SheetContent side="bottom" className="max-h-[92dvh] overflow-y-auto rounded-t-2xl px-4 pb-6">
            <SheetHeader className="px-0">
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            {form}
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogContent className="max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto p-6 sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {form}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
