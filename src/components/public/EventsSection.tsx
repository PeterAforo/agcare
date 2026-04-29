"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface EventItem {
  id: string;
  title: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  time: string | null;
  image: string | null;
}

function formatDateRange(start: string, end: string | null) {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" };
  if (!end) return s.toLocaleDateString("en-US", opts);
  const e = new Date(end);
  return `${s.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${e.toLocaleDateString("en-US", opts)}`;
}

export default function EventsSection({ events }: { events: EventItem[] }) {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" id="events">
      {/* events__bg — bottom left */}
      <Image
        src="/images/events_bg.png"
        alt=""
        width={600}
        height={800}
        className="absolute left-0 bottom-0 -z-10 pointer-events-none hidden lg:block h-auto w-auto"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* heading--primary heading--center */}
        <div className="text-center max-w-[600px] mx-auto mb-[50px]">
          <span className="inline-block text-secondary font-bold mb-[10px] text-sm">
            Events
          </span>
          <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] mb-5 leading-tight">
            <span>AGREDS </span>
            <span className="font-light">Upcoming Activities</span>
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px]">
            Join us as we engage communities across Ghana through health outreaches,
            child development forums, empowerment programmes, and humanitarian initiatives.
          </p>
        </div>

        {/* Event cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              className="bg-white p-[5px] shadow-[0_3px_15px_2px_rgba(0,0,0,0.06)] mb-[50px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              {/* event-item__img */}
              {event.image && (
                <div className="relative overflow-hidden" style={{ paddingTop: "76.39%" }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              {/* event-item__content */}
              <div className="px-[15px] xl:px-[30px] pt-[25px] pb-[18px]">
                <h6 className="font-bold mb-2 leading-snug">
                  <Link
                    href="#"
                    className="text-[#4a4c70] hover:opacity-75 transition-opacity"
                  >
                    {event.title}
                  </Link>
                </h6>
                <div className="text-[14px] leading-[27px] text-gray-600">
                  {event.location && (
                    <p className="mb-0">
                      <b>Location:</b> {event.location}
                    </p>
                  )}
                  <p className="mb-0">
                    <b>Date:</b> {formatDateRange(event.startDate, event.endDate)}
                  </p>
                  {event.time && (
                    <p className="mb-0">
                      <b>Time:</b> {event.time}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events — button--primary (yellow border, pill) */}
        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex border-2 border-accent-yellow text-primary font-bold px-8 py-3 rounded-full hover:bg-accent-yellow hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
