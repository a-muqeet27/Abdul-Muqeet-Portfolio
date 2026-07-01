"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { education } from "@/data/portfolio";
import { spring } from "@/lib/motion";

export function EducationSection() {
  return (
    <AnimatedSection id="education" className="section-padding">
      <div className="container-main">
        <SectionTitle>Education</SectionTitle>
        <StaggerContainer className="space-y-6">
          {education.map((item) => (
            <StaggerItem key={item.school}>
              <motion.div
                className="card-base group flex flex-col gap-4 border-l-4 border-l-primary p-4 sm:gap-5 sm:p-5 md:flex-row md:items-center md:gap-8 md:p-6"
                whileHover={{
                  y: -2,
                  borderLeftColor: "rgba(0, 245, 255, 0.8)",
                  boxShadow: "0 12px 45px rgba(0, 212, 255, 0.18)",
                }}
                transition={spring.gentle}
              >
                <motion.div
                  className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24"
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  transition={spring.snappy}
                >
                  <Image
                    src={item.image}
                    alt={item.school}
                    width={96}
                    height={96}
                    className="h-full w-full object-contain transition-transform duration-500 ease-smooth"
                  />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <motion.h3
                    className="mb-2 text-base font-semibold text-text-light sm:text-lg md:text-xl"
                    initial={false}
                    whileHover={{ color: "#00d4ff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.school}
                  </motion.h3>
                  <p className="mb-1 text-sm text-primary transition-colors duration-300 group-hover:text-secondary sm:text-base">
                    {item.level}
                  </p>
                  <p className="mb-1 text-xs text-text-gray sm:text-sm">{item.year}</p>
                  <p className="text-xs leading-relaxed text-text-gray transition-colors duration-300 group-hover:text-text-dark sm:text-sm md:text-base">
                    {item.marks}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
