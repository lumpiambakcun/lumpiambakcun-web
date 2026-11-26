"use client";

import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CUSTOM = "__custom";

type SelectWithCustomProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  maxLength?: number;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

export function SelectWithCustom({ id, name, label, value, onChange, options, placeholder, maxLength, invalid, describedBy, className }: SelectWithCustomProps) {
  const [custom, setCustom] = useState(() => value !== "" && !options.includes(value));
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input type="hidden" name={name} value={value} />
      {custom ? (
        <div className="flex min-w-0 flex-1 items-center">
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
            className="h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="mr-1 shrink-0"
            aria-label={`Pilih ${label.toLowerCase()} dari daftar`}
            onClick={() => {
              setCustom(false);
              onChange("");
            }}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <Select
          value={options.includes(value) ? value : ""}
          onValueChange={(next) => {
            if (next === CUSTOM) {
              setCustom(true);
              onChange("");
              requestAnimationFrame(() => inputRef.current?.focus());
              return;
            }
            onChange(next);
          }}
        >
          <SelectTrigger
            id={id}
            aria-label={label}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={className ?? "h-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0 data-[size=default]:h-full"}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
            <SelectItem value={CUSTOM}>Lainnya…</SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
}
