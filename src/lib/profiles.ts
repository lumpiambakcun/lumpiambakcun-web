import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: string | null;
};

export async function getProfile(id: string) {
  const { data } = await createAdminClient().from("profiles").select("*").eq("id", id).maybeSingle<Profile>();
  return data;
}
