"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionUser, hasMinRole } from "@/lib/rbac";

async function requireEditor() {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "EDITOR")) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function createCause(data: {
  title: string;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  goalAmount?: number;
  pledgedAmount?: number;
  order?: number;
  isActive?: boolean;
}) {
  await requireEditor();
  await prisma.cause.create({ data });
  revalidatePath("/admin/causes");
  revalidatePath("/");
}

export async function updateCause(id: string, data: Record<string, unknown>) {
  await requireEditor();
  await prisma.cause.update({ where: { id }, data });
  revalidatePath("/admin/causes");
  revalidatePath("/");
}

export async function deleteCause(id: string) {
  await requireEditor();
  await prisma.cause.delete({ where: { id } });
  revalidatePath("/admin/causes");
  revalidatePath("/");
}

export async function toggleCause(id: string, isActive: boolean) {
  await requireEditor();
  await prisma.cause.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/causes");
  revalidatePath("/");
}
