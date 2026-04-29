import type { Metadata } from "next";
import { Quicksand, Permanent_Marker } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-permanent-marker",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "AGREDS | Assemblies of God Relief and Development Services",
    template: "%s | AGREDS",
  },
  description:
    "AGREDS fights hunger, poverty, disease, illiteracy, and social injustice — empowering vulnerable children, women, families, and entire communities across Ghana.",
  keywords:
    "AGREDS, Ghana, relief, development, Assemblies of God, charity, humanitarian",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://agredsghana.org"),
  openGraph: {
    type: "website",
    siteName: "AGREDS",
    title: "AGREDS | Assemblies of God Relief and Development Services",
    description:
      "Empowering vulnerable children, women, families, and communities across Ghana through health, education, relief, and sustainable development.",
    images: [{ url: "/images/promo_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGREDS | Assemblies of God Relief and Development Services",
    description:
      "Empowering vulnerable communities across Ghana through education, health, relief, and development.",
    images: ["/images/promo_1.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${permanentMarker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
