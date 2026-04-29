"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHeroSlides() {
  return prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
}

export async function getHeroSlide(id: string) {
  return prisma.heroSlide.findUnique({ where: { id } });
}

export async function createHeroSlide(data: {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image: string;
  mobileImage?: string;
  tabletImage?: string;
  order?: number;
  isActive?: boolean;
}) {
  await prisma.heroSlide.create({ data });
  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
}

export async function updateHeroSlide(
  id: string,
  data: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    image?: string;
    mobileImage?: string;
    tabletImage?: string;
    order?: number;
    isActive?: boolean;
  }
) {
  await prisma.heroSlide.update({ where: { id }, data });
  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
}

export async function toggleHeroSlide(id: string, isActive: boolean) {
  await prisma.heroSlide.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/hero-slides");
  revalidatePath("/");
}
