import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";

interface ItemInput {
  id?: string;
  label: string;
  href: string | null;
  pageId: string | null;
  order: number;
  openNewTab: boolean;
  isActive: boolean;
  children: ItemInput[];
}

export async function POST(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const { name, location, isActive, items } = await req.json();

  try {
    const menu = await prisma.menu.create({
      data: { name, location, isActive: isActive ?? true },
    });

    // Create items with children
    for (const item of (items || []) as ItemInput[]) {
      const created = await prisma.menuItem.create({
        data: {
          menuId: menu.id,
          label: item.label,
          href: item.href,
          pageId: item.pageId || null,
          order: item.order,
          openNewTab: item.openNewTab ?? false,
          isActive: item.isActive ?? true,
        },
      });

      for (const child of item.children || []) {
        await prisma.menuItem.create({
          data: {
            menuId: menu.id,
            parentId: created.id,
            label: child.label,
            href: child.href,
            pageId: child.pageId || null,
            order: child.order,
            openNewTab: child.openNewTab ?? false,
            isActive: child.isActive ?? true,
          },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/menus");
    return NextResponse.json(menu, { status: 201 });
  } catch (error) {
    console.error("Create menu error:", error);
    return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const { id, name, location, isActive, items } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Update menu metadata
    await prisma.menu.update({
      where: { id },
      data: { name, location, isActive: isActive ?? true },
    });

    // Delete all existing items and recreate
    await prisma.menuItem.deleteMany({ where: { menuId: id } });

    for (const item of (items || []) as ItemInput[]) {
      const created = await prisma.menuItem.create({
        data: {
          menuId: id,
          label: item.label,
          href: item.href,
          pageId: item.pageId || null,
          order: item.order,
          openNewTab: item.openNewTab ?? false,
          isActive: item.isActive ?? true,
        },
      });

      for (const child of item.children || []) {
        await prisma.menuItem.create({
          data: {
            menuId: id,
            parentId: created.id,
            label: child.label,
            href: child.href,
            pageId: child.pageId || null,
            order: child.order,
            openNewTab: child.openNewTab ?? false,
            isActive: child.isActive ?? true,
          },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/admin/menus");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update menu error:", error);
    return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
  }
}
