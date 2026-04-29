"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Hardcoded project data matching the template exactly ── */
const PROJECTS = [
  {
    id: "p1",
    type: "vertical" as const,
    image: "/images/projects_1.jpg",
    badge: "Water & Sanitation",
    badgeColor: "#49C2DF",
    panelColor: "#2EC774",
    title: "Clean Water for Rural Communities",
    description:
      "AGREDS works with local communities to provide access to safe drinking water, improved sanitation, and hygiene education to reduce disease and improve quality of life.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 4,
    rowSpan: 2,
  },
  {
    id: "p2",
    type: "horizontal" as const,
    image: "/images/projects_2.jpg",
    badge: "Health Services",
    badgeColor: "#F36F8F",
    panelColor: "#9BC35E",
    title: "Strengthening Rural Health Facilities",
    description:
      "Through Saboba Hospital, Nakpanduri Health Centre, and medical outreaches, AGREDS improves access to healthcare for marginalized and underserved populations.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 8,
    rowSpan: 1,
  },
  {
    id: "p3",
    type: "primary" as const,
    image: "/images/projects_3.jpg",
    badge: "Child Support",
    badgeColor: "#F8AC3A",
    panelColor: "",
    title: "Child Development & Educational Support",
    description:
      "AGREDS supports pre-schools, literacy programmes, and child development initiatives to give vulnerable children the opportunity to learn, grow, and thrive.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 8,
    rowSpan: 2,
  },
  {
    id: "p4",
    type: "primary" as const,
    image: "/images/projects_4.jpg",
    badge: "Education",
    badgeColor: "#2EC774",
    panelColor: "",
    title: "Girls' Vocational Training Support",
    description:
      "Through the Yendi Girls Vocational Institute, AGREDS equips young women with employable skills and economic empowerment opportunities.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 4,
    rowSpan: 1,
  },
  {
    id: "p5",
    type: "horizontal" as const,
    image: "/images/projects_5.jpg",
    badge: "Community Development",
    badgeColor: "#2EC774",
    panelColor: "#E78F51",
    title: "Empowering Families & Local Communities",
    description:
      "AGREDS strengthens rural families through economic empowerment, peacebuilding, family assistance programmes, and long-term development interventions.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 8,
    rowSpan: 1,
  },
  {
    id: "p6",
    type: "primary" as const,
    image: "/images/projects_6.jpg",
    badge: "Relief",
    badgeColor: "#F36F8F",
    panelColor: "",
    title: "Emergency Aid & Disaster Support",
    description:
      "AGREDS provides food, shelter, and emergency assistance to communities affected by disasters, conflict, and displacement—including refugee and crisis areas.",
    goal: "25 000$",
    date: "23 Jan'19",
    colSpan: 4,
    rowSpan: 1,
  },
];

/* ── Shared inner content block ── */
function ProjectInner({
  badge,
  badgeColor,
  title,
  description,
  goal,
  date,
}: {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  goal: string;
  date: string;
}) {
  return (
    <div className="w-full max-w-[340px] text-center text-white px-4 py-[30px]">
      <span
        className="inline-block text-sm font-bold px-[13px] py-[6px] rounded mb-[22px]"
        style={{ backgroundColor: badgeColor }}
      >
        {badge}
      </span>
      <h3 className="text-[28px] xl:text-[35px] leading-[36px] xl:leading-[40px] font-bold mb-[17px]">
        <Link href="#" className="text-white hover:text-accent-yellow transition-colors">
          {title}
        </Link>
      </h3>
      <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      <div className="mt-[30px] flex justify-center gap-4 text-sm">
        <span>
          Goal: <strong>{goal}</strong>
        </span>
        <span>
          Date: <strong>{date}</strong>
        </span>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProjectsMasonry({ projects: _dbProjects }: { projects: unknown[] }) {
  return (
    <section className="pt-0 pb-0" id="projects">
      {/* ── Heading ── */}
      <div className="container mx-auto px-4 mb-10">
        <div className="max-w-3xl">
          <span className="inline-block text-secondary font-bold mb-[10px] text-sm">
            What We Did
          </span>
          <h2 className="text-[32px] lg:text-[40px] xl:text-[50px] font-bold tracking-[-.070em] mb-5 leading-tight">
            <span>Our </span>
            <span className="font-light">Projects</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-[15px]">
            For more than three decades, AGREDS has carried out life-changing development
            projects across Ghana&mdash;strengthening health systems, expanding education,
            empowering women, supporting vulnerable children, and bringing relief to
            disadvantaged communities.
          </p>
        </div>
      </div>

      {/* ── Masonry grid ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12"
        style={{ gridAutoRows: "450px", gridAutoFlow: "dense" }}
      >
        {PROJECTS.map((p) => {
          const colClass =
            p.colSpan === 8
              ? "xl:col-span-8 lg:col-span-1"
              : "xl:col-span-4 lg:col-span-1";
          const rowClass = p.rowSpan === 2 ? "xl:row-span-2" : "xl:row-span-1";

          /* ─── VERTICAL: image top + colored panel bottom ─── */
          if (p.type === "vertical") {
            return (
              <motion.div
                key={p.id}
                className={`${colClass} ${rowClass} flex flex-col overflow-hidden`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Image half */}
                <div className="relative flex-1 overflow-hidden group">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.2]"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>
                {/* Text panel half */}
                <div
                  className="flex-1 flex items-center justify-center p-[15px]"
                  style={{ backgroundColor: p.panelColor }}
                >
                  <ProjectInner {...p} />
                </div>
              </motion.div>
            );
          }

          /* ─── HORIZONTAL: image left + colored panel right ─── */
          if (p.type === "horizontal") {
            return (
              <motion.div
                key={p.id}
                className={`${colClass} ${rowClass} flex flex-col xl:flex-row overflow-hidden`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Image half */}
                <div className="relative flex-1 overflow-hidden group hidden xl:block">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.2]"
                    sizes="33vw"
                  />
                </div>
                {/* Text panel half */}
                <div
                  className="flex-1 flex items-center justify-center p-[15px] min-h-[400px] xl:min-h-0"
                  style={{ backgroundColor: p.panelColor }}
                >
                  <ProjectInner {...p} />
                </div>
              </motion.div>
            );
          }

          /* ─── PRIMARY: full image with overlay text ─── */
          return (
            <motion.div
              key={p.id}
              className={`${colClass} ${rowClass} relative overflow-hidden group`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.2]"
                sizes="(max-width: 1280px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-primary/60" />
              <div className="absolute inset-0 flex items-center justify-center p-[15px]">
                <ProjectInner {...p} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
