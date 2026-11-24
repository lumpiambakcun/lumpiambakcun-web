"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthState } from "@/app/admin/(auth)/actions";
import { FormField } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  fields: readonly { name: string; label: string; type: "email" | "password"; autoComplete: string }[];
  submitLabel: string;
  /** Bila diisi, tautan "Lupa kata sandi?" tampil di sisi kanan label kolom kata sandi. */
  forgotHref?: string;
};

const controlClass = "h-14 rounded-xl border-border bg-white px-4 text-base placeholder:text-ink-muted md:text-base";

export function AuthForm({ action, fields, submitLabel, forgotHref }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  const { errors = {} } = state;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {fields.map(({ name, label, type, autoComplete }) => {
        const control = {
          id: name,
          name,
          autoComplete,
          placeholder: label,
          className: controlClass,
          ...(errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {}),
        } as const;
        return (
          <FormField
            key={name}
            id={name}
            label={label}
            error={errors[name]}
            plain
            labelAction={
              forgotHref && type === "password" ? (
                <Link href={forgotHref} className="text-sm font-bold text-brand underline-offset-4 hover:underline">
                  Lupa kata sandi?
                </Link>
              ) : undefined
            }
          >
            {type === "password" ? <PasswordInput {...control} /> : <Input type={type} defaultValue={state.email} {...control} />}
          </FormField>
        );
      })}
      {state.message && (
        <p role="alert" className="rounded-lg bg-white px-4 py-3 text-sm leading-[1.35] font-semibold text-brand">
          {state.message}
        </p>
      )}
      {state.notice && (
        <p role="status" className="rounded-lg bg-white px-4 py-3 text-sm leading-[1.35] font-semibold text-ink">
          {state.notice}
        </p>
      )}
      <Button type="submit" variant="brand" size="cta" disabled={pending} className="h-14 w-full rounded-xl text-base tracking-normal normal-case">
        {pending ? "Memproses..." : submitLabel}
      </Button>
    </form>
  );
}
