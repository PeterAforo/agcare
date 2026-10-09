"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

interface Cause {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string | null;
  badgeColor: string;
  goalAmount: number;
  pledgedAmount: number;
}

function fmtAmount(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + "$";
}

export default function CausesSlider({ causes }: { causes: Cause[] }) {
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!counterRef.current) return;
    const counters = counterRef.current.querySelectorAll(".js-counter");
    counters.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target") || "0");
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: target < 10 ? 0.1 : 1 },
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
          onUpdate: function () {
            const val = parseFloat(gsap.getProperty(el, "innerText") as string);
            el.textContent = target < 10 ? val.toFixed(1) : Math.floor(val).toString();
          },
        }
      );
    });
  }, []);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" id="causes">
      {/* Background image — bottom right (template: .causes__bg) */}
      <Image
        src="/images/causes_img.png"
        alt=""
        width={500}
        height={800}
        className="absolute bottom-0 right-0 pointer-events-none hidden lg:block h-auto w-auto"
      />

      <div className="container mx-auto px-4">
        {/* ── Row 1: heading (col-xl-5) + counters (col-xl-6 offset-1) ── */}
        <div className="flex flex-col xl:flex-row xl:items-end gap-8">
          {/* heading--primary (col-xl-5) */}
          <div className="xl:w-5/12">
            <span className="inline-block font-bold mb-[10px] text-sm" style={{ color: "#9e9e9e" }}>
              What We Do
            </span>
            <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] leading-tight mb-[20px]" style={{ color: "#343877" }}>
              <span>Our Key </span>
              <span className="font-light">Focus Areas</span>
            </h2>
            <p className="text-[#777] leading-relaxed mb-0">
              AG Care Ghana delivers life-changing programmes in Education,
              Health Services, Economic Livelihoods, Child Protection,
              Community Infrastructure, and Migration &amp;
              Reintegration&mdash;bringing hope and practical support to
              vulnerable families and under-served communities across Ghana.
            </p>
          </div>

          {/* counters (col-xl-6 offset-xl-1, hidden below xl) */}
          <div
            ref={counterRef}
            className="xl:w-6/12 xl:ml-auto hidden xl:grid grid-cols-2 gap-x-8"
          >
            <div className="text-left mb-[50px] xl:mb-0">
              <h6 className="text-sm text-primary font-semibold mb-[13px]">
                People Supported Since 1990
              </h6>
              <div className="flex items-baseline gap-1" style={{ lineHeight: 1.2 }}>
                <span
                  className="js-counter font-bold text-accent-yellow text-[60px] lg:text-[80px] xl:text-[100px]"
                  style={{ letterSpacing: "-.070em" }}
                  data-target="1.2"
                >
                  0
                </span>
                <span className="font-bold text-accent-yellow text-[60px] lg:text-[80px] xl:text-[100px]" style={{ letterSpacing: "-.070em" }}>m+</span>
              </div>
            </div>
            <div className="text-left mb-[50px] xl:mb-0">
              <h6 className="text-sm text-primary font-semibold mb-[13px]">
                Communities Reached Nationwide
              </h6>
              <div className="flex items-baseline gap-1" style={{ lineHeight: 1.2 }}>
                <span
                  className="js-counter font-bold text-accent-yellow text-[60px] lg:text-[80px] xl:text-[100px]"
                  style={{ letterSpacing: "-.070em" }}
                  data-target="350"
                >
                  0
                </span>
                <span className="font-bold text-accent-yellow text-[60px] lg:text-[80px] xl:text-[100px]" style={{ letterSpacing: "-.070em" }}>+</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Row 2: "More Projects" button (left) + nav arrows (right) ── */}
        <div className="flex items-end justify-between mt-8 mb-[50px]">
          <div className="sm:w-6/12">
            <Link
              href="/causes/programs"
              className="inline-block border-2 border-accent-yellow text-[#333] font-bold text-[12px] uppercase tracking-[.050em] text-center px-[40px] py-[14px] rounded-full min-w-[160px] no-underline transition-all hover:bg-accent-yellow hover:-translate-y-[5px]"
            >
              More Projects
            </Link>
          </div>
          <div className="sm:w-6/12 hidden sm:flex justify-end">
            <div className="inline-flex">
              <button className="causes-prev w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-primary hover:bg-accent-yellow hover:text-white transition-all mr-[17px]">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="causes-next w-[45px] h-[45px] rounded-full border-2 border-accent-yellow inline-flex items-center justify-center text-primary hover:bg-accent-yellow hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── causes-holder: full-bleed slider ── */}
      <div className="pl-4 lg:pl-[max(1rem,calc((100%-1200px)/2+1rem))]">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={20}
          navigation={{ prevEl: ".causes-prev", nextEl: ".causes-next" }}
        >
          {causes.map((cause) => {
            const pct =
              cause.goalAmount > 0
                ? Math.round((cause.pledgedAmount / cause.goalAmount) * 100)
                : 0;
            return (
              <SwiperSlide key={cause.id} style={{ width: 280 }}>
                <motion.div
                  className="mb-[50px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* causes-item__body */}
                  <div
                    className="bg-white"
                    style={{
                      padding: "45px 15px 46px 15px",
                      boxShadow: "0 0 15px 0 rgba(15,13,13,.06)",
                    }}
                  >
                    {/* causes-item__top */}
                    <div className="px-[15px]">
                      <h6 className="font-bold mb-[20px]" style={{ color: "#343877" }}>
                        <Link href="#" className="no-underline hover:opacity-75 transition-opacity" style={{ color: "inherit" }}>
                          {cause.title}
                        </Link>
                      </h6>
                      <p className="text-[#777] text-sm leading-relaxed mb-0">
                        {cause.description}
                      </p>
                    </div>

                    {/* causes-item__img */}
                    <div className="relative mt-[45px]">
                      {cause.badge && (
                        <span
                          className="absolute left-[15px] z-20 inline-block text-white text-[14px] font-bold leading-[27px] px-[15px] py-[1px] rounded-[3px]"
                          style={{ backgroundColor: cause.badgeColor, top: "-15px" }}
                        >
                          {cause.badge}
                        </span>
                      )}
                      <div className="relative" style={{ paddingTop: "76.47%" }}>
                        <Image
                          src={cause.image}
                          alt={cause.title}
                          fill
                          className="object-cover object-center"
                          sizes="280px"
                        />
                      </div>
                    </div>

                    {/* causes-item__lower */}
                    <div className="px-[15px] mt-[45px]">
                      {/* progress-bar */}
                      <div className="relative w-full h-[13px] bg-[#f9f7f6] rounded-[50px]">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-[50px]"
                          style={{ backgroundColor: "#37e18c" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          viewport={{ once: true }}
                        />
                        <span
                          className="absolute font-bold text-[#333]"
                          style={{ top: "-27px", right: 0 }}
                        >
                          {pct}%
                        </span>
                      </div>

                      {/* causes-item__details-holder */}
                      <div className="flex justify-between text-[14px] mt-[25px]">
                        <span className="w-1/2">
                          Goal:{" "}
                          <span className="text-[#333] font-bold">
                            {fmtAmount(cause.goalAmount)}
                          </span>
                        </span>
                        <span className="w-1/2 text-right">
                          Pledged:{" "}
                          <span className="text-[#333] font-bold">
                            {fmtAmount(cause.pledgedAmount)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* causes-item__button (outside body) */}
                  <div className="mt-[32px] ml-[30px]">
                    <Link
                      href="#"
                      className="inline-block border-2 border-accent-yellow text-[#333] font-bold text-[12px] uppercase tracking-[.050em] text-center px-[40px] py-[14px] rounded-full min-w-[160px] no-underline transition-all hover:bg-accent-yellow hover:-translate-y-[5px]"
                    >
                      + Donate
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
