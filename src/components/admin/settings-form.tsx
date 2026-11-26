"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FormMessage } from "@/components/admin/dialog-form";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsState } from "@/lib/cms";

type SettingsFormProps = {
  action: (formData: FormData) => Promise<CmsState>;
  payload: unknown;
  children: (errors: Record<string, string>) => React.ReactNode;
};

export function SettingsForm({ action, payload, children }: SettingsFormProps) {
  const router = useRouter();
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("payload", JSON.stringify(payload));
    startTransition(async () => {
      const result = await action(data);
      if (!result.ok) return setState(result);
      setState({});
      toast.success("Perubahan disimpan.");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {children(state.errors ?? {})}
      <div className="sticky bottom-0 z-10 flex flex-col gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-card md:px-5">
        <FormMessage>{state.message}</FormMessage>
        <div className="flex justify-end">
          <Button type="submit" loading={pending} className="h-10 px-5">
            Simpan perubahan
          </Button>
        </div>
      </div>
    </form>
  );
}

export function SettingsCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3.5 rounded-md border border-border bg-card p-4 shadow-card md:p-5">
      <div className="flex flex-col gap-0.5">
        <h2 className="font-heading text-lg leading-[1.2] font-bold text-ink">{title}</h2>
        {description && <p className="text-[13px] leading-[1.4] text-ink-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}

type TextSettingProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  maxLength?: number;
  className?: string;
  rows?: number;
  inputMode?: React.ComponentProps<"input">["inputMode"];
  placeholder?: string;
};

export function TextSetting({ id, label, value, onChange, error, maxLength, className, rows, inputMode, placeholder }: TextSettingProps) {
  const aria = error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
  return (
    <FormField id={id} label={label} error={error} tone="admin" className={className}>
      {rows ? (
        <textarea id={id} value={value} rows={rows} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} className={fieldTextareaClass} {...aria} />
      ) : (
        <Input id={id} value={value} maxLength={maxLength} inputMode={inputMode} placeholder={placeholder} autoComplete="off" onChange={(event) => onChange(event.target.value)} className={fieldControlClass} {...aria} />
      )}
    </FormField>
  );
}
