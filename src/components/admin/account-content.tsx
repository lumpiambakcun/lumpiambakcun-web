import { connection } from "next/server";
import { AccountCard } from "@/components/admin/account-card";
import { requireAdmin } from "@/lib/admin-auth";
import { getProfile } from "@/lib/profiles";

export async function AccountContent() {
  await connection();
  const user = await requireAdmin();
  const profile = await getProfile(user.id);
  const email = user.email ?? "";
  const name = profile?.full_name || email.split("@")[0] || "Admin";

  return <AccountCard name={name} email={email} pendingEmail={user.new_email} avatarUrl={profile?.avatar_url ?? undefined} />;
}
