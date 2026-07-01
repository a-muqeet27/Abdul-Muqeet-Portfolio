"use client";

import { motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { aboutParagraphs } from "@/data/portfolio";

export function AboutSection() {
  return (
    <AnimatedSection id="about" className="section-padding bg-dark-bg">
      <div className="container-main">
        <SectionTitle>About Me</SectionTitle>
        <StaggerContainer className="mx-auto max-w-4xl space-y-6">
          {aboutParagraphs.map((text, i) => (
            <StaggerItem key={i}>
              <motion.p
                className="text-center text-base leading-relaxed text-text-gray md:text-lg"
                whileHover={{
                  color: "#e0e0e0",
                  scale: 1.01,
                }}
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
