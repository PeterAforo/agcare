import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";

export async function POST(req: NextRequest) {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const body = await req.json();
  const { id, ...data } = body;

  try {
    if (id) {
      await prisma.siteSettings.update({ where: { id }, data });
    } else {
      await prisma.siteSettings.create({ data });
    }
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
