"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VolunteerCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" id="volunteer">
      {/* text-section__bg — bottom right, pink watercolor */}
      <Image
        src="/images/text-section.png"
        alt=""
        width={500}
        height={600}
        className="absolute bottom-0 right-0 pointer-events-none hidden md:block h-auto w-auto"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* "Volunteer" — huge Storytella heading, centered */}
        <div className="text-center">
          <motion.h2
            className="font-storytella font-normal text-accent-yellow text-[130px] leading-[1] sm:text-[200px] sm:leading-[150px] md:text-[300px] md:leading-[215px] lg:text-[300px] lg:leading-[160px] xl:text-[400px] xl:leading-[250px] select-none"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Volunteer
          </motion.h2>
        </div>

        {/* Content — offset to the right (col-xl-7 offset-xl-4) */}
        <div className="lg:ml-[33.333%] xl:ml-[33.333%] lg:w-[66.666%] xl:w-[58.333%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[32px] leading-[1.3] lg:text-[40px] lg:leading-[60px] lg:mt-[-50px] font-bold mb-4">
              Delivering hope, dignity, and support<br className="hidden lg:inline" /> to
              vulnerable children and families.
            </h3>
            <p className="text-gray-600 leading-relaxed mb-0">
              Volunteers are the heartbeat of AG Care Ghana. Through your service, you help provide
              education for children, support for struggling families, health outreach for
              rural communities, and empowerment opportunities that transform lives. Together,
              we bring the compassion of Christ to those who need it most.
            </p>
            <Link
              href="/get-involved/volunteer"
              className="inline-flex mt-[15px] border-2 border-accent-yellow text-primary font-bold px-8 py-3 rounded-full hover:bg-accent-yellow hover:text-white transition-colors text-sm uppercase tracking-wider"
            >
              Become a Volunteer
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
