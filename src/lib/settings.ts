import { prisma } from "./prisma";

export interface SiteSettingsData {
  siteName: string;
  tagline: string | null;
  logoLight: string | null;
  logoDark: string | null;
  favicon: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  contactPhone2: string | null;
  address: string | null;
  socialLinks: Record<string, string> | null;
}

const FALLBACK: SiteSettingsData = {
  siteName: "AG Care Ghana",
  tagline: "Transforming Lives Together",
  logoLight: "/images/logo_white.png",
  logoDark: "/images/logo_dark.png",
  favicon: null,
  contactEmail: "info@agcareghana.org",
  contactPhone: "+233 302 966 331",
  contactPhone2: "+233 302 966 333",
  address: "P.O. Box CT482, Cantonments, 15 Kobla Nelson Rd, Abofu-Achimota, Accra – Ghana",
  socialLinks: null,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  let settings;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch {
    return FALLBACK;
  }
  if (!settings) return FALLBACK;

  let socialLinks: Record<string, string> | null = null;
  if (settings.socialLinks) {
    try {
      socialLinks = settings.socialLinks as Record<string, string>;
    } catch {
      socialLinks = null;
    }
  }

  return {
    siteName: settings.siteName || FALLBACK.siteName,
    tagline: settings.tagline,
    logoLight: settings.logoLight || FALLBACK.logoLight,
    logoDark: settings.logoDark || FALLBACK.logoDark,
    favicon: settings.favicon,
    contactEmail: settings.contactEmail || FALLBACK.contactEmail,
    contactPhone: settings.contactPhone || FALLBACK.contactPhone,
    contactPhone2: settings.contactPhone2,
    address: settings.address || FALLBACK.address,
    socialLinks,
  };
}
