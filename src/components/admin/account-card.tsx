import { AccountRow } from "@/components/admin/account-row";
import { ChangeEmailDialog } from "@/components/admin/change-email-dialog";
import { ChangePasswordDialog } from "@/components/admin/change-password-dialog";
import { PendingEmailNotice } from "@/components/admin/pending-email-notice";
import { adminCardClass } from "@/components/admin/styles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsOf } from "@/lib/initials";
import { cn } from "@/lib/utils";

type AccountCardProps = {
  name: string;
  email: string;
  pendingEmail?: string;
  avatarUrl?: string;
};

export function AccountCard({ name, email, pendingEmail, avatarUrl }: AccountCardProps) {
  return (
    <div className={cn("flex w-full flex-col divide-y divide-border px-5 md:px-6", adminCardClass)}>
      <div className="flex items-center gap-3 py-4">
        <Avatar className="size-11">
          {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
          <AvatarFallback className="bg-brand text-sm font-bold text-primary-foreground">{initialsOf(name) || "A"}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-ink">{name}</span>
          <span className="truncate text-sm text-ink-muted">{email}</span>
        </div>
      </div>
      <AccountRow label="Email" action={<ChangeEmailDialog />} footer={pendingEmail && <PendingEmailNotice email={pendingEmail} />}>
        {email}
      </AccountRow>
      <AccountRow label="Kata sandi" action={<ChangePasswordDialog />}>
        <span aria-label="Disembunyikan">••••••••••</span>
      </AccountRow>
    </div>
  );
}
