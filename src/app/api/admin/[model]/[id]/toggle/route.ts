import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";

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
  "team-member": "teamMember",
  gateway: "paymentGateway",
};

const activeFieldMap: Record<string, string> = {
  cause: "isActive",
  project: "isPublished",
  event: "isPublished",
  blog: "isPublished",
  testimonial: "isActive",
  donor: "isActive",
  "hero-slide": "isActive",
  page: "isPublished",
  menu: "isActive",
  "menu-item": "isActive",
  "team-member": "isActive",
  gateway: "isActive",
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const { model, id } = await params;
  const prismaModel = modelMap[model];
  const activeField = activeFieldMap[model] || "isActive";

  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  const body = await req.json();
  const isActive = body.isActive;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (prisma[prismaModel] as any).update({
      where: { id },
      data: { [activeField]: isActive },
    });
    revalidatePath("/");
    revalidatePath(`/admin/${model}s`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to toggle" }, { status: 500 });
  }
}
