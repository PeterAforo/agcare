import type { Metadata } from "next";
import PageBanner from "@/components/public/PageBanner";
import ContactForm from "@/components/public/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | AG Care Ghana",
  description:
    "Get in touch with AG Care Ghana — reach us at our Abofu-Achimota, Accra head office or send us a message online.",
};

export default function ContactsPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contacts" },
        ]}
      />

      {/* Contact Info + Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: Info */}
            <div className="lg:w-5/12">
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-3 block"
                style={{ color: "#9e9e9e" }}
              >
                Get in Touch
              </span>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: 32, color: "#343877", lineHeight: 1.25 }}
              >
                We&apos;d Love to Hear From You
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: "#555" }}>
                Whether you have a question, want to partner with us, or are
                looking for ways to get involved — we&apos;re here to help.
                Reach out to us using any of the methods below.
              </p>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "#343877" }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="font-bold mb-1"
                      style={{ fontSize: 16, color: "#343877" }}
                    >
                      Office Address
                    </h4>
                    <p className="text-sm" style={{ color: "#555" }}>
                      AG Care Ghana Head Office
                      <br />
                      P.O. Box CT482, Cantonments
                      <br />
                      15 Kobla Nelson Rd, Abofu-Achimota
                      <br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "#2ec774" }}
                  >
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="font-bold mb-1"
                      style={{ fontSize: 16, color: "#343877" }}
                    >
                      Phone Numbers
                    </h4>
                    <p className="text-sm" style={{ color: "#555" }}>
                      <a
                        href="tel:+233302966331"
                        className="hover:underline"
                      >
                        +233 302 966 331
                      </a>
                      <br />
                      <a
                        href="tel:+233302966333"
                        className="hover:underline"
                      >
                        +233 302 966 333
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "#efc940" }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#343877"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4
                      className="font-bold mb-1"
                      style={{ fontSize: 16, color: "#343877" }}
                    >
                      Email
                    </h4>
                    <p className="text-sm" style={{ color: "#555" }}>
                      <a
                        href="mailto:info@agcareghana.org"
                        className="hover:underline"
                      >
                        info@agcareghana.org
                      </a>
                    </p>
                  </div>
                </div>

                {/* Socials */}
                <div className="flex gap-3 pt-2">
                  {[
                    {
                      label: "Facebook",
                      d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                    },
                    {
                      label: "Twitter",
                      d: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
                    },
                    {
                      label: "Instagram",
                      d: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href="#"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: "#343877",
                        color: "#fff",
                      }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={social.d}
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:w-7/12">
              <div
                className="bg-white rounded-lg p-8 lg:p-10"
                style={{ boxShadow: "0 0 30px rgba(0,0,0,0.06)" }}
              >
                <h3
                  className="font-bold mb-6"
                  style={{ fontSize: 22, color: "#343877" }}
                >
                  Send Us a Message
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <iframe
          title="AG Care Ghana Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7228862036456!2d-0.187!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnMTMuMyJOIDDCsDExJzEzLjIiVw!5e0!3m2!1sen!2sgh!4v1600000000000"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
