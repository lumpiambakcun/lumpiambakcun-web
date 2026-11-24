import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ORDER_PAGE_SIZE, type OrderFilters } from "@/lib/admin-orders";

type OrdersPaginationProps = {
  filters: OrderFilters;
  total: number;
};

export function OrdersPagination({ filters, total }: OrdersPaginationProps) {
  const pages = Math.max(1, Math.ceil(total / ORDER_PAGE_SIZE));
  const hrefFor = (halaman: number) => {
    const params = new URLSearchParams({ rentang: filters.rentang, halaman: String(halaman) });
    if (filters.status) params.set("status", filters.status);
    if (filters.q) params.set("q", filters.q);
    return `/admin?${params}`;
  };

  return (
    <nav aria-label="Halaman" className="flex shrink-0 items-center justify-between gap-3 text-sm text-ink-muted">
      <span role="status" aria-live="polite">{`${total} pesanan · halaman ${filters.halaman} dari ${pages}`}</span>
      <span className="flex gap-2">
        {filters.halaman > 1 && (
          <Button asChild variant="outline" size="sm">
            <Link href={hrefFor(filters.halaman - 1)}>Sebelumnya</Link>
          </Button>
        )}
        {filters.halaman < pages && (
          <Button asChild variant="outline" size="sm">
            <Link href={hrefFor(filters.halaman + 1)}>Berikutnya</Link>
          </Button>
        )}
      </span>
    </nav>
  );
}
