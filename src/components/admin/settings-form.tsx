"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { AutoGrowTextarea } from "@/components/admin/auto-grow-textarea";
import { FormMessage } from "@/components/admin/dialog-form";
import { adminCardClass } from "@/components/admin/styles";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsState } from "@/lib/cms";
import { cn } from "@/lib/utils";

export type SettingsApi<T> = {
  values: T;
  baseline: T;
  update: (change: (values: T) => T) => void;
  errors: Record<string, string>;
  markFile: () => void;
};

export type SettingsBlock<T> = {
  id: string;
  title: string;
  description: string;
  render: (api: SettingsApi<T>) => React.ReactNode;
};

type SettingsFormProps<T> = {
  initial: T;
  action: (formData: FormData) => Promise<CmsState>;
  blocks: readonly SettingsBlock<T>[];
};

export function errorIndexes(errors: Record<string, string>, prefix: string) {
  const found = new Set<number>();
  for (const key of Object.keys(errors)) {
    const match = key.match(new RegExp(`^${prefix.replaceAll(".", "\\.")}\\.(\\d+)(\\.|$)`));
    if (match) found.add(Number(match[1]));
  }
  return [...found].sort((a, b) => a - b);
}

export function SettingsForm<T>({ initial, action, blocks }: SettingsFormProps<T>) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initial);
  const [baseline, setBaseline] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string>();
  const [fileDirty, setFileDirty] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [pending, startTransition] = useTransition();

  const dirty = JSON.stringify(values) !== JSON.stringify(baseline) || fileDirty;

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const submit = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    data.set("payload", JSON.stringify(values));
    startTransition(async () => {
      const result = await action(data);
      if (!result.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message);
        return;
      }
      setErrors({});
      setMessage(undefined);
      setBaseline(values);
      setFileDirty(false);
      toast.success("Perubahan disimpan.");
      router.refresh();
    });
  };

  const submitRef = useRef(submit);
  useEffect(() => {
    submitRef.current = submit;
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        submitRef.current();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.origin !== window.location.origin) return;
      if (anchor.pathname === window.location.pathname) return;
      if (!window.confirm("Perubahan belum disimpan. Tinggalkan halaman ini?")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [dirty]);

  const api: SettingsApi<T> = { values, baseline, update: (change) => setValues(change), errors, markFile: () => setFileDirty(true) };

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      className="flex flex-col gap-4"
    >
      <div key={resetKey} className={cn("flex flex-col divide-y divide-border px-5 md:px-6", adminCardClass)}>
        {blocks.map((block) => (
          <SettingsSection key={block.id} id={block.id} title={block.title} description={block.description}>
            {block.render(api)}
          </SettingsSection>
        ))}
      </div>

      {(dirty || message) && (
        <div role="region" aria-label="Simpan perubahan" className={cn("sticky bottom-0 z-20 flex flex-col gap-3 p-3 md:px-4", adminCardClass)}>
          <FormMessage>{message}</FormMessage>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p role="status" className="text-sm font-medium text-ink">
              Ada perubahan yang belum disimpan
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={pending}
                onClick={() => {
                  setValues(baseline);
                  setErrors({});
                  setMessage(undefined);
                  setFileDirty(false);
                  setResetKey((key) => key + 1);
                }}
                className="h-10 bg-white px-4"
              >
                Buang
              </Button>
              <Button type="submit" loading={pending} className="h-10 px-5">
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

function SettingsSection({ id, title, description, children }: { id: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`section-${id}`} className="grid gap-x-8 gap-y-4 py-6 md:grid-cols-[200px_minmax(0,1fr)]">
      <div className="flex flex-col gap-1">
        <h2 id={`section-${id}`} className="font-sans text-sm leading-[1.3] font-medium text-ink">
          {title}
        </h2>
        <p className="text-xs leading-[1.5] text-ink-muted">{description}</p>
      </div>
      <div className="flex min-w-0 flex-col gap-4">{children}</div>
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
        <AutoGrowTextarea id={id} value={value} rows={rows} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} {...aria} />
      ) : (
        <Input id={id} value={value} maxLength={maxLength} inputMode={inputMode} placeholder={placeholder} autoComplete="off" onChange={(event) => onChange(event.target.value)} className={fieldControlClass} {...aria} />
      )}
    </FormField>
  );
}
