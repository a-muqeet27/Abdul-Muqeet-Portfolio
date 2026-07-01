"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  AnimatedSection,
  SectionTitle,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";
import { technologies } from "@/data/portfolio";
import { spring, ease } from "@/lib/motion";

export function TechnologiesSection() {
  return (
    <AnimatedSection id="technologies" className="section-padding bg-dark-bg">
      <div className="container-main">
        <SectionTitle>Technologies & Tools</SectionTitle>
        <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <motion.div
                className="group flex flex-col items-center gap-3 text-center"
                whileHover={{ y: -8 }}
                transition={spring.gentle}
              >
                <motion.div
                  className="flex h-16 w-16 items-center justify-center"
                  whileHover={{
                    scale: 1.18,
                    filter: "grayscale(0) drop-shadow(0 0 20px rgba(0,212,255,0.6))",
                  }}
                  initial={{ filter: "grayscale(0.15)" }}
                  transition={{ duration: 0.45, ease: ease.outExpo }}
                >
                  <Image
                    src={tech.image}
                    alt={tech.name}
                    title={tech.name}
                    width={64}
                    height={64}
                    className="h-14 w-14 object-contain"
                  />
                </motion.div>
                <motion.span
                  className="text-sm text-text-gray"
                  whileHover={{ color: "#00d4ff" }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}
