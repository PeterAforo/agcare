import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/rbac";
import { getAdapter } from "@/lib/payments/registry";

export async function GET() {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const gateways = await prisma.paymentGateway.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { donations: true } } },
  });
  return NextResponse.json(gateways);
}

export async function POST(req: NextRequest) {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const { name, provider, credentials, webhookSecret, isActive, isDefault } =
    await req.json();

  if (!name || !provider) {
    return NextResponse.json(
      { error: "Name and provider are required." },
      { status: 400 }
    );
  }
  if (!getAdapter(provider)) {
    return NextResponse.json(
      { error: `Unknown provider "${provider}".` },
      { status: 400 }
    );
  }

  try {
    if (isDefault) {
      await prisma.paymentGateway.updateMany({
        data: { isDefault: false },
      });
    }
    const gateway = await prisma.paymentGateway.create({
      data: {
        name,
        provider,
        credentials: credentials || {},
        webhookSecret: webhookSecret || null,
        isActive: isActive ?? true,
        isDefault: isDefault ?? false,
      },
    });
    revalidatePath("/admin/gateways");
    return NextResponse.json(gateway, { status: 201 });
  } catch (err) {
    console.error("Create gateway error:", err);
    return NextResponse.json({ error: "Failed to create." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const { id, name, credentials, webhookSecret, isActive, isDefault } =
    await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required." }, { status: 400 });
  }

  try {
    if (isDefault) {
      await prisma.paymentGateway.updateMany({
        where: { id: { not: id } },
        data: { isDefault: false },
      });
    }
    const gateway = await prisma.paymentGateway.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(credentials !== undefined && { credentials }),
        ...(webhookSecret !== undefined && { webhookSecret: webhookSecret || null }),
        ...(isActive !== undefined && { isActive }),
        ...(isDefault !== undefined && { isDefault }),
      },
    });
    revalidatePath("/admin/gateways");
    return NextResponse.json(gateway);
  } catch (err) {
    console.error("Update gateway error:", err);
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}
