"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  image: string;
  mobileImage: string | null;
  tabletImage: string | null;
}

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const animateSlide = (index: number) => {
    const el = textRefs.current[index];
    if (!el) return;

    const tl = gsap.timeline();
    tl.fromTo(
      el.querySelectorAll(".hero-line"),
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power3.out" }
    )
      .fromTo(
        el.querySelector(".hero-subtitle"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        el.querySelector(".hero-cta"),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.4)" },
        "-=0.3"
      );
  };

  useEffect(() => {
    animateSlide(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Split title on "\n" — line 1 = Quicksand white, line 2 = Storytella yellow */
  const renderTitle = (title: string) => {
    const lines = title.split("\n");
    return (
      <>
        {lines.map((line, j) => (
          <span key={j} className="hero-line block overflow-hidden">
            {j === 0 ? (
              <span className="inline-block !text-white font-bold text-3xl md:text-5xl lg:text-[70px] leading-[1.3] tracking-[-0.05em]">
                {line}
              </span>
            ) : (
              <span className="inline-block font-storytella text-accent-yellow text-4xl md:text-6xl lg:text-[110px] leading-[1.05] tracking-[.05em]">
                {line}
              </span>
            )}
          </span>
        ))}
      </>
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={slides.length > 1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          animateSlide(swiper.realIndex);
        }}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
              {/* Purple overlay */}
              <div className="absolute inset-0 bg-primary/60" />

              {/* Content — centered */}
              <div
                ref={(el) => { textRefs.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center max-w-4xl mx-auto px-4 pt-16">
                  {/* Title */}
                  <h2 className="mb-6">{renderTitle(slide.title)}</h2>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="hero-subtitle text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* CTA — oval outlined button */}
                  {slide.ctaText && (
                    <div className="hero-cta">
                      <Link
                        href={slide.ctaLink || "#"}
                        className="inline-block border-2 border-white/60 text-white text-xs font-bold uppercase tracking-[.15em] px-10 py-4 rounded-full hover:bg-white/10 transition-all relative group"
                      >
                        <span className="relative z-10">{slide.ctaText}</span>
                        {/* Decorative double-border effect */}
                        <span className="absolute inset-[-5px] border border-white/20 rounded-full pointer-events-none" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Social Icons — left side vertical ── */}
      <ul className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-4">
        {[
          { label: "Instagram", letter: "Ig" },
          { label: "Google+", letter: "G+" },
          { label: "Twitter", letter: "Tw" },
          { label: "Facebook", letter: "Fb" },
        ].map((s) => (
          <li key={s.label}>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/60 hover:text-white hover:border-white transition-colors text-[10px] font-bold"
              aria-label={s.label}
            >
              {s.letter}
            </a>
          </li>
        ))}
      </ul>

      {/* ── Bottom Panel ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex items-stretch">
          {/* Scroll down anchor */}
          <a
            href="#about"
            className="hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-4 text-white text-[10px] tracking-wider uppercase leading-tight writing-vertical hover:bg-white/20 transition-colors"
          >
            Scroll Down<br />to Learn<br />More
          </a>

          {/* Video block */}
          <div className="hidden md:flex items-center gap-3 bg-white px-5 py-4">
            <div className="relative w-20 h-14 rounded overflow-hidden shrink-0">
              <Image src="/images/education/photo-2026-03-26.jpg" alt="video" fill className="object-cover" sizes="80px" />
            </div>
            <span className="text-primary text-xs font-bold leading-tight">
              Watch Our Mission Video
            </span>
            <a
              href="https://www.youtube.com/watch?v=78xjPMY9rrA"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary-dark transition-colors"
            >
              <Play className="w-4 h-4 text-white fill-white" />
            </a>
          </div>

          {/* Phone numbers */}
          <div className="hidden lg:flex flex-col justify-center bg-gray-50 px-6 py-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Phone Numbers</p>
            <div className="flex gap-4">
              <a href="tel:+233302966331" className="text-xs text-primary font-bold hover:text-accent-yellow transition-colors">+233 302 966 331</a>
              <a href="tel:+233302966333" className="text-xs text-accent-yellow font-bold hover:text-primary transition-colors">+233 302 966 333</a>
            </div>
          </div>

          {/* Email */}
          <div className="hidden lg:flex flex-col justify-center bg-gray-50 px-6 py-4 border-l border-gray-200">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Email</p>
            <a href="mailto:info@agcareghana.org" className="text-xs text-primary font-bold hover:text-accent-yellow transition-colors">info@agcareghana.org</a>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Slide counter + arrows */}
          <div className="flex items-center gap-4 bg-transparent px-6 py-4">
            <span className="text-white text-sm font-bold tracking-wider">
              {activeIndex + 1}/{slides.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-primary hover:bg-accent-yellow/80 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="w-10 h-10 rounded-full bg-accent-yellow flex items-center justify-center text-primary hover:bg-accent-yellow/80 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
