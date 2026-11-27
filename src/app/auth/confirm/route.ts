import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

const safeNext = (value: string | null) => (value && /^\/admin(\/[\w-]+)*$/.test(value) ? value : "/admin");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, siteConfig.url));

  const credentials =
    type === "recovery" && tokenHash
      ? ({ type, token_hash: tokenHash } as const)
      : type === "email_change" && token && email
        ? ({ type, email, token } as const)
        : undefined;

  if (credentials) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp(credentials);
    if (!error) return redirectTo(safeNext(searchParams.get("next")));
  }

  return redirectTo("/admin/lupa-password?galat=1");
}
