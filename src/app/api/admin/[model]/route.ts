import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function sanitize(data: Record<string, unknown>): Record<string, unknown> {
  const result = { ...data };
  for (const key of Object.keys(result)) {
    const val = result[key];
    // Convert string booleans
    if (val === "true") result[key] = true;
    if (val === "false") result[key] = false;
    // Convert date strings for known fields
    if (
      typeof val === "string" &&
      (key === "startDate" || key === "endDate" || key === "publishedAt") &&
      val.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      result[key] = new Date(val);
    }
    // Remove empty strings for optional fields
    if (val === "" && key !== "title" && key !== "description" && key !== "quote") {
      result[key] = null;
    }
  }
  return result;
}

const modelMap: Record<string, keyof typeof prisma> = {
  cause: "cause",
  project: "project",
  event: "event",
  blog: "blogPost",
  testimonial: "testimonial",
  donor: "donor",
  gallery: "galleryImage",
  "hero-slide": "heroSlide",
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model } = await params;
  const prismaModel = modelMap[model];
  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  const body = sanitize(await req.json());

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (prisma[prismaModel] as any).create({ data: body });
    revalidatePath("/");
    revalidatePath(`/admin`);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ model: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model } = await params;
  const prismaModel = modelMap[model];
  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  const body = sanitize(await req.json());
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (prisma[prismaModel] as any).update({
      where: { id },
      data,
    });
    revalidatePath("/");
    revalidatePath(`/admin`);
    return NextResponse.json(item);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
