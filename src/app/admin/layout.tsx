import type { Metadata } from "next";
import AdminProviders from "@/components/admin/AdminProviders";

export const metadata: Metadata = {
  title: "Admin | AGREDS CMS",
  robots: "noindex, nofollow",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProviders>{children}</AdminProviders>;
}
