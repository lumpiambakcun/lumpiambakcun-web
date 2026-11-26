import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ORDER_PAGE_SIZE, type OrderFilters } from "@/lib/admin-orders";
import { cn } from "@/lib/utils";

type OrdersPaginationProps = {
  filters: OrderFilters;
  total: number;
};

const pageButton = "size-8 text-[13px] tabular-nums";

function pageItems(current: number, pages: number) {
  const numbers = [...new Set([1, pages, current - 1, current, current + 1].filter((page) => page >= 1 && page <= pages))].sort((a, b) => a - b);
  return numbers.flatMap((page, index) => {
    const gap = index > 0 ? page - numbers[index - 1] : 1;
    return gap === 2 ? [page - 1, page] : gap > 2 ? ["…", page] : [page];
  });
}

export function OrdersPagination({ filters, total }: OrdersPaginationProps) {
  const pages = Math.max(1, Math.ceil(total / ORDER_PAGE_SIZE));
  const current = Math.min(filters.halaman, pages);
  const hrefFor = (halaman: number) => {
    const params = new URLSearchParams({ rentang: filters.rentang, halaman: String(halaman) });
    if (filters.status) params.set("status", filters.status);
    if (filters.q) params.set("q", filters.q);
    return `/admin?${params}`;
  };

  return (
    <nav aria-label="Halaman" className="flex items-center justify-between gap-3 text-sm text-ink-muted">
      <span role="status" aria-live="polite">{`${total} pesanan`}</span>
      <ul className="flex items-center gap-1">
        <li>
          {current > 1 ? (
            <Button asChild variant="outline" size="icon" className={pageButton}>
              <Link href={hrefFor(current - 1)} aria-label="Halaman sebelumnya">
                <ChevronLeft aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="icon" disabled className={pageButton} aria-label="Halaman sebelumnya">
              <ChevronLeft aria-hidden="true" />
            </Button>
          )}
        </li>
        {pageItems(current, pages).map((item, index) => (
          <li key={`${item}-${index}`}>
            {item === "…" ? (
              <span aria-hidden="true" className="grid size-8 place-items-center">
                …
              </span>
            ) : (
              <Button
                asChild
                variant="outline"
                size="icon"
                className={cn(pageButton, item === current && "border-ink bg-canvas font-semibold text-ink")}
              >
                <Link href={hrefFor(item as number)} aria-label={`Halaman ${item}`} aria-current={item === current ? "page" : undefined}>
                  {item}
                </Link>
              </Button>
            )}
          </li>
        ))}
        <li>
          {current < pages ? (
            <Button asChild variant="outline" size="icon" className={pageButton}>
              <Link href={hrefFor(current + 1)} aria-label="Halaman berikutnya">
                <ChevronRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="icon" disabled className={pageButton} aria-label="Halaman berikutnya">
              <ChevronRight aria-hidden="true" />
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export function OrdersPaginationSkeleton() {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex h-5 items-center">
        <Skeleton className="h-3.5 w-20" />
      </div>
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="size-8 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
