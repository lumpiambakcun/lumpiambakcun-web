"use client";

import { Check, Circle } from "lucide-react";
import { useState } from "react";
import { updatePassword } from "@/app/admin/(panel)/akun/actions";
import { AccountDialog } from "@/components/admin/account-dialog";
import { PasswordField } from "@/components/admin/password-field";
import { Button } from "@/components/ui/button";
import { passwordMin } from "@/lib/password-rules";

function Rule({ met, children }: { met: boolean; children: string }) {
  const Icon = met ? Check : Circle;
  return (
    <li className={`flex items-center gap-1.5 text-xs leading-[1.4] ${met ? "font-medium text-ink" : "text-ink-muted"}`}>
      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="sr-only">{met ? "Terpenuhi: " : "Belum terpenuhi: "}</span>
      {children}
    </li>
  );
}

export function ChangePasswordDialog() {
  const [values, setValues] = useState({ current: "", password: "", konfirmasi: "" });
  const set = (key: keyof typeof values) => (value: string) => setValues((previous) => ({ ...previous, [key]: value }));

  const longEnough = values.password.length >= passwordMin;
  const matches = values.konfirmasi !== "" && values.konfirmasi === values.password;
  const valid = values.current !== "" && longEnough && matches;

  return (
    <AccountDialog
      title="Ubah kata sandi"
      trigger={
        <Button type="button" variant="secondary" size="sm">
          Ubah kata sandi
        </Button>
      }
      action={updatePassword}
      submitLabel="Simpan"
      successMessage="Kata sandi diganti."
      submitDisabled={!valid}
      onClose={() => setValues({ current: "", password: "", konfirmasi: "" })}
    >
      {(errors) => (
        <>
          <PasswordField name="current" label="Kata sandi saat ini" autoComplete="current-password" error={errors.current} value={values.current} onChange={set("current")} autoFocus />
          <PasswordField name="password" label="Kata sandi baru" autoComplete="new-password" error={errors.password} value={values.password} onChange={set("password")}>
            <ul>
              <Rule met={longEnough}>{`Minimal ${passwordMin} karakter`}</Rule>
            </ul>
          </PasswordField>
          <PasswordField name="konfirmasi" label="Ulangi kata sandi baru" autoComplete="new-password" error={errors.konfirmasi} value={values.konfirmasi} onChange={set("konfirmasi")}>
            <ul>
              <Rule met={matches}>Sama dengan kata sandi baru</Rule>
            </ul>
          </PasswordField>
        </>
      )}
    </AccountDialog>
  );
}
