import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "zzx_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "zuzuxia-admin";
}

/** Opaque session token derived from the password (never the raw password). */
export function sessionToken(): string {
  return createHash("sha256")
    .update(`zzx::${adminPassword()}`)
    .digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const a = Buffer.from(
    createHash("sha256").update(candidate || "").digest("hex")
  );
  const b = Buffer.from(
    createHash("sha256").update(adminPassword()).digest("hex")
  );
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isAuthed(): boolean {
  const cookie = cookies().get(ADMIN_COOKIE)?.value;
  if (!cookie) return false;
  const expected = Buffer.from(sessionToken());
  const got = Buffer.from(cookie);
  return got.length === expected.length && timingSafeEqual(got, expected);
}
