"use client";

import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Input } from "@/components/ui/input";
import type { SiteLink } from "@/lib/site-settings-schema";

const kindOptions = [
  { value: "internal", label: "Halaman situs" },
  { value: "external", label: "Tautan luar" },
  { value: "whatsapp", label: "Pesan WhatsApp" },
];

const valueLabel: Record<SiteLink["kind"], string> = {
  internal: "Alamat halaman",
  external: "URL tujuan",
  whatsapp: "Isi pesan WhatsApp",
};

const valuePlaceholder: Record<SiteLink["kind"], string> = {
  internal: "/artikel atau /#menu",
  external: "https://...",
  whatsapp: "Halo Mbak Cun, saya mau tanya...",
};

type LinkFieldsProps = {
  path: string;
  value: SiteLink;
  onChange: (patch: Partial<SiteLink>) => void;
  errors: Record<string, string>;
};

export function LinkFields({ path, value, onChange, errors }: LinkFieldsProps) {
  const id = path.replaceAll(".", "-");
  const invalid = (field: string) => (errors[`${path}.${field}`] ? { "aria-invalid": true as const, "aria-describedby": `${id}-${field}-error` } : {});

  return (
    <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
      <FormField id={`${id}-label`} label="Teks" error={errors[`${path}.label`]} tone="admin">
        <Input id={`${id}-label`} value={value.label} maxLength={40} autoComplete="off" onChange={(event) => onChange({ label: event.target.value })} className={fieldControlClass} {...invalid("label")} />
      </FormField>
      <FormField id={`${id}-kind`} label="Jenis tautan" error={errors[`${path}.kind`]} tone="admin">
        <SelectField id={`${id}-kind`} name={`${id}-kind`} options={kindOptions} value={value.kind} onValueChange={(kind) => onChange({ kind: kind as SiteLink["kind"] })} {...invalid("kind")} />
      </FormField>
      <FormField id={`${id}-value`} label={valueLabel[value.kind]} error={errors[`${path}.value`]} tone="admin" className="sm:col-span-2">
        {value.kind === "whatsapp" ? (
          <textarea
            id={`${id}-value`}
            value={value.value}
            rows={2}
            maxLength={300}
            placeholder={valuePlaceholder.whatsapp}
            onChange={(event) => onChange({ value: event.target.value })}
            className={fieldTextareaClass}
            {...invalid("value")}
          />
        ) : (
          <Input
            id={`${id}-value`}
            value={value.value}
            maxLength={300}
            autoComplete="off"
            placeholder={valuePlaceholder[value.kind]}
            onChange={(event) => onChange({ value: event.target.value })}
            className={fieldControlClass}
            {...invalid("value")}
          />
        )}
      </FormField>
    </div>
  );
}
