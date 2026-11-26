"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";

type PhotoFieldProps = {
  id: string;
  name: string;
  label: string;
  initialSrc?: string;
  error?: string;
};

export function PhotoField({ id, name, label, initialSrc, error }: PhotoFieldProps) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const src = preview ?? initialSrc;

  return (
    <FormField id={id} label={label} error={error} tone="admin" className="sm:col-span-2">
      <div className="flex items-center gap-4">
        <div className="relative grid size-28 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-canvas text-ink-muted">
          {src ? (
            <Image src={src} alt="Pratinjau foto produk" fill sizes="112px" unoptimized={Boolean(preview)} className="object-cover" />
          ) : (
            <ImageIcon className="size-6" aria-hidden="true" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Input
            id={id}
            name={name}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setPreview(file ? URL.createObjectURL(file) : null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={`${fieldControlClass} cursor-pointer py-2.5 file:mr-3`}
          />
          <p className="text-xs leading-[1.4] text-ink-muted">JPG, PNG, atau WebP, maksimal 2 MB. Foto persegi paling pas.</p>
        </div>
      </div>
    </FormField>
  );
}
