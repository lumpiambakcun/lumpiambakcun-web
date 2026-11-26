"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

export const chipClass =
  "h-9 min-w-0 rounded-lg border-border bg-white px-3.5 text-sm font-medium text-ink hover:bg-muted data-[state=on]:border-brand data-[state=on]:bg-brand data-[state=on]:text-white data-[state=on]:hover:bg-brand-hover";

export const chipOnClass = "border-brand bg-brand text-white hover:bg-brand-hover hover:text-white";

export type Choice = { value: string; label: string; disabled?: boolean };

type ChoiceChipsProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly Choice[];
  name?: string;
  className?: string;
  itemClassName?: string;
};

export function ChoiceChips({ label, value, onChange, options, name, className, itemClassName }: ChoiceChipsProps) {
  return (
    <>
      {name && <input type="hidden" name={name} value={value} />}
      <ToggleGroup
        type="single"
        variant="outline"
        spacing={2}
        aria-label={label}
        value={value}
        onValueChange={(next) => next && onChange(next)}
        className={cn("w-full flex-wrap", className)}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} disabled={option.disabled} className={cn(chipClass, itemClassName)}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}

const CUSTOM = "__custom";

type ChoiceChipsWithCustomProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  maxLength?: number;
  invalid?: boolean;
  describedBy?: string;
};

export function ChoiceChipsWithCustom({ id, label, name, value, onChange, options, placeholder, maxLength, invalid, describedBy }: ChoiceChipsWithCustomProps) {
  const [custom, setCustom] = useState(() => value !== "" && !options.includes(value));
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = custom ? CUSTOM : options.includes(value) ? value : "";

  const handleChange = (next: string) => {
    if (next === CUSTOM) {
      setCustom(true);
      onChange("");
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    setCustom(false);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name={name} value={value} />
      <ChoiceChips
        label={label}
        value={selected}
        onChange={handleChange}
        options={[...options.map((option) => ({ value: option, label: option })), { value: CUSTOM, label: "Lainnya" }]}
        itemClassName="h-8 px-3 text-[13px]"
      />
      {custom && (
        <Input
          ref={inputRef}
          id={id}
          aria-label={`${label} lainnya`}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="h-9 w-full max-w-60 rounded-lg border-border bg-white px-3 text-sm"
        />
      )}
    </div>
  );
}
