"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { aboutParagraphs, aboutStats } from "@/data/portfolio";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { spring } from "@/lib/motion";

function StatCard({
  label,
  value,
  decimals = 0,
}: {
  label: string;
  value: number;
  decimals?: number;
}) {
  const { ref, display } = useAnimatedCounter(value, 1.6, decimals);

  return (
    <motion.div
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-4 text-center backdrop-blur-sm sm:px-6 sm:py-5"
      whileHover={{
        y: -4,
        borderColor: "rgba(255, 255, 255, 0.15)",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
      }}
      transition={spring.gentle}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px w-full scale-x-0 bg-gradient transition-transform duration-500 group-hover:scale-x-100"
      />
      <p
        ref={ref}
        className="gradient-text text-2xl font-bold sm:text-3xl md:text-4xl"
      >
        {display}
      </p>
      <p className="mt-1 text-xs text-text-gray transition-colors duration-300 group-hover:text-text-dark sm:text-sm">
        {label}
      </p>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="section-padding bg-dark-bg">
      <div className="container-main">
        <SectionTitle>About Me</SectionTitle>

        <StaggerContainer className="mx-auto mb-8 grid max-w-3xl grid-cols-3 gap-2 sm:mb-12 sm:gap-4">
          {aboutStats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard
                label={stat.label}
                value={stat.value}
                decimals={stat.decimals}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <StaggerContainer className="mx-auto max-w-4xl space-y-6">
          {aboutParagraphs.map((text, i) => (
            <StaggerItem key={i}>
              <motion.p
                className="text-center text-sm leading-relaxed text-text-gray sm:text-base md:text-lg"
                whileHover={{ color: "#e0e0e0" }}
                transition={{ duration: 0.35 }}
              >
                {text}
              </motion.p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
