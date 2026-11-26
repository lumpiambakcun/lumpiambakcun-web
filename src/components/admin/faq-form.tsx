"use client";

import { useState, useTransition } from "react";
import { saveFaqAction } from "@/app/admin/(panel)/faq/actions";
import { DialogForm, FormMessage } from "@/components/admin/dialog-form";
import { FormField, fieldControlClass, fieldTextareaClass } from "@/components/shared/form-field";
import { SelectField } from "@/components/shared/select-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CmsState } from "@/lib/cms";
import type { FaqRow } from "@/lib/faqs";

type FaqFormProps = {
  faq?: FaqRow;
  onSaved: () => void;
  onCancel: () => void;
};

const statusOptions = [
  { value: "1", label: "Aktif (tampil di situs)" },
  { value: "0", label: "Nonaktif (disembunyikan)" },
];

export function FaqForm({ faq, onSaved, onCancel }: FaqFormProps) {
  const [state, setState] = useState<CmsState>({});
  const [pending, startTransition] = useTransition();
  const { errors = {} } = state;
  const invalid = (field: string) => (errors[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await saveFaqAction(data);
      if (result.ok) onSaved();
      else setState(result);
    });
  };

  return (
    <DialogForm
      onSubmit={handleSubmit}
      className="sm:grid-cols-1"
      footer={
        <>
          <FormMessage>{state.message}</FormMessage>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={pending} className="h-10 px-4">
              Batal
            </Button>
            <Button type="submit" loading={pending} className="h-10 px-5">
              Simpan
            </Button>
          </div>
        </>
      }
    >
      {faq && <input type="hidden" name="id" value={faq.id} />}
      <FormField id="question" label="Pertanyaan" error={errors.question} tone="admin">
        <Input id="question" name="question" defaultValue={faq?.question} maxLength={200} autoComplete="off" className={fieldControlClass} {...invalid("question")} />
      </FormField>
      <FormField id="answer" label="Jawaban" error={errors.answer} tone="admin">
        <textarea id="answer" name="answer" defaultValue={faq?.answer} maxLength={1000} rows={5} className={fieldTextareaClass} {...invalid("answer")} />
      </FormField>
      <FormField id="active" label="Status" error={errors.active} tone="admin">
        <SelectField id="active" name="active" options={statusOptions} defaultValue={faq?.active === false ? "0" : "1"} {...invalid("active")} />
      </FormField>
    </DialogForm>
  );
}
