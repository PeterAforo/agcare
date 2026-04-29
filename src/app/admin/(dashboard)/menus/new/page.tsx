import { prisma } from "@/lib/prisma";
import MenuEditor from "../MenuEditor";

export default async function NewMenuPage() {
  const pages = await prisma.page.findMany({
    where: { isPublished: true },
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: "#343877" }}>Create Menu</h1>
      <MenuEditor mode="create" pages={pages} />
    </div>
  );
}
