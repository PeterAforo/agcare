import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";

export async function POST(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const body = await req.json();
  const { sections, ...pageData } = body;

  try {
    const page = await prisma.page.create({
      data: {
        ...pageData,
        sections: {
          create: (sections || []).map(
            (s: { type: string; title: string; order: number; isVisible: boolean; content: object }) => ({
              type: s.type,
              title: s.title || null,
              order: s.order,
              isVisible: s.isVisible ?? true,
              content: s.content || {},
            })
          ),
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/pages");
    return NextResponse.json(page, { status: 201 });
  } catch (error) {
    console.error("Create page error:", error);
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const body = await req.json();
  const { id, sections, ...pageData } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Delete existing sections and recreate
    await prisma.section.deleteMany({ where: { pageId: id } });

    const page = await prisma.page.update({
      where: { id },
      data: {
        ...pageData,
        sections: {
          create: (sections || []).map(
            (s: { type: string; title: string; order: number; isVisible: boolean; content: object }) => ({
              type: s.type,
              title: s.title || null,
              order: s.order,
              isVisible: s.isVisible ?? true,
              content: s.content || {},
            })
          ),
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/admin/pages");
    revalidatePath(`/${page.slug}`);
    return NextResponse.json(page);
  } catch (error) {
    console.error("Update page error:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}
