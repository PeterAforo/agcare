import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Governance | AGREDS",
  description:
    "AGREDS governance structure, leadership, and accountability framework.",
};

export default function GovernancePage() {
  return (
    <>
      <PageBanner
        title="Governance"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about/profile" },
          { label: "Governance" },
        ]}
      />

      {/* Governance Overview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Leadership & Accountability
            </span>
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 32, color: "#343877", lineHeight: 1.25 }}
            >
              Our Governance Structure
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
              AGREDS operates under the oversight of the Assemblies of God
              Church, Ghana, with a clear governance framework ensuring
              transparency, accountability, and effective stewardship of
              resources entrusted to us by donors, partners, and communities.
            </p>
            <p className="mb-8 leading-relaxed" style={{ color: "#555" }}>
              Our governance structure includes a Board of Directors, an
              Executive Management Team, and programme-level coordinators
              who ensure that all interventions are delivered with integrity,
              efficiency, and measurable impact.
            </p>
          </div>
        </div>
      </section>

      {/* Governance Tiers */}
      <section style={{ backgroundColor: "#f8f9fa" }} className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Governance Tiers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Board of Directors",
                desc: "Provides strategic oversight and policy direction. Comprises senior church leaders and independent professionals who ensure AGREDS fulfils its mandate with accountability.",
                color: "#343877",
              },
              {
                title: "Executive Management",
                desc: "Led by the Executive Director, the management team oversees day-to-day operations, programme implementation, financial management, and stakeholder engagement.",
                color: "#2ec774",
              },
              {
                title: "Programme Coordinators",
                desc: "Regional and thematic coordinators manage field-level implementation, community engagement, monitoring & evaluation, and reporting across all 16 regions.",
                color: "#efc940",
              },
            ].map((tier) => (
              <div
                key={tier.title}
                className="bg-white rounded-lg p-8 shadow-sm text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: tier.color + "15" }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: tier.color }}
                  />
                </div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: 20, color: "#343877" }}
                >
                  {tier.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accountability */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="font-bold mb-6"
              style={{ fontSize: 28, color: "#343877" }}
            >
              Commitment to Accountability
            </h2>
            <p className="mb-4 leading-relaxed" style={{ color: "#555" }}>
              AGREDS maintains rigorous financial controls, annual audits, and
              transparent reporting to all stakeholders. We adhere to
              international standards of non-profit governance and are
              accountable to the communities we serve, our church leadership,
              and our development partners.
            </p>
            <p className="leading-relaxed" style={{ color: "#555" }}>
              All programmes undergo regular monitoring and evaluation, with
              impact reports shared with donors and published in our annual
              reports.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
