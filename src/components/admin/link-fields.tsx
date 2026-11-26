"use client";

import { useId } from "react";
import { AutoGrowTextarea } from "@/components/admin/auto-grow-textarea";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import type { SiteLink } from "@/lib/site-settings-schema";
import { cn } from "@/lib/utils";

const kindOptions = [
  { value: "internal", label: "Halaman situs" },
  { value: "external", label: "Tautan luar" },
  { value: "whatsapp", label: "Pesan WhatsApp" },
];

const suggestions = ["/", "/#menu", "/#keunggulan", "/#lokasi", "/#faq", "/artikel"];

// Jenis tautan ditebak dari tujuan; pilihan WhatsApp hanya lewat pilihan manual.
function detectKind(value: string, current: SiteLink["kind"]): SiteLink["kind"] {
  if (current === "whatsapp") return current;
  if (value.startsWith("/") || value.startsWith("#")) return "internal";
  if (value.startsWith("http")) return "external";
  return current;
}

export function LinkPill({ link, className }: { link: SiteLink; className?: string }) {
  return (
    <span className={cn("max-w-[45%] shrink-0 truncate font-mono text-xs text-ink-muted", className)}>
      {link.kind === "whatsapp" ? "WhatsApp" : link.value || "…"}
    </span>
  );
}

type LinkFieldsProps = {
  path: string;
  value: SiteLink;
  onChange: (patch: Partial<SiteLink>) => void;
  errors: Record<string, string>;
  labelText?: string;
};

export function LinkFields({ path, value, onChange, errors, labelText = "Teks" }: LinkFieldsProps) {
  const id = path.replaceAll(".", "-");
  const listId = useId();
  const invalid = (field: string) => (errors[`${path}.${field}`] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${field}-error` } : {});
  const whatsapp = value.kind === "whatsapp";

  return (
    <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
      <FormField id={`${id}-label`} label={labelText} error={errors[`${path}.label`]} tone="admin">
        <Input id={`${id}-label`} value={value.label} maxLength={40} autoComplete="off" onChange={(event) => onChange({ label: event.target.value })} className={fieldControlClass} {...invalid("label")} />
      </FormField>
      <FormField id={`${id}-kind`} label="Jenis tautan" error={errors[`${path}.kind`]} tone="admin">
        <SelectField id={`${id}-kind`} name={`${id}-kind`} options={kindOptions} value={value.kind} onValueChange={(kind) => onChange({ kind: kind as SiteLink["kind"] })} {...invalid("kind")} />
      </FormField>
      <FormField id={`${id}-value`} label={whatsapp ? "Isi pesan WhatsApp" : "Tujuan"} error={errors[`${path}.value`]} tone="admin" className="sm:col-span-2">
        {whatsapp ? (
          <AutoGrowTextarea
            id={`${id}-value`}
            value={value.value}
            maxLength={300}
            placeholder="Halo Mbak Cun, saya mau tanya..."
            onChange={(event) => onChange({ value: event.target.value })}
            {...invalid("value")}
          />
        ) : (
          <>
            <Input
              id={`${id}-value`}
              list={listId}
              value={value.value}
              maxLength={300}
              autoComplete="off"
              placeholder="/#menu atau https://..."
              onChange={(event) => {
                const next = event.target.value.startsWith("#") ? `/${event.target.value}` : event.target.value;
                onChange({ value: next, kind: detectKind(next, value.kind) });
              }}
              className={cn(fieldControlClass, "font-mono")}
              {...invalid("value")}
            />
            <datalist id={listId}>
              {suggestions.map((suggestion) => (
                <option key={suggestion} value={suggestion} />
              ))}
            </datalist>
          </>
        )}
      </FormField>
    </div>
  );
}
