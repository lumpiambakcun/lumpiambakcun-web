import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

function isAuthorized(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;
  const given = Buffer.from(request.headers.get("authorization") ?? "");
  const expected = Buffer.from(`Bearer ${secret}`);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
