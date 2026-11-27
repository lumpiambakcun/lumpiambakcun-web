"use client";

import { updateEmail } from "@/app/admin/(panel)/akun/actions";
import { AccountDialog } from "@/components/admin/account-dialog";
import { PasswordField } from "@/components/admin/password-field";
import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChangeEmailDialog() {
  return (
    <AccountDialog
      title="Ubah email"
      trigger={
        <Button type="button" variant="secondary" size="sm">
          Ubah email
        </Button>
      }
      action={updateEmail}
      submitLabel="Kirim link konfirmasi"
      successMessage="Link konfirmasi dikirim ke email baru."
    >
      {(errors) => (
        <>
          <FormField id="email" label="Email baru" error={errors.email} tone="admin">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              className={fieldControlClass}
              {...(errors.email ? { "aria-invalid": true, "aria-describedby": "email-error" } : {})}
            />
          </FormField>
          <PasswordField name="current" label="Kata sandi saat ini" autoComplete="current-password" error={errors.current} />
          <p className="text-xs leading-[1.5] text-ink-muted">Link konfirmasi dikirim ke email baru. Email lama tetap berlaku sampai dikonfirmasi.</p>
        </>
      )}
    </AccountDialog>
  );
}
