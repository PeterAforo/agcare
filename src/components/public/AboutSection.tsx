"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28" id="about">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              About Us
            </span>
            <h2 className="mt-2 mb-6 leading-tight tracking-[-0.07em]">
              <span className="block text-3xl md:text-4xl lg:text-[50px] font-bold leading-[1.2]">
                Serving Communities,
              </span>
              <span className="block font-storytella text-3xl md:text-4xl lg:text-[50px] font-light leading-[1.2] tracking-[.02em]">
                Transforming Lives
              </span>
            </h2>
            <p className="font-bold text-gray-800 mb-5 leading-relaxed text-[15px]">
              Assemblies of God Relief and Development Services (AGREDS) is the
              humanitarian and development arm of the Assemblies of God Church,
              Ghana&mdash; committed to fighting hunger, poverty, disease, illiteracy, and
              social injustice while restoring dignity and hope to vulnerable
              communities.
            </p>
            <p className="text-gray-500 mb-5 leading-relaxed text-[15px]">
              For more than three decades, AGREDS has provided life-changing support across all
              16 regions of Ghana through Christ-centered programmes in health, education, child
              development, women&rsquo;s empowerment, community development, and emergency
              relief for families affected by conflict and disasters.
            </p>
            <p className="text-gray-500 mb-10 leading-relaxed text-[15px]">
              Working through church networks, local volunteers, community structures, and
              dedicated partners, AGREDS continues to build resilient communities&mdash;empowering
              children to stay in school, training young women in employable skills,
              strengthening rural healthcare, and providing hope to displaced families and
              vulnerable groups.
            </p>
            <Link
              href="/about/profile"
              className="inline-block border-2 border-accent-yellow text-primary text-xs font-bold uppercase tracking-[.05em] px-10 py-3.5 rounded-full hover:bg-accent-yellow hover:-translate-y-1 transition-all"
            >
              More About Us
            </Link>
          </motion.div>

          {/* Image + Info Box */}
          <motion.div
            className="lg:w-1/2 xl:w-5/12 xl:ml-auto"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              {/* Layout frame image */}
              <Image
                src="/images/about_layout.png"
                alt="decorative"
                width={500}
                height={600}
                className="w-full h-auto"
              />
              {/* Background photo */}
              <div className="absolute inset-[8%] overflow-hidden">
                <Image
                  src="/images/about-us.jpg"
                  alt="AGREDS community support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              {/* Info box overlay — centered over image */}
              <div className="absolute inset-[8%] flex flex-col items-center justify-center text-center text-white px-8 lg:px-12">
                <h4 className="font-bold text-2xl lg:text-[35px] lg:leading-[40px] mb-6 !text-white">
                  A Team Committed to Transforming Lives
                </h4>
                <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-sm">
                  Behind every AGREDS initiative is a dedicated network of volunteers, pastors,
                  community leaders, development workers, and field officers who share one
                  purpose &mdash; to extend the compassion of Christ through practical support,
                  empowerment, and hope for families across Ghana.
                </p>
                <Link
                  href="/get-involved/volunteer"
                  className="inline-block text-white text-sm font-bold uppercase tracking-wider border-b border-white pb-0.5 hover:text-accent-yellow hover:border-accent-yellow transition-colors"
                >
                  Become a Volunteer
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
