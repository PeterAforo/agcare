import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/public/PageBanner";

export const metadata: Metadata = {
  title: "Reports | AG Care Ghana",
  description:
    "AG Care Ghana annual reports, programme reports, and impact documentation.",
};

export default function ReportsPage() {
  const reports = [
    {
      title: "Annual Report 2024",
      desc: "A comprehensive overview of AG Care Ghana activities, achievements, and financial performance for the year 2024.",
      year: "2024",
    },
    {
      title: "Annual Report 2023",
      desc: "Programme highlights, impact metrics, and financial statements for the 2023 fiscal year.",
      year: "2023",
    },
    {
      title: "COVID-19 Response Report",
      desc: "Detailed account of AG Care Ghana emergency response during the COVID-19 pandemic, including communities reached and resources deployed.",
      year: "2021",
    },
    {
      title: "Strategic Plan 2020–2025",
      desc: "AG Care Ghana five-year strategic plan outlining goals, programme priorities, and implementation strategies.",
      year: "2020",
    },
  ];

  return (
    <>
      <PageBanner
        title="Reports"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Media", href: "/media/news" },
          { label: "Reports" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span
              className="text-xs font-semibold uppercase tracking-widest mb-3 block"
              style={{ color: "#9e9e9e" }}
            >
              Documentation
            </span>
            <h2 className="font-bold" style={{ fontSize: 32, color: "#343877" }}>
              Reports & Publications
            </h2>
            <p className="mt-3 max-w-xl mx-auto" style={{ color: "#555" }}>
              Access AG Care Ghana annual reports, programme reports, and strategic
              documents. These publications reflect our commitment to
              transparency and accountability.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {reports.map((report) => (
              <div
                key={report.title}
                className="bg-white rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm"
                style={{ boxShadow: "0 0 15px rgba(15,13,13,0.06)" }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: "#343877" }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3
                    className="font-bold mb-1"
                    style={{ fontSize: 16, color: "#343877" }}
                  >
                    {report.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#555" }}>
                    {report.desc}
                  </p>
                </div>

                {/* Year badge */}
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#efc940", color: "#343877" }}
                >
                  {report.year}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm" style={{ color: "#9e9e9e" }}>
              For additional reports or specific programme documentation, please{" "}
              <Link
                href="/contacts"
                className="font-semibold underline"
                style={{ color: "#343877" }}
              >
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
