"use client";

import { CircleCheck, Info, Truck, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { topBarIcons } from "@/lib/site-settings-schema";
import { cn } from "@/lib/utils";

type TopBarIcon = (typeof topBarIcons)[number];

export const topBarIconMap: Record<TopBarIcon, { Icon: LucideIcon; label: string }> = {
  truck: { Icon: Truck, label: "Truk (pengiriman)" },
  check: { Icon: CircleCheck, label: "Centang (jaminan)" },
  info: { Icon: Info, label: "Info" },
};

type IconPickerProps = {
  value: TopBarIcon;
  onChange: (value: TopBarIcon) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const { Icon, label } = topBarIconMap[value];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="icon" aria-label={`Ikon: ${label}. Ubah ikon`} className="size-(--control-h) shrink-0 rounded-(--control-radius) bg-white">
          <Icon className="size-5" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-2">
        <div role="radiogroup" aria-label="Pilih ikon" className="grid grid-cols-3 gap-1">
          {topBarIcons.map((icon) => {
            const { Icon: Item, label: itemLabel } = topBarIconMap[icon];
            return (
              <button
                key={icon}
                type="button"
                role="radio"
                aria-checked={icon === value}
                aria-label={itemLabel}
                onClick={() => {
                  onChange(icon);
                  setOpen(false);
                }}
                className={cn(
                  "grid size-10 place-items-center rounded-md border border-border bg-white text-ink outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                  icon === value && "border-brand bg-brand text-white hover:bg-brand-hover",
                )}
              >
                <Item className="size-5" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
