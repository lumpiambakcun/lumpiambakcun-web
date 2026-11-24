import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const requireAdmin = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user?.app_metadata?.role !== "admin") {
    if (data.user) await supabase.auth.signOut();
    redirect("/admin/login");
  }
  return data.user;
});
