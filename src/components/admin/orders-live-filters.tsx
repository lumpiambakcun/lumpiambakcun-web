"use client";

import { LoaderCircle, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import { orderStatusInfo } from "@/content/checkout";
import type { OrderFilters } from "@/lib/admin-orders";
import { cn } from "@/lib/utils";

const DEBOUNCE_MS = 300;

const rentangOptions = [
  { value: "mendatang", label: "Ambil hari ini dan seterusnya" },
  { value: "semua", label: "Semua, terbaru dulu" },
];

const statusOptions = [
  { value: "semua", label: "Semua status" },
  ...Object.entries(orderStatusInfo).map(([value, { label }]) => ({ value, label })),
];

const controlHeight = "data-[size=default]:h-10";

type OrdersLiveFiltersProps = {
  filters: OrderFilters;
  total: number;
  stats: React.ReactNode;
  children: React.ReactNode;
};

export function OrdersLiveFilters({ filters, total, stats, children }: OrdersLiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(filters.q);
  const current = useRef({ q: filters.q, rentang: filters.rentang as string, status: filters.status ?? "semua" });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const apply = (patch: Partial<typeof current.current>) => {
    clearTimeout(timer.current);
    current.current = { ...current.current, ...patch };
    const { q: query, rentang, status } = current.current;
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (rentang !== "mendatang") params.set("rentang", rentang);
    if (status !== "semua") params.set("status", status);
    const search = params.toString();
    startTransition(() => router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false }));
  };

  const handleSearch = (value: string) => {
    setQ(value);
    current.current.q = value;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => apply({ q: value }), DEBOUNCE_MS);
  };

  const clearSearch = () => {
    setQ("");
    apply({ q: "" });
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className={cn("transition-opacity", pending && "opacity-60")}>{stats}</div>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          apply({ q });
        }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
          <Input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder="Cari kode, nama, atau nomor"
            aria-label="Cari pesanan"
            autoComplete="off"
            className="h-10 rounded-lg border-border bg-white pr-16 pl-9 text-sm [&::-webkit-search-cancel-button]:appearance-none"
          />
          <div className="absolute inset-y-0 right-1 flex items-center gap-0.5">
            {pending && <LoaderCircle className="size-4 animate-spin text-ink-muted motion-reduce:animate-none" aria-hidden="true" />}
            {q && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Hapus pencarian"
                className="grid size-8 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink focus-visible:text-ink"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
        <SelectField
          id="rentang"
          name="rentang"
          aria-label="Rentang tanggal"
          options={rentangOptions}
          defaultValue={filters.rentang}
          onValueChange={(value) => apply({ rentang: value })}
          className={cn(controlHeight, "sm:w-auto")}
        />
        <SelectField
          id="status"
          name="status"
          aria-label="Status pesanan"
          options={statusOptions}
          defaultValue={filters.status ?? "semua"}
          onValueChange={(value) => apply({ status: value })}
          className={cn(controlHeight, "sm:w-auto")}
        />
        <p role="status" aria-live="polite" className="text-sm text-ink-muted sm:ml-auto">
          {pending ? "Memuat pesanan..." : `${total} pesanan ditemukan`}
        </p>
      </form>
      <div aria-busy={pending} className={cn("flex flex-col gap-4 transition-opacity", pending && "opacity-60")}>
        {children}
      </div>
    </div>
  );
}
