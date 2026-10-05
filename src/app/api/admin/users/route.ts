import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { requireRole, hasMinRole } from "@/lib/rbac";

export async function GET() {
  const guard = await requireRole("VIEWER");
  if (guard instanceof NextResponse) return guard;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const { name, email, password, role } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
  }

  // Only SUPER_ADMIN can create privileged accounts
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && !hasMinRole(guard.role, "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Only super admins can create admin accounts" }, { status: 403 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: role || "EDITOR" },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json(user, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const guard = await requireRole("ADMIN");
  if (guard instanceof NextResponse) return guard;

  const { id, name, email, password, role } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // Only SUPER_ADMIN can grant/revoke admin privileges
  if ((role === "ADMIN" || role === "SUPER_ADMIN") && !hasMinRole(guard.role, "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Only super admins can assign admin roles" }, { status: 403 });
  }

  // Prevent self-demotion of the last super admin (basic guard)
  if (role && role !== "SUPER_ADMIN") {
    const target = await prisma.user.findUnique({ where: { id } });
    if (target?.role === "SUPER_ADMIN") {
      const superAdminCount = await prisma.user.count({ where: { role: "SUPER_ADMIN" } });
      if (superAdminCount <= 1) {
        return NextResponse.json({ error: "Cannot demote the last super admin" }, { status: 400 });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {};
  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (role !== undefined) data.role = role;
  if (password) data.password = await hash(password, 12);

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
