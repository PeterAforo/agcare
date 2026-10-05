import { prisma } from "@/lib/prisma";
import { getSessionUser, hasMinRole } from "@/lib/rbac";
import SettingsForm from "./SettingsForm";
import Forbidden from "@/components/admin/Forbidden";

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user || !hasMinRole(user.role, "ADMIN")) {
    return <Forbidden message="Only administrators can manage site settings." />;
  }

  const settings = await prisma.siteSettings.findFirst();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold" style={{ color: "#343877" }}>Site Settings</h1>
        <p className="text-sm mt-1" style={{ color: "#9e9e9e" }}>Manage general site configuration</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl">
        <SettingsForm
          initialData={settings ? {
            id: settings.id,
            siteName: settings.siteName,
            tagline: settings.tagline || "",
            contactEmail: settings.contactEmail || "",
            contactPhone: settings.contactPhone || "",
            contactPhone2: settings.contactPhone2 || "",
            address: settings.address || "",
            socialLinks: settings.socialLinks as Record<string, string> || {},
          } : undefined}
        />
      </div>
    </div>
  );
}
