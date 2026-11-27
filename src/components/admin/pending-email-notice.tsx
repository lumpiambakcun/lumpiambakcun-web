"use client";

import { Clock } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { resendEmailChange } from "@/app/admin/(panel)/akun/actions";
import { Button } from "@/components/ui/button";

export function PendingEmailNotice({ email }: { email: string }) {
  const [pending, startTransition] = useTransition();

  const resend = () =>
    startTransition(async () => {
      const result = await resendEmailChange();
      if (result.ok) toast.success("Link konfirmasi dikirim ulang.");
      else toast.error(result.message);
    });

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted">
      <Clock className="size-3.5 shrink-0" aria-hidden="true" />
      <span className="min-w-0 break-all">Menunggu konfirmasi: {email}</span>
      <Button type="button" variant="link" size="xs" loading={pending} onClick={resend} className="h-auto px-0 text-xs">
        Kirim ulang
      </Button>
    </div>
  );
}
