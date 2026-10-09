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
    default: "AG Care Ghana | Transforming Lives Together",
    template: "%s | AG Care Ghana",
  },
  description:
    "AG Care Ghana is the humanitarian and development agency of the Assemblies of God Church, Ghana — working with partners in the love of God to eliminate poverty through education, health and economic livelihood empowerment.",
  keywords:
    "AG Care Ghana, Ghana, Assemblies of God, charity, humanitarian, development, education, health, livelihoods",
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "https://agcareghana.org"),
  openGraph: {
    type: "website",
    siteName: "AG Care Ghana",
    title: "AG Care Ghana | Transforming Lives Together",
    description:
      "The humanitarian and development agency of the Assemblies of God Church, Ghana — empowering vulnerable communities through education, health and livelihood programmes.",
    images: [{ url: "/images/promo_1.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AG Care Ghana | Transforming Lives Together",
    description:
      "Empowering vulnerable communities across Ghana through education, health and economic livelihood empowerment.",
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
