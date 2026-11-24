"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { id as idLocale } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  id: string;
  name: string;
  /** yyyy-mm-dd */
  defaultValue?: string;
  placeholder?: string;
  className?: string;
} & Pick<React.ComponentProps<"button">, "aria-invalid" | "aria-describedby">;

const toIso = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
// Tengah hari supaya tidak bergeser ke hari lain oleh zona waktu.
const fromIso = (value: string) => new Date(`${value}T12:00:00`);

const longDate = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function DatePicker({ id, name, defaultValue, placeholder = "Pilih tanggal", className, ...aria }: DatePickerProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const selected = value ? fromIso(value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={value} />
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          className={cn("h-[45px] w-full justify-between rounded-lg bg-white px-4 text-sm font-normal", !selected && "text-ink-muted", className)}
          {...aria}
        >
          {selected ? longDate.format(selected) : placeholder}
          <CalendarIcon className="size-4 text-ink-muted" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          locale={idLocale}
          selected={selected}
          defaultMonth={selected}
          onSelect={(date) => {
            if (!date) return;
            setValue(toIso(date));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
