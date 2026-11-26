import { Skeleton } from "@/components/ui/skeleton";

const heights = ["h-64", "h-48", "h-56", "h-44"];

export function SettingsSkeleton() {
  return (
    <div role="status" aria-label="Memuat pengaturan" className="flex flex-col gap-3">
      {heights.map((height) => (
        <Skeleton key={height} className={`${height} rounded-md`} />
      ))}
    </div>
  );
}
