"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    layout: "/images/icon_1-1.png",
    svg: "/images/svg/donation.svg",
    label: "Health & Medical Outreach",
  },
  {
    layout: "/images/icon_2-2.png",
    svg: "/images/svg/church.svg",
    label: "Education & Child Development",
  },
  {
    layout: "/images/icon_3-3.png",
    svg: "/images/svg/blood.svg",
    label: "Relief & Community Support",
  },
  {
    layout: "/images/icon_4-4.png",
    svg: "/images/svg/charity.svg",
    label: "Women & Family Empowerment",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function IconsSection() {
  return (
    <section className="relative pb-20 lg:pb-28" id="icons">
      <div className="container mx-auto px-4">
        {/* heading--center */}
        <div className="text-center mb-[50px]">
          <span className="inline-block text-secondary font-bold mb-[10px] text-sm">
            Our Work
          </span>
          <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] mb-5 leading-tight">
            <span>What We Do </span>
            <span className="font-light">For Communities</span>
          </h2>
        </div>

        {/* icon items grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="text-center mb-[50px]"
            >
              {/* icon-item__img */}
              <div className="relative inline-flex items-center justify-center w-[100px] h-[100px]">
                {/* img--layout: background shape (z-index -1, centered) */}
                <Image
                  src={item.layout}
                  alt=""
                  width={80}
                  height={80}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[80px] w-auto pointer-events-none"
                />
                {/* SVG icon foreground */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.svg}
                  alt={item.label}
                  className="w-[60px] h-[60px]"
                />
              </div>
              {/* icon-item__text */}
              <div className="mt-[25px]">
                <p className="text-[#4a4c70] text-base md:text-lg lg:text-xl font-bold leading-snug">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
