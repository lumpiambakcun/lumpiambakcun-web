import { Skeleton } from "@/components/ui/skeleton";

export function OrdersSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Memuat pesanan">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="h-[74px] rounded-xl" />
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Skeleton className="h-10 rounded-lg sm:w-72" />
        <Skeleton className="h-10 rounded-lg sm:w-56" />
        <Skeleton className="h-10 rounded-lg sm:w-36" />
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
        <Skeleton className="h-10 rounded-none" />
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} className="flex items-center gap-4 border-t border-border px-3 py-3.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="hidden h-4 w-40 sm:block" />
            <Skeleton className="ml-auto h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
