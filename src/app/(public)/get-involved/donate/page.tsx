import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import PageBanner from "@/components/public/PageBanner";
import DonateForm from "@/components/public/DonateForm";

export const metadata: Metadata = {
  title: "Donate | AG Care Ghana",
  description:
    "Support AG Care Ghana — your donation helps deliver health, education, relief, and development programmes across Ghana.",
};

export default function DonatePage() {
  const causes = [
    {
      title: "Health & Medical Outreach",
      desc: "Fund mobile clinics, medicine supplies, and health education for rural communities.",
      color: "#f58ca6",
    },
    {
      title: "Education & Child Development",
      desc: "Sponsor a child's education, learning materials, and development programmes.",
      color: "#49C2DF",
    },
    {
      title: "Women's Empowerment",
      desc: "Support vocational training, micro-enterprise grants, and family strengthening.",
      color: "#2ec774",
    },
    {
      title: "Community Development",
      desc: "Help build water systems, sanitation facilities, and agricultural projects.",
      color: "#efc940",
    },
    {
      title: "Emergency Relief",
      desc: "Provide food, shelter, and medical care to disaster-affected families.",
      color: "#f8ac3a",
    },
    {
      title: "General Fund",
      desc: "Give to where the need is greatest — supporting all AG Care Ghana programmes.",
      color: "#343877",
    },
  ];

  return (
    <>
      <PageBanner
        title="Donate"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Involved" },
          { label: "Donate" },
        ]}
      />

      {/* Donate Intro */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Your Generosity Matters
            </span>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 32, color: "#343877", lineHeight: 1.3 }}
            >
              Every Gift Brings Hope to a Family in Need
            </h2>
            <p className="leading-relaxed text-lg mb-8" style={{ color: "#555" }}>
              Your donation — no matter the size — directly supports AG Care Ghana
              programmes in health, education, relief, and community development
              across Ghana. 100% of your gift goes towards our mission.
            </p>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: "#efc940" }}
            />
          </div>
        </div>
      </section>

      {/* Cause Cards */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 28, color: "#343877" }}>
              Choose a Cause
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => (
              <div
                key={cause.title}
                className="bg-white rounded-lg p-8 shadow-sm border-l-4 transition-transform hover:-translate-y-1"
                style={{ borderLeftColor: cause.color }}
              >
                <h3
                  className="font-bold mb-2"
                  style={{ fontSize: 18, color: "#343877" }}
                >
                  {cause.title}
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#555" }}>
                  {cause.desc}
                </p>
                <Link
                  href={`/get-involved/donate?cause=${encodeURIComponent(cause.title)}#donate`}
                  className="inline-block px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                  style={{
                    border: `2px solid ${cause.color}`,
                    color: cause.color === "#efc940" ? "#343877" : cause.color,
                  }}
                >
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Donation Form */}
      <section id="donate" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-bold mb-3" style={{ fontSize: 28, color: "#343877" }}>
                Give Online — Securely
              </h2>
              <p className="text-sm" style={{ color: "#555" }}>
                Pay with card or mobile money. Your donation is processed
                securely by PaySwitch Teller.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm border" style={{ borderColor: "#f1f3f5" }}>
              <Suspense fallback={<p className="text-center text-sm" style={{ color: "#9e9e9e" }}>Loading form…</p>}>
                <DonateForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* How to Donate */}
      <section className="py-16 lg:py-24" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="font-bold"
                style={{ fontSize: 28, color: "#343877" }}
              >
                How to Donate
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  num: "01",
                  title: "Bank Transfer",
                  desc: "Transfer directly to our bank account. Contact us for banking details.",
                },
                {
                  num: "02",
                  title: "Mobile Money",
                  desc: "Send via MTN Mobile Money, Vodafone Cash, or AirtelTigo Money. Contact us for details.",
                },
                {
                  num: "03",
                  title: "In Person",
                  desc: "Visit our office in Accra to make a cash or cheque donation.",
                },
                {
                  num: "04",
                  title: "Through Your Church",
                  desc: "Donate through your local Assemblies of God congregation. Ask your pastor for details.",
                },
              ].map((method) => (
                <div key={method.num} className="flex gap-5 items-start">
                  <span
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: "#efc940", color: "#343877" }}
                  >
                    {method.num}
                  </span>
                  <div>
                    <h3
                      className="font-bold mb-1"
                      style={{ fontSize: 18, color: "#343877" }}
                    >
                      {method.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                      {method.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/contacts"
                className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm uppercase tracking-wide transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: "#2ec774" }}
              >
                Contact Us for Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
