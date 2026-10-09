"use client";

import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string | null;
}

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden text-white">
      {/* Parallax BG */}
      <div className="absolute inset-0">
        <Image
          src="/images/lifeline/photo-6.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col xl:flex-row gap-10">
          {/* Left col-xl-4: heading + nav */}
          <motion.div
            className="xl:w-4/12"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="heading heading--primary">
              <span className="inline-block text-accent-yellow font-bold mb-[10px] text-sm">
                Testimonials
              </span>
              <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] leading-tight mb-0" style={{ color: "#fff" }}>
                <span>What People</span>
                <br />
                <span className="font-light">Say About Us</span>
              </h2>
            </div>

            {/* slider nav — mt-[50px] */}
            <div className="inline-flex mt-[50px] mb-[50px] xl:mb-0">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-white hover:bg-accent-yellow transition-all mr-[17px]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-white hover:bg-accent-yellow transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right col-xl-8: slider */}
          <div className="xl:w-8/12">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={30}
              loop={testimonials.length > 1}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id}>
                  <div>
                    {/* quote icon — " */}
                    <div
                      className="text-accent-yellow font-bold pt-[10px] mb-4"
                      style={{ fontSize: 55, lineHeight: "30px" }}
                    >
                      &ldquo;
                    </div>
                    {/* testimonial text */}
                    <p className="text-white text-[18px] leading-[30px] lg:text-[20px] lg:leading-[35px] mb-0">
                      {t.quote}
                    </p>
                    {/* author with yellow dash */}
                    <div className="mt-[30px] text-[16px] font-bold flex items-center">
                      <span className="inline-block w-[40px] h-[2px] bg-accent-yellow mr-[20px] shrink-0" />
                      <span>
                        {t.authorName}
                        {t.authorRole && `, ${t.authorRole}`}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
