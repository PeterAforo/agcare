import Header from "@/components/public/Header";
import type { NavItem } from "@/components/public/Header";
import Footer from "@/components/public/Footer";
import { getMenuByLocation, resolveHref } from "@/lib/menu";
import { getSiteSettings } from "@/lib/settings";

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
  const [headerMenu, footerMenu, settings] = await Promise.all([
    getMenuByLocation("HEADER"),
    getMenuByLocation("FOOTER"),
    getSiteSettings(),
  ]);
  const navItems = toNavItems(headerMenu);
  const footerNavItems = toNavItems(footerMenu);

  return (
    <>
      <Header navItems={navItems} settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer navItems={footerNavItems} settings={settings} />
    </>
  );
}
