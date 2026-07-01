"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
} from "@/components/ui/AnimatedSection";
import { TechCard, TechFilterBar } from "@/components/sections/TechCard";
import {
  technologies,
  techCategories,
  type TechCategoryId,
} from "@/data/portfolio";

function getCategoryCounts() {
  const counts: Record<string, number> = { all: technologies.length };
  technologies.forEach((tech) => {
    counts[tech.category] = (counts[tech.category] ?? 0) + 1;
  });
  return counts;
}

export function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>("all");
  const counts = useMemo(() => getCategoryCounts(), []);

  const filtered =
    activeCategory === "all"
      ? technologies
      : technologies.filter((t) => t.category === activeCategory);

  return (
    <AnimatedSection
      id="technologies"
      className="section-padding relative overflow-hidden bg-dark-bg"
    >
      {/* Ambient background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/[0.03] blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-accent/[0.03] blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-main relative z-10">
        <SectionTitle>Technologies & Tools</SectionTitle>

        <TechFilterBar
          categories={techCategories}
          active={activeCategory}
          onChange={(id) => setActiveCategory(id as TechCategoryId)}
          counts={counts}
        />

        <motion.p
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center text-xs text-text-gray/70"
        >
          Showing {filtered.length} of {technologies.length}
        </motion.p>

        <motion.div
          layout
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                image={tech.image}
                category={tech.category}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Infinite marquee of tech names */}
        <div className="relative mt-14 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-dark-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-dark-bg to-transparent" />
          <div className="flex animate-marquee gap-8 whitespace-nowrap">
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="text-sm font-medium text-white/[0.08]"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
