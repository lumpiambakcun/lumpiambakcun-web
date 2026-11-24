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
  placeholder?: string;
  className?: string;
} & Pick<React.ComponentProps<"button">, "aria-invalid" | "aria-describedby" | "aria-label">;

export function SelectField({ id, name, options, defaultValue, placeholder, className, ...aria }: SelectFieldProps) {
  return (
    <Select name={name} defaultValue={defaultValue}>
      <SelectTrigger id={id} className={cn(fieldControlClass, "w-full justify-between", className)} {...aria}>
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
