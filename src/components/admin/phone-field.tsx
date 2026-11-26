"use client";

import { useState } from "react";
import { fieldControlClass } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const toNational = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("62") ? digits.slice(2) : digits.replace(/^0/, "");
};

type PhoneFieldProps = {
  id: string;
  name: string;
  invalid?: boolean;
  describedBy?: string;
};

export function PhoneField({ id, name, invalid, describedBy }: PhoneFieldProps) {
  const [national, setNational] = useState("");

  return (
    <div className="flex">
      <input type="hidden" name={name} value={national ? `62${national}` : ""} />
      <span aria-hidden="true" className="grid h-(--control-h) shrink-0 place-items-center rounded-l-(--control-radius) border border-r-0 border-border bg-muted px-3.5 text-sm font-semibold text-ink">
        +62
      </span>
      <Input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="off"
        placeholder="8xx-xxxx-xxxx"
        value={national}
        onChange={(event) => setNational(toNational(event.target.value).slice(0, 12))}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(fieldControlClass, "rounded-l-none")}
      />
    </div>
  );
}
