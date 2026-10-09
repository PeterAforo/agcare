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
              AG Care Ghana is the humanitarian and development agency of the
              Assemblies of God Church, Ghana&mdash;working with partners in the
              love of God to eliminate poverty.
            </p>
            <p className="text-gray-500 mb-5 leading-relaxed text-[15px]">
              Formally established in 1990 and registered as an NGO in 1991, AG
              Care Ghana has directly impacted over 200,000 lives in more than
              60 communities through programmes in education, health, child
              protection, economic livelihoods, community infrastructure, and
              humanitarian assistance.
            </p>
            <p className="text-gray-500 mb-10 leading-relaxed text-[15px]">
              Working through church networks, local volunteers, community structures, and
              dedicated partners, AG Care Ghana continues to build resilient communities&mdash;empowering
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
                  src="/images/community-infrastructure/cultural-interactions-between-volunteers-and-community.jpg"
                  alt="AG Care Ghana community support"
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
                  Behind every AG Care Ghana initiative is a dedicated network of volunteers, pastors,
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
