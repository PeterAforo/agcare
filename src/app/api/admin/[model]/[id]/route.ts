import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole, hasMinRole } from "@/lib/rbac";

// Minimum role required to DELETE each model (defaults to EDITOR)
const deleteRoleMap: Record<string, "EDITOR" | "ADMIN"> = {
  user: "ADMIN",
  gateway: "ADMIN",
};

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
  media: "mediaFile",
  "team-member": "teamMember",
  subscriber: "subscriber",
  user: "user",
  gateway: "paymentGateway",
  "contact-message": "contactMessage",
};

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ model: string; id: string }> }
) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const { model, id } = await params;

  const minRole = deleteRoleMap[model] || "EDITOR";
  if (minRole === "ADMIN" && !hasMinRole(guard.role, "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const prismaModel = modelMap[model];
  if (!prismaModel) {
    return NextResponse.json({ error: "Invalid model" }, { status: 400 });
  }

  try {
    if (model === "user") {
      if (id === guard.id) {
        return NextResponse.json(
          { error: "You cannot delete your own account" },
          { status: 400 }
        );
      }
      const target = await prisma.user.findUnique({ where: { id } });
      if (target?.role === "SUPER_ADMIN") {
        const superAdminCount = await prisma.user.count({
          where: { role: "SUPER_ADMIN" },
        });
        if (superAdminCount <= 1) {
          return NextResponse.json(
            { error: "Cannot delete the last super admin" },
            { status: 400 }
          );
        }
      }
    }
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
  const guard = await requireRole("VIEWER");
  if (guard instanceof NextResponse) return guard;

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
