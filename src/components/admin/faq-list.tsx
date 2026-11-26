"use client";

import { MessageCircleQuestion } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { reorderFaqAction, saveFaqAction } from "@/app/admin/(panel)/faq/actions";
import { FaqRowActions } from "@/components/admin/faq-row-actions";
import { SortableRow, SortableRows } from "@/components/admin/sortable-rows";
import { adminCardClass } from "@/components/admin/styles";
import { EmptyState } from "@/components/shared/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import type { FaqRow } from "@/lib/faqs";
import { cn } from "@/lib/utils";

export function FaqListSkeleton() {
  return (
    <div role="status" aria-label="Memuat FAQ" className={cn("overflow-hidden", adminCardClass)}>
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="flex min-h-16 items-center gap-3 border-b border-border px-3 last:border-b-0">
          <Skeleton className="size-8 rounded-md" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-64 max-w-full" />
            <Skeleton className="h-3 w-96 max-w-full" />
          </div>
          <Skeleton className="h-5 w-9 rounded-full" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function FaqList({ faqs }: { faqs: readonly FaqRow[] }) {
  const [items, setItems] = useState(faqs);
  const [source, setSource] = useState(faqs);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  if (faqs !== source) {
    setSource(faqs);
    setItems(faqs);
  }

  if (items.length === 0) {
    return (
      <div className={adminCardClass}>
        <EmptyState icon={MessageCircleQuestion} title="Belum ada FAQ" description="Tambah pertanyaan yang sering ditanyakan pelanggan. Hasilnya tampil di beranda." />
      </div>
    );
  }

  const labelOf = (id: string | number) => items.find((faq) => faq.id === id)?.question ?? "FAQ";

  const move = (from: number, to: number) => {
    const next = [...items];
    next.splice(to, 0, next.splice(from, 1)[0]);
    setItems(next);
    startTransition(() => reorderFaqAction(next.map((faq) => faq.id)));
  };

  const toggle = (faq: FaqRow, active: boolean) => {
    setItems((current) => current.map((item) => (item.id === faq.id ? { ...item, active } : item)));
    const data = new FormData();
    data.set("id", faq.id);
    data.set("question", faq.question);
    data.set("answer", faq.answer);
    data.set("active", active ? "1" : "0");
    startTransition(async () => {
      const result = await saveFaqAction(data);
      if (result.ok) return;
      setItems((current) => current.map((item) => (item.id === faq.id ? { ...item, active: faq.active } : item)));
      toast.error(result.message ?? "Status belum bisa diubah.");
    });
  };

  return (
    <SortableRows ids={items.map((faq) => faq.id)} labelOf={labelOf} onMove={move} className="shadow-panel">
      {items.map((faq) => (
        <SortableRow key={faq.id} id={faq.id} label={faq.question}>
          {(handle) => (
            <div className="flex min-h-16 items-center gap-1 px-2 py-2">
              {handle}
              <button
                type="button"
                onClick={() => setEditingId(faq.id)}
                aria-label={`Ubah FAQ: ${faq.question}`}
                className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-md px-2 py-1 text-left outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className={cn("truncate text-sm font-medium", faq.active ? "text-ink" : "text-ink-muted")}>{faq.question}</span>
                <span className="line-clamp-1 text-xs text-ink-muted">{faq.answer}</span>
              </button>
              <Switch aria-label={`Tampilkan di situs: ${faq.question}`} checked={faq.active} onCheckedChange={(active) => toggle(faq, active)} className="mx-1" />
              <FaqRowActions faq={faq} editing={editingId === faq.id} onEditingChange={(open) => setEditingId(open ? faq.id : null)} />
            </div>
          )}
        </SortableRow>
      ))}
    </SortableRows>
  );
}
