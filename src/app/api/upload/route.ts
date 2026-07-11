import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isAuthed } from "@/lib/auth";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

// Accepts multipart/form-data with one or more `files` and returns their URLs.
export async function POST(req: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const urls: string[] = [];
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    for (const file of files) {
      if (!ALLOWED.has(file.type)) continue;
      const ext = file.type.split("/")[1].replace("jpeg", "jpg");
      const name = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(UPLOAD_DIR, name), buffer);
      urls.push(`/uploads/${name}`);
    }
  } catch {
    return NextResponse.json(
      {
        error:
          "Uploads need a writable filesystem. On serverless hosts, paste an " +
          "image URL instead or use object storage (see README).",
      },
      { status: 503 }
    );
  }

  if (!urls.length) {
    return NextResponse.json(
      { error: "Unsupported file type(s)" },
      { status: 400 }
    );
  }
  return NextResponse.json({ urls });
}
