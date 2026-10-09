"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  );
}

const images = [
  "/images/ig_1.jpg",
  "/images/ig_2.jpg",
  "/images/ig_3.jpg",
  "/images/ig_4.jpg",
  "/images/ig_5.jpg",
  "/images/ig_6.jpg",
  "/images/ig_4.jpg",
];

export default function InstagramSlider() {
  return (
    <section className="pt-20 lg:pt-28 pb-0" id="instagram">
      <div className="container mx-auto px-4">
        {/* Row: heading left + nav right, align-items-end */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-[50px]">
          {/* Heading — col-lg-8 */}
          <motion.div
            className="md:w-7/12 lg:w-8/12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block font-bold mb-[10px] text-sm" style={{ color: "#9e9e9e" }}>
              Testimonials
            </span>
            <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] leading-tight mb-0" style={{ color: "#343877" }}>
              <span>#AGCareGhana Instagram</span>
            </h2>
          </motion.div>

          {/* Nav arrows — col-lg-4, right-aligned */}
          <div className="md:w-5/12 lg:w-4/12 md:text-right mt-[40px] md:mt-0 md:pb-[10px]">
            <div className="inline-flex">
              <button className="ig-prev w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-primary hover:bg-accent-yellow hover:text-white transition-all mr-[17px]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="ig-next w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-primary hover:bg-accent-yellow hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width slider (outside container) */}
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={2}
        spaceBetween={0}
        navigation={{ prevEl: ".ig-prev", nextEl: ".ig-next" }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={images.length > 6}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block group overflow-hidden"
            >
              {/* Aspect ratio: 83.96% from template */}
              <div style={{ paddingTop: "83.96%" }} />
              <Image
                src={src}
                alt={`AG Care Ghana Instagram ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ backgroundColor: "rgba(53,57,118,.7)" }}
              >
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
              {/* Bottom-left icon (visible, hides on hover) */}
              <span className="absolute left-[15px] bottom-[15px] z-10 group-hover:opacity-0 transition-opacity duration-300">
                <InstagramIcon className="w-[18px] h-[18px] text-white" />
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
