"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";

interface Donor {
  id: string;
  name: string;
  logo: string;
  url: string | null;
}

export default function DonorsSlider({ donors }: { donors: Donor[] }) {
  return (
    <section className="pt-0 pb-20 lg:pb-28 relative" id="donors">
      {/* donors ::before — light beige bg */}
      <div
        className="absolute bottom-0 right-0 w-full h-full -z-10"
        style={{ backgroundColor: "#f9f7f6" }}
      />

      <div className="container mx-auto px-4">
        {/* Heading — centered */}
        <motion.div
          className="text-center max-w-[600px] mx-auto mb-[50px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block font-bold mb-[10px] text-sm" style={{ color: "#9e9e9e" }}>
            Donors &amp; Partners
          </span>
          <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] leading-tight mb-0" style={{ color: "#343877" }}>
            <span>Who Help </span>
            <span className="font-light">Us</span>
          </h2>
        </motion.div>

        {/* Donors slider */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={donors.length > 4}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {donors.map((donor) => (
            <SwiperSlide key={donor.id}>
              <div className="flex items-center justify-center h-[100px]">
                <Image
                  src={donor.logo}
                  alt={donor.name}
                  width={160}
                  height={100}
                  className="object-contain max-h-[100px] w-auto h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
