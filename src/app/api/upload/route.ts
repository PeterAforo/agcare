import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/avif",
];
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: `File type ${file.type} not allowed` },
      { status: 415 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large (max 8MB)" },
      { status: 413 }
    );
  }

  const ext = path.extname(file.name) || `.${file.type.split("/")[1] || "bin"}`;
  const safeExt = ext.replace(/[^a-zA-Z0-9.]/g, "").toLowerCase();
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${safeExt}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, name);

  try {
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const url = `/uploads/${name}`;
    await prisma.mediaFile.create({
      data: {
        url,
        filename: file.name,
        mimeType: file.type,
        size: file.size,
      },
    });
    revalidatePath("/admin/media");

    return NextResponse.json({ url, filename: file.name }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 });
  }
}
