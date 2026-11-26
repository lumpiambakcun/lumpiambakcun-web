"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type QuantityStepperProps = {
  id: string;
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  invalid?: boolean;
  describedBy?: string;
};

export function QuantityStepper({ id, name, label, value, onChange, min = 1, max = 99, invalid, describedBy }: QuantityStepperProps) {
  const clamp = (next: number) => onChange(Math.min(max, Math.max(min, Number.isFinite(next) ? next : min)));

  return (
    <div className="flex items-center justify-between gap-3">
      <label htmlFor={id} className="text-[13px] leading-[1.2] font-semibold text-ink">
        {label}
      </label>
      <div className="flex items-center gap-1.5">
        <Button type="button" variant="outline" size="icon" className="size-9 bg-white" disabled={value <= min} onClick={() => clamp(value - 1)} aria-label="Kurangi jumlah">
          <Minus aria-hidden="true" />
        </Button>
        <Input
          id={id}
          name={name}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(event) => clamp(event.target.valueAsNumber)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="h-9 w-16 [appearance:textfield] rounded-lg border-border bg-white px-2 text-center text-sm font-semibold tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <Button type="button" variant="outline" size="icon" className="size-9 bg-white" disabled={value >= max} onClick={() => clamp(value + 1)} aria-label="Tambah jumlah">
          <Plus aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
