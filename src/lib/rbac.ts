import { auth } from "./auth";
import type { NextResponse } from "next/server";

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR" | "VIEWER";

const ROLE_RANK: Record<string, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  EDITOR: 2,
  VIEWER: 1,
};

export function hasMinRole(role: string | undefined, minRole: Role): boolean {
  if (!role) return false;
  return (ROLE_RANK[role] ?? 0) >= ROLE_RANK[minRole];
}

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: string;
}

/**
 * Returns the authenticated session user, or null.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth();
  if (!session?.user) return null;
  return {
    id: (session.user as { id: string }).id,
    name: session.user.name,
    email: session.user.email,
    role: (session.user as { role: string }).role,
  };
}

/**
 * API guard. Returns the session user if authorized, otherwise returns a
 * NextResponse (401 or 403) that the caller should return directly.
 *
 * Usage:
 *   const user = await requireRole("EDITOR");
 *   if (user instanceof NextResponse) return user;
 */
export async function requireRole(
  minRole: Role
): Promise<SessionUser | NextResponse> {
  const user = await getSessionUser();
  if (!user) {
    const { NextResponse } = await import("next/server");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasMinRole(user.role, minRole)) {
    const { NextResponse } = await import("next/server");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return user;
}
