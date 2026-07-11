import { NextRequest, NextResponse } from "next/server";
import { repository, StoreWriteError } from "@/lib/store";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await repository.list();
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.brand) {
    return NextResponse.json(
      { error: "name and brand are required" },
      { status: 400 }
    );
  }
  try {
    const product = await repository.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (err) {
    if (err instanceof StoreWriteError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    throw err;
  }
}
