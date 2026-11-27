import { FormField, fieldControlClass } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";

type PasswordFieldProps = {
  name: string;
  label: string;
  autoComplete: "current-password" | "new-password";
  error?: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
};

export function PasswordField({ name, label, autoComplete, error, autoFocus, value, onChange, children }: PasswordFieldProps) {
  return (
    <FormField id={name} label={label} error={error} tone="admin">
      <PasswordInput
        id={name}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        className={fieldControlClass}
        {...(onChange ? { value, onChange: (event) => onChange(event.target.value) } : {})}
        {...(error ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {})}
      />
      {children}
    </FormField>
  );
}
