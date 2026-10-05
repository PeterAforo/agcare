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
  siteName: "AGREDS",
  tagline: null,
  logoLight: "/images/logo_white.png",
  logoDark: "/images/logo_dark.png",
  favicon: null,
  contactEmail: "info@agredsghana.org",
  contactPhone: "+233 (0) 302 779 458",
  contactPhone2: null,
  address: "P.O. Box AN 7593, Accra – Ghana",
  socialLinks: null,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const settings = await prisma.siteSettings.findFirst();
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
