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
import { ease } from "@/lib/motion";

function getCategoryCounts() {
  const counts: Record<string, number> = { all: technologies.length };
  technologies.forEach((tech) => {
    counts[tech.category] = (counts[tech.category] ?? 0) + 1;
  });
  return counts;
}

const categoryLabels: Record<string, string> = {
  all: "All Technologies",
  mobile: "Mobile Development",
  languages: "Programming Languages",
  "ai-ml": "AI & Machine Learning",
  backend: "Backend & APIs",
  database: "Databases",
  tools: "Tools & Platforms",
};

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
      className="section-padding relative bg-dark-bg"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,212,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-accent/[0.04] blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-main relative z-10">
        <SectionTitle>Technologies & Tools</SectionTitle>

        <TechFilterBar
          categories={techCategories}
          active={activeCategory}
          onChange={(id) => setActiveCategory(id as TechCategoryId)}
          counts={counts}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: ease.outExpo }}
            className="mb-5 text-center"
          >
            <p className="text-sm font-medium text-text-light/80">
              {categoryLabels[activeCategory] ?? activeCategory}
            </p>
            <p className="mt-0.5 text-xs text-text-gray/70">
              Showing {filtered.length} of {technologies.length} skills
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          layout
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tech, i) => (
              <TechCard
                key={tech.name}
                name={tech.name}
                image={tech.image}
                category={tech.category}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="relative mt-12 overflow-hidden sm:mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: ease.outExpo }}
        >
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-dark-bg to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-dark-bg to-transparent" />
          <div className="flex animate-marquee gap-10 whitespace-nowrap py-2">
            {[...technologies, ...technologies].map((tech, i) => (
              <span
                key={`${tech.name}-${i}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/[0.12] transition-colors hover:text-white/20"
              >
                <span className="h-1 w-1 rounded-full bg-primary/30" />
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
