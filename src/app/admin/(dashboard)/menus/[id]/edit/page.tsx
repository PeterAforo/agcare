import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import MenuEditor from "../../MenuEditor";

export default async function EditMenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const menu = await prisma.menu.findUnique({
    where: { id },
    include: {
      items: {
        where: { parentId: null },
        orderBy: { order: "asc" },
        include: {
          children: {
            orderBy: { order: "asc" },
            include: { page: { select: { id: true, slug: true } } },
          },
          page: { select: { id: true, slug: true } },
        },
      },
    },
  });
  if (!menu) notFound();

  const pages = await prisma.page.findMany({
    where: { isPublished: true },
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  const initialData = {
    id: menu.id,
    name: menu.name,
    location: menu.location,
    isActive: menu.isActive,
    items: menu.items.map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      pageId: item.pageId,
      parentId: item.parentId,
      order: item.order,
      openNewTab: item.openNewTab,
      isActive: item.isActive,
      children: item.children.map((child) => ({
        id: child.id,
        label: child.label,
        href: child.href,
        pageId: child.pageId,
        parentId: child.parentId,
        order: child.order,
        openNewTab: child.openNewTab,
        isActive: child.isActive,
        children: [],
      })),
    })),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Edit Menu: {menu.name}</h1>
      <MenuEditor mode="edit" initialData={initialData} pages={pages} />
    </div>
  );
}
