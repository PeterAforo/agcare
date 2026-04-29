import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const modelMap: Record<string, keyof typeof prisma> = {
  cause: "cause",
  project: "project",
  event: "event",
  blog: "blogPost",
  testimonial: "testimonial",
  donor: "donor",
  gallery: "galleryImage",
  "hero-slide": "heroSlide",
  page: "page",
  menu: "menu",
  "menu-item": "menuItem",
};

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model, id } = await params;
  const prismaModel = modelMap[model];
  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma[prismaModel] as any).delete({ where: { id } });
    revalidatePath("/");
    revalidatePath(`/admin/${model}s`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { model, id } = await params;
  const prismaModel = modelMap[model];
  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (prisma[prismaModel] as any).findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
