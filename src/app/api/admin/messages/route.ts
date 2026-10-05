import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";

export async function PUT(req: NextRequest) {
  const guard = await requireRole("EDITOR");
  if (guard instanceof NextResponse) return guard;

  const { id, isRead, isReplied } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const msg = await prisma.contactMessage.update({
      where: { id },
      data: {
        ...(isRead !== undefined && { isRead }),
        ...(isReplied !== undefined && { isReplied }),
      },
    });
    return NextResponse.json(msg);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
