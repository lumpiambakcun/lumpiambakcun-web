"use client";

import { fieldControlClass } from "@/components/shared/form-field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  id: string;
  name: string;
  options: readonly SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
} & Pick<React.ComponentProps<"button">, "aria-invalid" | "aria-describedby" | "aria-label">;

export function SelectField({ id, name, options, defaultValue, onValueChange, placeholder, className, ...aria }: SelectFieldProps) {
  return (
    <Select name={name} defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger id={id} className={cn(fieldControlClass, "w-full justify-between data-[size=default]:h-[45px]", className)} {...aria}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
