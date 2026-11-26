"use client";

import { useState } from "react";
import { id as idLocale } from "react-day-picker/locale";
import { CalendarIcon } from "lucide-react";
import { ChoiceChips, chipClass, chipOnClass } from "@/components/admin/choice-chips";
import { timeSlots } from "@/components/shared/time-select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type PickupPickerProps = {
  today: string;
  hours: { opens: string; closes: string };
};

const shortDate = new Intl.DateTimeFormat("id-ID", { weekday: "short", day: "numeric", month: "short" });
const fromIso = (value: string) => new Date(`${value}T12:00:00`);
const toIso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const addDay = (value: string) => {
  const next = new Date(`${value}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  return next.toISOString().slice(0, 10);
};

const wibMinutes = () => {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return (get("hour") % 24) * 60 + get("minute");
};

export function PickupPicker({ today, hours }: PickupPickerProps) {
  const tomorrow = addDay(today);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("");
  const [open, setOpen] = useState(false);
  const [now] = useState(wibMinutes);

  const custom = date !== today && date !== tomorrow;
  const slots = timeSlots(hours.opens, hours.closes).map((slot) => ({
    value: slot.value,
    label: slot.value.replace(":", "."),
    disabled: date === today && slot.minutes <= now,
  }));

  const pickDate = (next: string) => {
    setDate(next);
    if (next === today && slots.find((slot) => slot.value === time && slot.disabled)) setTime("");
  };

  return (
    <div className="flex flex-col gap-3">
      <input type="hidden" name="tanggal" value={date} />
      <div className="flex flex-wrap items-center gap-2">
        <ChoiceChips
          label="Tanggal ambil"
          value={custom ? "" : date}
          onChange={pickDate}
          options={[
            { value: today, label: "Hari ini" },
            { value: tomorrow, label: "Besok" },
          ]}
          className="w-auto"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" aria-label={custom ? `Tanggal ambil ${shortDate.format(fromIso(date))}, ubah` : "Pilih tanggal"} className={cn(chipClass, "h-9 gap-2", custom && chipOnClass)}>
              <CalendarIcon aria-hidden="true" />
              {custom ? shortDate.format(fromIso(date)) : "Pilih tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              locale={idLocale}
              selected={fromIso(date)}
              defaultMonth={fromIso(date)}
              disabled={{ before: fromIso(today) }}
              onSelect={(next) => {
                if (!next) return;
                pickDate(toIso(next));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <ChoiceChips label="Jam ambil (WIB)" name="jam" value={time} onChange={setTime} options={slots} itemClassName="h-8 px-2.5 text-[13px] tabular-nums" />
    </div>
  );
}
