import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | AG Care Ghana",
  robots: { index: false },
};

export default async function DonateThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  return (
    <>
      <PageBanner
        title="Thank You"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donate", href: "/get-involved/donate" }, { label: "Thank You" }]}
      />
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-6" style={{ color: "#2ec774" }} />
            <h2 className="font-bold mb-4" style={{ fontSize: 32, color: "#343877" }}>
              Your Donation Was Received
            </h2>
            <p className="text-lg mb-2" style={{ color: "#555" }}>
              Thank you for your generosity. Your support helps deliver hope,
              health, and opportunity to communities across Ghana.
            </p>
            {ref && (
              <p className="text-sm mb-8" style={{ color: "#9e9e9e" }}>
                Reference: <span className="font-mono">{ref}</span>
              </p>
            )}
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: "#2ec774" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
