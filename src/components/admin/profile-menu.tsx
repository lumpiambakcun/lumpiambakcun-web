import { connection } from "next/server";
import { ProfileMenuView } from "@/components/admin/profile-menu-view";
import { requireAdmin } from "@/lib/admin-auth";
import { getProfile } from "@/lib/profiles";

export async function ProfileMenu() {
  await connection();
  const user = await requireAdmin();
  const profile = await getProfile(user.id);
  const email = profile?.email || user.email || "";
  const name = profile?.full_name || email.split("@")[0] || "Admin";

  return <ProfileMenuView name={name} email={email} avatarUrl={profile?.avatar_url ?? undefined} />;
}
