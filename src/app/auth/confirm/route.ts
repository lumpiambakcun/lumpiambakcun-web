import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

const safeNext = (value: string | null) => (value && /^\/admin(\/[\w-]+)*$/.test(value) ? value : "/admin");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, siteConfig.url));

  if (tokenHash && (type === "recovery" || type === "email_change")) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return redirectTo(safeNext(searchParams.get("next")));
  }

  return redirectTo("/admin/lupa-password?galat=1");
}
