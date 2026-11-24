import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const safeNext = (value: string | null) => (value && /^\/admin(\/[\w-]+)*$/.test(value) ? value : "/admin");

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const target = request.nextUrl.clone();
  target.search = "";

  if (tokenHash && type === "recovery") {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      target.pathname = safeNext(searchParams.get("next"));
      return NextResponse.redirect(target);
    }
  }

  target.pathname = "/admin/lupa-password";
  target.searchParams.set("galat", "1");
  return NextResponse.redirect(target);
}
