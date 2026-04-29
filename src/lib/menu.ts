import { prisma } from "./prisma";

export interface MenuItemWithChildren {
  id: string;
  label: string;
  href: string | null;
  pageSlug: string | null;
  openNewTab: boolean;
  children: MenuItemWithChildren[];
}

export async function getMenuByLocation(location: "HEADER" | "FOOTER" | "SIDEBAR"): Promise<MenuItemWithChildren[]> {
  const menu = await prisma.menu.findFirst({
    where: { location, isActive: true },
    include: {
      items: {
        where: { parentId: null, isActive: true },
        orderBy: { order: "asc" },
        include: {
          page: { select: { slug: true } },
          children: {
            where: { isActive: true },
            orderBy: { order: "asc" },
            include: { page: { select: { slug: true } } },
          },
        },
      },
    },
  });

  if (!menu) return [];

  return menu.items.map((item) => ({
    id: item.id,
    label: item.label,
    href: item.href,
    pageSlug: item.page?.slug || null,
    openNewTab: item.openNewTab,
    children: item.children.map((child) => ({
      id: child.id,
      label: child.label,
      href: child.href,
      pageSlug: child.page?.slug || null,
      openNewTab: child.openNewTab,
      children: [],
    })),
  }));
}

export function resolveHref(item: MenuItemWithChildren): string {
  if (item.pageSlug) return `/${item.pageSlug}`;
  if (item.href && item.href !== "#") return item.href;
  return "#";
}
