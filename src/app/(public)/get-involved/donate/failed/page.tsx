import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";
import { XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Donation Not Completed | AG Care Ghana",
  robots: { index: false },
};

const MESSAGES: Record<string, string> = {
  FAILED: "Your payment could not be completed.",
  CANCELLED: "The payment was cancelled.",
  PENDING: "Your payment is still being processed. If it completes, we will record it automatically.",
  notfound: "We could not find that donation reference.",
};

export default async function DonateFailedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; status?: string }>;
}) {
  const { ref, status } = await searchParams;
  const msg = MESSAGES[status || "FAILED"] || MESSAGES.FAILED;
  return (
    <>
      <PageBanner
        title="Donation Status"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Donate", href: "/get-involved/donate" }, { label: "Status" }]}
      />
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <XCircle className="w-16 h-16 mx-auto mb-6" style={{ color: "#f58ca6" }} />
            <h2 className="font-bold mb-4" style={{ fontSize: 32, color: "#343877" }}>
              {status === "PENDING" ? "Payment Pending" : "Donation Not Completed"}
            </h2>
            <p className="text-lg mb-2" style={{ color: "#555" }}>{msg}</p>
            {ref && (
              <p className="text-sm mb-8" style={{ color: "#9e9e9e" }}>
                Reference: <span className="font-mono">{ref}</span>
              </p>
            )}
            <div className="flex gap-3 justify-center">
              <Link
                href="/get-involved/donate"
                className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#2ec774" }}
              >
                Try Again
              </Link>
              <Link
                href="/contacts"
                className="inline-block px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide border-2"
                style={{ borderColor: "#343877", color: "#343877" }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
