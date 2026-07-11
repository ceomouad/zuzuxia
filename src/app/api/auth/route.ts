import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, checkPassword, isAuthed, sessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET -> current auth status (used by the admin page on load).
export async function GET() {
  return NextResponse.json({ authed: isAuthed() });
}

// POST -> login (body: { password }) or logout (body: { action: "logout" }).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (body?.action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete(ADMIN_COOKIE);
    return res;
  }

  if (!checkPassword(body?.password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
