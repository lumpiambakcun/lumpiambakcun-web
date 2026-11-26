import { Skeleton } from "@/components/ui/skeleton";

export function SettingsSkeleton() {
  return (
    <div role="status" aria-label="Memuat pengaturan" className="flex flex-col gap-4">
      <Skeleton className="h-[560px] rounded-md" />
    </div>
  );
}
