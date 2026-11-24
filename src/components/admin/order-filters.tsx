import { fieldControlClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { orderStatusInfo } from "@/content/checkout";
import type { OrderFilters } from "@/lib/admin-orders";
import { cn } from "@/lib/utils";

const rentangOptions = [
  { value: "mendatang", label: "Ambil hari ini dan seterusnya" },
  { value: "semua", label: "Semua, terbaru dulu" },
];

const statusOptions = [
  { value: "semua", label: "Semua status" },
  ...Object.entries(orderStatusInfo).map(([value, { label }]) => ({ value, label })),
];

export function OrderFilterBar({ filters }: { filters: OrderFilters }) {
  return (
    <form method="get" className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      <Input
        name="q"
        defaultValue={filters.q}
        placeholder="Cari kode, nama, atau nomor"
        aria-label="Cari pesanan"
        className={cn(fieldControlClass, "sm:w-64")}
      />
      <SelectField id="rentang" name="rentang" aria-label="Rentang" options={rentangOptions} defaultValue={filters.rentang} className="sm:w-auto" />
      <SelectField id="status" name="status" aria-label="Status" options={statusOptions} defaultValue={filters.status ?? "semua"} className="sm:w-auto" />
      <Button type="submit" variant="brand" size="cta" className="h-[45px]">
        Terapkan
      </Button>
    </form>
  );
}
