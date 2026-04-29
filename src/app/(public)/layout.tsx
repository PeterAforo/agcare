import Header from "@/components/public/Header";
import type { NavItem } from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { getMenuByLocation, resolveHref } from "@/lib/menu";

function toNavItems(
  items: Awaited<ReturnType<typeof getMenuByLocation>>
): NavItem[] {
  return items.map((item) => ({
    label: item.label,
    href: resolveHref(item),
    openNewTab: item.openNewTab,
    ...(item.children.length > 0
      ? {
          children: item.children.map((child) => ({
            label: child.label,
            href: resolveHref(child),
            openNewTab: child.openNewTab,
          })),
        }
      : {}),
  }));
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerMenu = await getMenuByLocation("HEADER");
  const navItems = toNavItems(headerMenu);

  return (
    <>
      <Header navItems={navItems} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
